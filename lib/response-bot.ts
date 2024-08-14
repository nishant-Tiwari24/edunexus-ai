import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateRoadmap(
  syllabus: string,
  learningObj: string,
  refResources: string,
  prerequisites: string,
  duration: string
) {
  const prompt = `Generate a roadmap to learn the given subject, based on the information given below. The response should be structured into a JSON format with two keys: 'title' and 'data'. The 'title' key should have a value that is a detailed title generated for the roadmap. The 'data' key should contain a JSON object where the key is the name of the main topic and the value is a single string of subtopics under that main topic. Do not use any punctuation or markdown. The roadmap should be in the correct order and generate a minimum of 12 key-value pairs for data.

  Syllabus: ${syllabus || "N/A"}
  Learning Objectives: ${learningObj || "N/A"}
  Reference Resources: ${refResources || "N/A"}
  Prerequisites: ${prerequisites || "N/A"}
  Duration: ${duration || "N/A"}`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "gpt-4o-mini",
    });

    const roadmap = JSON.parse(completion.choices[0]?.message?.content || "{}");
    return roadmap;
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw new Error("Unable to generate roadmap");
  }
}

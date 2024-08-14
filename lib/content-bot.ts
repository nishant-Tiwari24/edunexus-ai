import OpenAI from "openai";

// function for llm calls
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//TODO: function to optimize function prompt calls, set the role of user
export const generateContent = async (subtopicTitle: string) => {
  const prompt = `You are an expert on ${subtopicTitle}. Your job is to teach the given sub-topic: ${subtopicTitle} in extreme detail.
    1. Use an explanation that is elaborate and detailed but easy to understand.
    2. Use examples to explain the concept.
    3. If it is related to code, then include a code snippet to explain the concept.
    4. Start with an introduction paragraph, then go ahead with the explanation and end with a conclusion paragraph.`;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
    model: "gpt-4o-mini",
    temperature: 0.7,
    max_tokens: 1500,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  });

  return completion.choices[0].message.content.trim();
};

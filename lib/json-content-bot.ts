import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateSubtopics = async (main: string): Promise<string[]> => {
  const prompt = `Generate 15 in the sequential order starting from 1 to 15, which will cover all the knowledge about topic ${main} so I get to know completely about this topic in detail. I want just the main topic of 6-7 words. Just the topics, no extra words. It is not in a sequential order. In place of numbers like 1, 2, 3 give an emoji. Don't give anything else other than the response I asked for. Just the response, nothing else.`;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
    model: "gpt-4o-mini",
    temperature: 0.7,
    max_tokens: 150,
    top_p: 0.9,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return completion.choices[0].message.content
    .trim()
    .split("\n")
    .filter((line) => line.length > 0);
};

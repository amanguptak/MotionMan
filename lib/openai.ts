import OpenAI from "openai";

const apiKey = process.env.OPEN_AI_KEY;

if (!apiKey) {
  throw Error("OPENAI_API_KEY is not set");
}

const openai = new OpenAI({ apiKey });

export default openai;

export async function getEmbedding(text: string) {

  // API call to generate embeddings

  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  // Extracting the generated embedding from the API response
  const embedding = response.data[0].embedding;
 // Handling errors if the embedding is not generated
  if (!embedding) throw Error("Error generating embedding.");

  // console.log(response);

  return embedding;
}
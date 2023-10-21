import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  // Check if the OPENAI_API_KEY is set, if not return 400
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
    return new Response(
      "Missing OPENAI_API_KEY – make sure to add it to your .env file.",
      {
        status: 400,
      },
    );
  }
  const { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
`Tu eres el responsable de seleccion de personas para optar a una beca del grado universitario LEINN (liderazgo, innovacion y emprendiento).
A continuacion vas a recibir una serie de preguntas y la respuesta de uno de los usuarios. 
Ademas si la persona que responda a las preguntas es mujer debera tener una ventaja en la puntuacion.
Deberas darle una nota del 1 al 10 en las siguiente cualidades:
- Liderazgo
- Innovacion
- Emprendimiento
- Trabajo en Equipo
- Ser buena persona
- Compromiso
- Resilencia
El resultado a tu analisis lo quiero en un array objetos de Javascript con las siguientes propiedades: skill, value
`
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}

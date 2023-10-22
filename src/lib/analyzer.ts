import OpenAI from "openai";
import type { Skills, UserAnalysis } from "@/app/types/UserAnalysis";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const getSkill = (analysis: UserAnalysis, skill: keyof Skills) => {
  const value = analysis[skill];
  if (!value) {
    return Math.floor(Math.random() * 5) + 6;
  }

  if (value >= 10) return 10;
  if (value <= 0) return 0;

  return value;
};

const getSkills = (analysis: UserAnalysis): Skills => {
  return {
    leadership: getSkill(analysis, "leadership"),
    innovation: getSkill(analysis, "innovation"),
    enterpreneurship: getSkill(analysis, "enterpreneurship"),
    teamwork: getSkill(analysis, "teamwork"),
    goodPerson: getSkill(analysis, "goodPerson"),
    commitment: getSkill(analysis, "commitment"),
    resilience: getSkill(analysis, "resilience"),
  };
};

const analyze = async (
  text: string,
  userName: string
): Promise<{ skills: Skills; analysis?: string }> => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Tu eres el responsable de seleccion de personas para optar a una beca del grado universitario LEINN (liderazgo, innovacion y emprendiento).
  A continuacion vas a recibir una serie de preguntas y la respuesta de uno de los usuarios.
  Ademas si la persona que responda a las preguntas es mujer debera tener una ventaja en la puntuacion, de 1 punto.
  Deberas darle una nota del 1 al 10 en las siguiente cualidades:
  - Liderazgo
  - Innovacion
  - Emprendimiento
  - Trabajo en Equipo
  - Ser buena persona
  - Compromiso
  - Resilencia
  Además, necesitamos que realices un análisis del perfil del candidato en el que describas su perfil emprendedor, su perfil innovador y su perfil de liderazgo en base a las respuestas que ha dado. El análisis debe tener una extensión entre 300 y 400 carácteres. Este análisis, será mostrado en el perfil del usuario, por lo que no debes mencionar que ha respondido a preguntas. Hazlo en presente, como si fuera una descripción de su perfil.
  Si una respuesta es inadecuada para este contexto, o no tiene ningún tipo de sentido, valóralo muy negativamente y tenlo en cuenta para el análisis.

  Solo para que lo tengas en cuenta, la persona que va a responder se llama ${userName}.

  Necesito que devuelvas, solo un objeto JSON con el siguiente formato. Solo debes devolver el JSON, ya que el sistema se encargara de leer los valores y guardarlos en BBDD:
  {
    "leadership": number,
    "innovation": number,
    "entrepreneurship": number,
    "teamwork": number,
    "goodPerson": number,
    "commitment": number,
    "resilience": number,
    "analysis": string
  }`,
      },
      {
        role: "user",
        content: text,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    n: 1,
  });

  let responseData: UserAnalysis;
  try {
    responseData = JSON.parse(response.choices[0]?.message?.content ?? "");
    if (!responseData) throw new Error();
  } catch (error) {
    responseData = {};
  }

  const skills = getSkills(responseData);

  const { analysis } = responseData;
  return { skills, analysis };
};

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
export const runtime = "edge";

export async function analyzeUser(
  questions: Array<{
    data: string;
    question: string;
  }>,
  name: string
) {
  // Check if the OPENAI_API_KEY is set, if not return 400
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
    throw new Error();
  }
  const content = questions
    .map((message) => {
      return `- Pregunta: ${message.question}
- Respuesta: ${message.data}`;
    })
    .join("\n\n\n");

  const { skills, analysis } = await analyze(content, name);

  return { skills, analysis };
}

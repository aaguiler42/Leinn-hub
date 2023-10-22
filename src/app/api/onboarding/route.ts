import { currentUser } from "@clerk/nextjs";
import { analyzeUser } from "@/lib/analyzer";

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request): Promise<Response> {
  const user = await currentUser();
  // const clerkUser = await currentUser();
  const data = (await req.json()) as Array<{
    data: string;
    question: string;
  }>;

  const { skills, analysis } = await analyzeUser(
    data,
    user?.firstName ?? "" + " " + user?.lastName ?? ""
  );

  return new Response(JSON.stringify({ skills, analysis }), {});
}

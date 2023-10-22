import OnboardingForm from "./Form.jsx";
import { redirect } from "next/navigation.js";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma.ts";

export default function Onboarding() {
  async function handleSubmit({ skills, analysis }) {
    "use server";
    console.log("skills", skills);
    console.log("analysis", analysis);
    const clerkUser = await currentUser();
    const user = await prisma.user.update({
      where: { clerkId: clerkUser.id },
      data: {
        stats: skills,
        analysis,
        State: "Unaccepted",
      },
    });
    redirect(`/users/${user.id}`);
  }
  return <OnboardingForm onSubmit={handleSubmit} />;
}

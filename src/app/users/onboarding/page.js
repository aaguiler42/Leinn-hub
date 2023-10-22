// "use client";
import { analyzeUser } from "@/lib/analyzer.ts";
import OnboardingForm from "./Form.jsx";
import { redirect } from "next/navigation.js";

export default function Onboarding() {
  async function handleSubmit(values) {
    "use server";
    const user = await analyzeUser(values);
    redirect(`/users/${user.id}`);
  }
  return <OnboardingForm onSubmit={handleSubmit} />;
}

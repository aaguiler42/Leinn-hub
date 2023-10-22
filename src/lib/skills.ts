import { LABELS } from "@/mocks/skills";
import { User } from "@prisma/client";

export const getTopSkills = (user: User): string[] => {
  if (!user.stats) user.stats = {};
  const topSkills = Object.entries(user.stats).reduce<
    { skill: string; value: number }[]
  >((prev, [key, value]) => {
    if (prev.length < 3) {
      return [...prev, { skill: key, value }];
    }
    const smaller = prev.findIndex((p) => p.value < value);
    if (smaller === -1) return prev;

    prev[smaller] = { skill: key, value };
    return prev;
  }, []);

  const skills = topSkills.map(
    (skill) => LABELS[skill.skill as keyof typeof LABELS]
  );

  return skills;
};

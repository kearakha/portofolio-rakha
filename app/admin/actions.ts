"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ── Singleton helpers ────────────────────────────────────────────────────────

export async function updateSingleton(key: string, value: object) {
  await prisma.singleton.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });
  revalidatePath("/");
}

// ── Experience ───────────────────────────────────────────────────────────────

export async function createExperience(formData: FormData) {
  const count = await prisma.experience.count();
  await prisma.experience.create({
    data: {
      order: count,
      period: formData.get("period") as string,
      org: formData.get("org") as string,
      role: formData.get("role") as string,
      division: formData.get("division") as string,
      tags: (formData.get("tags") as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      logoInitials: formData.get("logoInitials") as string,
      logoColor: formData.get("logoColor") as string,
      descEn: formData.get("descEn") as string,
      descId: formData.get("descId") as string,
    },
  });
  revalidatePath("/");
  redirect("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  await prisma.experience.update({
    where: { id },
    data: {
      period: formData.get("period") as string,
      org: formData.get("org") as string,
      role: formData.get("role") as string,
      division: formData.get("division") as string,
      tags: (formData.get("tags") as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      logoInitials: formData.get("logoInitials") as string,
      logoColor: formData.get("logoColor") as string,
      logoImage: (formData.get("logoImage") as string) || null,
      descEn: formData.get("descEn") as string,
      descId: formData.get("descId") as string,
    },
  });
  revalidatePath("/");
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin/experience");
}

// ── Projects ─────────────────────────────────────────────────────────────────

export async function createProject(formData: FormData) {
  const count = await prisma.project.count();
  await prisma.project.create({
    data: {
      order: count,
      title: formData.get("title") as string,
      descEn: formData.get("descEn") as string,
      descId: formData.get("descId") as string,
      tags: (formData.get("tags") as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      category: (formData.get("category") as string) || "",
      year: (formData.get("year") as string) || "",
      href: (formData.get("href") as string) || "#",
      badge: (formData.get("badge") as string) || null,
      image: (formData.get("image") as string) || null,
      initials: (formData.get("initials") as string) || null,
      bg: (formData.get("bg") as string) || null,
      isActive: true,
      sections: formData.getAll("sections") as string[],
    },
  });
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await prisma.project.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      descEn: formData.get("descEn") as string,
      descId: formData.get("descId") as string,
      tags: (formData.get("tags") as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      category: (formData.get("category") as string) || "",
      year: (formData.get("year") as string) || "",
      href: (formData.get("href") as string) || "#",
      badge: (formData.get("badge") as string) || null,
      image: (formData.get("image") as string) || null,
      initials: (formData.get("initials") as string) || null,
      bg: (formData.get("bg") as string) || null,
      sections: formData.getAll("sections") as string[],
    },
  });
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function toggleProjectActive(id: string, isActive: boolean) {
  await prisma.project.update({
    where: { id },
    data: { isActive },
  });
  revalidatePath("/");
}

export async function moveProject(id: string, direction: "up" | "down") {
  const all = await prisma.project.findMany({ orderBy: { order: "asc" } });
  const idx = all.findIndex((p: { id: string }) => p.id === id);
  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= all.length) return;
  await prisma.$transaction([
    prisma.project.update({
      where: { id: all[idx].id },
      data: { order: all[swapIdx].order },
    }),
    prisma.project.update({
      where: { id: all[swapIdx].id },
      data: { order: all[idx].order },
    }),
  ]);
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin/projects");
}

// ── Education ────────────────────────────────────────────────────────────────

export async function createEducation(formData: FormData) {
  const count = await prisma.education.count();
  await prisma.education.create({
    data: {
      order: count,
      institution: formData.get("institution") as string,
      short: formData.get("short") as string,
      degree: formData.get("degree") as string,
      period: formData.get("period") as string,
      gpa: (formData.get("gpa") as string) || null,
      descEn: formData.get("descEn") as string,
      descId: formData.get("descId") as string,
      tags: (formData.get("tags") as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    },
  });
  revalidatePath("/");
  redirect("/admin/education");
}

export async function updateEducation(id: string, formData: FormData) {
  await prisma.education.update({
    where: { id },
    data: {
      institution: formData.get("institution") as string,
      short: formData.get("short") as string,
      degree: formData.get("degree") as string,
      period: formData.get("period") as string,
      gpa: (formData.get("gpa") as string) || null,
      descEn: formData.get("descEn") as string,
      descId: formData.get("descId") as string,
      tags: (formData.get("tags") as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    },
  });
  revalidatePath("/");
  redirect("/admin/education");
}

export async function deleteEducation(id: string) {
  await prisma.education.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin/education");
}

// ── Skills ───────────────────────────────────────────────────────────────────

export async function createSkill(formData: FormData) {
  const count = await prisma.skill.count();
  await prisma.skill.create({
    data: {
      order: count,
      name: formData.get("name") as string,
      level: formData.get("level") as string,
      category: formData.get("category") as string,
    },
  });
  revalidatePath("/");
  redirect("/admin/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  await prisma.skill.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      level: formData.get("level") as string,
      category: formData.get("category") as string,
    },
  });
  revalidatePath("/");
  redirect("/admin/skills");
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin/skills");
}

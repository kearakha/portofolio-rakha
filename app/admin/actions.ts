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

// ── Selected Work ────────────────────────────────────────────────────────────

export async function createSelectedWork(formData: FormData) {
  const count = await prisma.selectedWork.count();
  await prisma.selectedWork.create({
    data: {
      order: count,
      title: formData.get("title") as string,
      partner: formData.get("partner") as string,
      period: formData.get("period") as string,
      descEn: formData.get("descEn") as string,
      descId: formData.get("descId") as string,
      tags: (formData.get("tags") as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      gradientFrom: formData.get("gradientFrom") as string,
      gradientTo: formData.get("gradientTo") as string,
      image: (formData.get("image") as string) || null,
      href: (formData.get("href") as string) || "#",
    },
  });
  revalidatePath("/");
  redirect("/admin/selected-work");
}

export async function updateSelectedWork(id: string, formData: FormData) {
  await prisma.selectedWork.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      partner: formData.get("partner") as string,
      period: formData.get("period") as string,
      descEn: formData.get("descEn") as string,
      descId: formData.get("descId") as string,
      tags: (formData.get("tags") as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      gradientFrom: formData.get("gradientFrom") as string,
      gradientTo: formData.get("gradientTo") as string,
      image: (formData.get("image") as string) || null,
      href: (formData.get("href") as string) || "#",
    },
  });
  revalidatePath("/");
  redirect("/admin/selected-work");
}

export async function deleteSelectedWork(id: string) {
  await prisma.selectedWork.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin/selected-work");
}

// ── Side Projects ────────────────────────────────────────────────────────────

export async function createSmallProject(formData: FormData) {
  const count = await prisma.smallProject.count();
  await prisma.smallProject.create({
    data: {
      order: count,
      title: formData.get("title") as string,
      descEn: formData.get("descEn") as string,
      descId: formData.get("descId") as string,
      tags: (formData.get("tags") as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      year: formData.get("year") as string,
      href: (formData.get("href") as string) || "#",
      badge: (formData.get("badge") as string) || null,
      isActive: true,
    },
  });
  revalidatePath("/");
  redirect("/admin/side-projects");
}

export async function updateSmallProject(id: string, formData: FormData) {
  await prisma.smallProject.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      descEn: formData.get("descEn") as string,
      descId: formData.get("descId") as string,
      tags: (formData.get("tags") as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      year: formData.get("year") as string,
      href: (formData.get("href") as string) || "#",
      badge: (formData.get("badge") as string) || null,
    },
  });
  revalidatePath("/");
  redirect("/admin/side-projects");
}

export async function toggleSmallProjectActive(id: string, isActive: boolean) {
  await prisma.smallProject.update({
    where: { id },
    data: { isActive },
  });
  revalidatePath("/");
}

export async function moveSmallProject(id: string, direction: "up" | "down") {
  const all = await prisma.smallProject.findMany({ orderBy: { order: "asc" } });
  const idx = all.findIndex((p) => p.id === id);
  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= all.length) return;
  await prisma.$transaction([
    prisma.smallProject.update({
      where: { id: all[idx].id },
      data: { order: all[swapIdx].order },
    }),
    prisma.smallProject.update({
      where: { id: all[swapIdx].id },
      data: { order: all[idx].order },
    }),
  ]);
  revalidatePath("/");
  revalidatePath("/admin/side-projects");
}

export async function deleteSmallProject(id: string) {
  await prisma.smallProject.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin/side-projects");
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

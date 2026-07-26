import { notFound } from "next/navigation";
import { getProject } from "@/lib/queries";
import ProjectDetail from "@/components/ProjectDetail";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}

import { notFound } from 'next/navigation';
import { initialProjects, initialBuildings, initialUnits } from '@/lib/initialCatalog';
import { ProjectHero } from '@/features/projects/ProjectHero';
import { FloorPlanSelector } from '@/features/projects/FloorPlanSelector';
import { ProjectSpecsTable } from '@/features/projects/ProjectSpecsTable';

export function generateStaticParams() {
  return initialProjects.map((project) => ({
    slug: project.slug,
  }));
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = initialProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const buildings = initialBuildings.filter((b) => b.projectId === project.id);
  const units = initialUnits.filter((u) => u.projectId === project.id);

  return (
    <div>
      <ProjectHero project={project} />
      <FloorPlanSelector project={project} buildings={buildings} units={units} />
      <ProjectSpecsTable project={project} />
    </div>
  );
}

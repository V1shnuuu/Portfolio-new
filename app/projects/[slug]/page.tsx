import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ProjectDetailClient } from '@/components/sections/ProjectDetailClient';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = projects.find(p => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.shortTitle} — Vishnu Priyan`,
    description: project.description,
    openGraph: {
      title: `${project.shortTitle} — Vishnu Priyan Portfolio`,
      description: project.description,
    },
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = projects.find(p => p.slug === params.slug);
  if (!project) notFound();

  const relatedProjects = projects
    .filter(p => p.id !== project.id && p.filterTags.some(t => project.filterTags.includes(t)))
    .slice(0, 3);

  return (
    <main className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Projects', href: '/projects' },
            { label: project.shortTitle },
          ]}
          className="mb-8"
        />

        <ProjectDetailClient project={project} relatedProjects={relatedProjects} />
      </div>
    </main>
  );
}

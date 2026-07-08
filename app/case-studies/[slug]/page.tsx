import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/data/case-studies';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CaseStudyDetailClient } from '@/components/sections/CaseStudyDetailClient';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return caseStudies.map(cs => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cs = caseStudies.find(c => c.slug === params.slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Case Study | Vishnu Priyan`,
    description: cs.tagline,
  };
}

export default function CaseStudyDetailPage({ params }: PageProps) {
  const cs = caseStudies.find(c => c.slug === params.slug);
  if (!cs) notFound();

  return (
    <main className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb
          items={[
            { label: 'Case Studies', href: '/case-studies' },
            { label: cs.title },
          ]}
          className="mb-8"
        />
        <CaseStudyDetailClient caseStudy={cs} />
      </div>
    </main>
  );
}

import { Metadata } from 'next';
import { ServicesPageClient } from '@/components/sections/ServicesPageClient';

export const metadata: Metadata = {
  title: 'Services — Verix AI | Vishnu Priyan',
  description: 'AI Chatbots, Voice Agents, Workflow Automation & more. Custom AI solutions built by Vishnu Priyan for businesses ready to automate intelligently.',
  openGraph: {
    title: 'Services — Verix AI | Vishnu Priyan',
    description: 'Custom AI solutions — chatbots, voice agents, and workflow automation.',
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}

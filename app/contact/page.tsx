import { Metadata } from 'next';
import { ContactPageClient } from '@/components/sections/ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact — Vishnu Priyan',
  description: 'Get in touch with Vishnu Priyan for project inquiries, service bookings, collaborations, or just to say hi.',
  openGraph: {
    title: 'Contact — Vishnu Priyan',
    description: 'Book a consultation, start a project, or say hello.',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}

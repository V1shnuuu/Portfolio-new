'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
  Mail, Linkedin, Github, Send, CheckCircle2, Calendar,
  MessageSquare, Users, BookOpen, Loader2,
} from 'lucide-react';
import { MultiStepForm } from '@/components/ui/MultiStepForm';
import { PageTransition } from '@/components/ui/PageTransition';
import { OWNER_EMAIL, SOCIAL_LINKS, VERIX_AI, RESUME_URL } from '@/lib/constants';

type Tab = 'inquiry' | 'booking' | 'newsletter';

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'inquiry', label: 'Project Inquiry', icon: MessageSquare },
  { id: 'booking', label: 'Service Booking', icon: Calendar },
  { id: 'newsletter', label: 'Newsletter', icon: BookOpen },
];

const contactMethods = [
  { icon: Mail, label: 'Email', value: OWNER_EMAIL, href: `mailto:${OWNER_EMAIL}` },
  { icon: Linkedin, label: 'LinkedIn', value: 'thevishnupriyan', href: SOCIAL_LINKS.linkedin },
  { icon: Github, label: 'GitHub', value: 'V1shnuuu', href: SOCIAL_LINKS.github },
];

// ── General contact form ──────────────────────────────────────
function GeneralInquiryForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500)); // TODO: connect to email API
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-text-faint focus:border-accent-violet/60 focus:ring-1 focus:ring-accent-violet/20 focus:outline-none transition-all duration-200";

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
        <CheckCircle2 className="w-12 h-12 text-accent-violet" />
        <h4 className="font-display text-xl font-bold text-white">Message Sent!</h4>
        <p className="font-body text-sm text-text-muted max-w-xs">I'll get back to you within 24 hours.</p>
        <button onClick={() => setSubmitted(false)} className="mt-2 text-xs font-mono text-text-muted hover:text-white transition-colors">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your Name" className={inputClass} />
        <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Your Email" className={inputClass} />
      </div>
      <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="Subject (Optional)" className={inputClass} />
      <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Your Message" className={`${inputClass} resize-none`} />
      <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-accent-violet to-accent-indigo text-white font-mono text-xs font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wider">
        {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />Sending...</> : <><Send className="w-4 h-4" />Send Message</>}
      </button>
    </form>
  );
}

// ── Newsletter form ───────────────────────────────────────────
function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000)); // TODO: connect to Brevo/Mailchimp
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-text-faint focus:border-accent-cyan/60 focus:ring-1 focus:ring-accent-cyan/20 focus:outline-none transition-all duration-200";

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
        <CheckCircle2 className="w-12 h-12 text-accent-cyan" />
        <h4 className="font-display text-xl font-bold text-white">You're subscribed!</h4>
        <p className="font-body text-sm text-text-muted max-w-xs">Welcome to the AI Insights newsletter. First issue drops next month.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="bg-accent-cyan/5 border border-accent-cyan/20 rounded-xl p-4 mb-2">
        <h4 className="font-display text-base font-bold text-white mb-1">AI Insights Newsletter</h4>
        <p className="font-body text-xs text-text-muted">Monthly digest on AI, ML, and creative development. No spam — just signal.</p>
      </div>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name (Optional)" className={inputClass} />
      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email *" className={inputClass} />
      <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-accent-cyan to-accent-purple text-black font-mono text-xs font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wider">
        {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />Subscribing...</> : <>Subscribe to Newsletter</>}
      </button>
      <p className="font-mono text-[9px] text-text-faint text-center">No spam. Unsubscribe anytime.</p>
    </form>
  );
}

export function ContactPageClient() {
  const [activeTab, setActiveTab] = useState<Tab>('inquiry');

  return (
    <PageTransition>
      <main className="min-h-screen pt-28 pb-20 px-6 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto relative z-10">

          {/* Header */}
          <div className="mb-12">
            <m.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="font-mono text-xs text-accent-violet uppercase tracking-widest mb-3">
              Get in Touch
            </m.p>
            <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Let's Build
              <br />
              <span className="text-gradient">Something Great</span>
            </m.h1>
            <m.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-base text-text-muted max-w-lg">
              Whether you want to start a project, book a consultation, or just say hi — choose how you'd like to connect.
            </m.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left: Contact details + Download Resume */}
            <m.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex flex-col gap-6"
            >
              {/* Contact info */}
              <div className="flex flex-col gap-4">
                {contactMethods.map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <div key={idx} className="flex items-center gap-4">
                      <span className="p-3 rounded-xl bg-accent-violet/10 border border-accent-violet/20 text-accent-violet flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </span>
                      <div>
                        <span className="font-mono text-[9px] text-text-faint uppercase tracking-wider block">{m.label}</span>
                        <a href={m.href} target={m.label !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer"
                          className="font-body text-sm text-white hover:text-accent-violet transition-colors">
                          {m.value}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Download Resume CTA */}
              <a
                href={RESUME_URL}
                download
                className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-accent-violet/40 hover:bg-accent-violet/5 transition-all group"
              >
                <span className="p-2 rounded-lg bg-white/5">
                  <Users className="w-4 h-4 text-text-muted group-hover:text-accent-violet transition-colors" />
                </span>
                <div>
                  <div className="font-mono text-xs font-bold text-white group-hover:text-accent-violet transition-colors">Download Resume</div>
                  <div className="font-body text-[10px] text-text-faint">PDF · Updated 2025</div>
                </div>
                <span className="ml-auto font-mono text-xs text-text-faint group-hover:text-accent-violet transition-colors">↓</span>
              </a>

              {/* Availability note */}
              <div className="p-4 rounded-xl bg-surface border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
                  <span className="font-mono text-[9px] text-accent-cyan uppercase tracking-wider">Available</span>
                </div>
                <p className="font-body text-xs text-text-muted">
                  Open to internships, freelance projects, and AI automation clients. Based in Chennai, India — remote-friendly.
                </p>
              </div>
            </m.div>

            {/* Right: Tabbed forms */}
            <m.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8"
            >
              {/* Tab buttons */}
              <div className="flex gap-2 mb-6 overflow-x-auto filter-bar-scroll pb-1">
                {TABS.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center gap-2 flex-shrink-0 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                        isActive
                          ? 'bg-accent-violet/10 border border-accent-violet/40 text-white'
                          : 'border border-white/10 text-text-muted hover:text-white hover:border-white/20'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Form panel */}
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <m.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'inquiry' && <GeneralInquiryForm />}
                    {activeTab === 'booking' && <MultiStepForm />}
                    {activeTab === 'newsletter' && <NewsletterForm />}
                  </m.div>
                </AnimatePresence>
              </div>
            </m.div>

          </div>
        </div>
      </main>
    </PageTransition>
  );
}

export default ContactPageClient;

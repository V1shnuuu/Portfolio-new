'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { m, AnimatePresence } from 'framer-motion';
import {
  Brain, Code2, Layers, Globe, Palette, Link as LinkIcon,
  Zap, Mic, Check, Calendar, X, ArrowRight, Sparkles,
} from 'lucide-react';
import { services } from '@/data/services';
import { Service } from '@/types';
import { PricingCard } from '@/components/ui/PricingCard';
import { MultiStepForm } from '@/components/ui/MultiStepForm';
import { CountUp } from '@/components/ui/CountUp';
import { PageTransition } from '@/components/ui/PageTransition';
import { VERIX_AI } from '@/lib/constants';
import { staggerContainer } from '@/animations/variants';
import dynamic from 'next/dynamic';

const RotatingSphere = dynamic(() => import('@/components/ui/RotatingSphere').then(mod => mod.RotatingSphere), { ssr: false });

const ICON_MAP: Record<string, React.ElementType> = {
  Brain, Code2, Layers, Globe, Palette, Link: LinkIcon, Zap, Mic,
};

// ── Service Card ──────────────────────────────────────────────
function ServiceCard({ service, onGetSolution, onCalendly }: {
  service: Service;
  onGetSolution: () => void;
  onCalendly: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = ICON_MAP[service.icon] || Brain;
  const accentColor = service.accentColor || 'violet';

  const accentClasses = {
    violet: 'bg-accent-violet/10 border-accent-violet/20 text-accent-violet',
    cyan: 'bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan',
    pink: 'bg-accent-pink/10 border-accent-pink/20 text-accent-pink',
  };

  return (
    <div className="bg-surface border border-white/5 hover:border-white/10 rounded-2xl p-6 flex flex-col gap-5 transition-colors duration-300">
      {/* Icon */}
      <div className={`inline-flex p-3 rounded-xl border w-fit ${accentClasses[accentColor]}`}>
        <Icon className="w-7 h-7" />
      </div>

      {/* Title + Badge */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-xl font-bold text-white">{service.title}</h3>
        {service.featured && (
          <span className="flex-shrink-0 font-mono text-[9px] text-accent-cyan border border-accent-cyan/30 bg-accent-cyan/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Verix AI
          </span>
        )}
      </div>

      <p className="font-body text-sm text-text-muted leading-relaxed">{service.description}</p>

      {/* Features */}
      <ul className="flex flex-col gap-2">
        {service.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <Check className={`w-3.5 h-3.5 flex-shrink-0 text-${accentColor === 'violet' ? 'accent-violet' : accentColor === 'cyan' ? 'accent-cyan' : 'accent-pink'}`} />
            <span className="font-body text-text-muted">{f}</span>
          </li>
        ))}
      </ul>

      {/* Pricing Preview (if available) */}
      {service.pricing && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="font-mono text-xs text-text-faint hover:text-text-muted transition-colors uppercase tracking-wider text-left"
        >
          {expanded ? '↑ Hide Pricing' : '↓ View Pricing'}
        </button>
      )}

      <AnimatePresence>
        {expanded && service.pricing && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
              {service.pricing.map((tier, i) => (
                <PricingCard
                  key={tier.name}
                  tier={tier}
                  accentColor={service.accentColor}
                  onSelect={
                    tier.name === 'Enterprise'
                      ? onGetSolution
                      : service.cta?.action === 'calendly'
                        ? onCalendly
                        : onGetSolution
                  }
                />
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      {service.cta && (
        <div className="mt-auto pt-2">
          {service.cta.action === 'calendly' ? (
            <button
              onClick={onCalendly}
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent-cyan hover:text-white transition-colors uppercase tracking-wider"
            >
              <Calendar className="w-4 h-4" />
              {service.cta.label}
            </button>
          ) : service.cta.action === 'modal' ? (
            <button
              onClick={onGetSolution}
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent-violet hover:text-white transition-colors uppercase tracking-wider"
            >
              <ArrowRight className="w-4 h-4" />
              {service.cta.label}
            </button>
          ) : (
            <a
              href={service.cta.href}
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-text-muted hover:text-white transition-colors uppercase tracking-wider"
            >
              <ArrowRight className="w-4 h-4" />
              {service.cta.label}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// ── STATS ─────────────────────────────────────────────────────
const VERIX_STATS = [
  { value: 24, suffix: '/7', label: 'Always On' },
  { value: 3, suffix: 'x', label: 'Faster Than Manual' },
  { value: 60, suffix: '%', label: 'Cost Reduction (avg)' },
  { value: 48, suffix: 'hr', label: 'Setup Time' },
];

export function ServicesPageClient() {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  React.useEffect(() => {
    if (showInquiryModal || showCalendly) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showInquiryModal, showCalendly]);

  return (
    <>
      {/* ── Inquiry Modal ── */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {showInquiryModal && (
            <>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9998] modal-backdrop"
                onClick={() => setShowInquiryModal(false)}
              />
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
                <m.div
                  initial={{ opacity: 0, scale: 0.92, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-[540px] bg-surface border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl font-bold text-white">Get Custom Solution</h2>
                    <button onClick={() => setShowInquiryModal(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-text-muted hover:text-white transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <MultiStepForm onClose={() => setShowInquiryModal(false)} />
                </m.div>
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* ── Calendly Modal ── */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {showCalendly && (
            <>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9998] modal-backdrop"
                onClick={() => setShowCalendly(false)}
              />
              <m.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-4 md:inset-20 z-[9999] bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              >
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                  <h2 className="font-display text-lg font-bold text-white">Schedule a Consultation</h2>
                  <button onClick={() => setShowCalendly(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-text-muted hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center">
                    <Calendar className="w-12 h-12 text-accent-cyan mx-auto mb-4" />
                    <p className="font-body text-text-muted mb-4">
                      Calendly integration coming soon. For now, book directly via email.
                    </p>
                    <a
                      href={`mailto:${VERIX_AI.contactEmail}?subject=Consultation Request`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-purple text-black font-mono text-sm font-bold hover:brightness-110 transition-all"
                    >
                      Email to Schedule
                    </a>
                    <p className="font-mono text-xs text-text-faint mt-3">
                      Or: <a href={VERIX_AI.calendlyUrl} target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline">
                        {VERIX_AI.calendlyUrl}
                      </a>
                    </p>
                  </div>
                </div>
              </m.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      <PageTransition>
        <main className="min-h-screen pb-20">

          {/* ── Hero ── */}
          <section className="relative pt-28 pb-20 px-6 overflow-hidden">
            {/* Background glows */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(0,217,255,0.08) 0%, transparent 70%)' }} />
              <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(255,0,110,0.08) 0%, transparent 70%)' }} />
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/5 mb-6"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
                    <span className="font-mono text-xs text-accent-cyan uppercase tracking-widest">Verix AI Services</span>
                  </m.div>

                  <m.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none mb-6"
                  >
                    Intelligent
                    <span className="text-gradient-tri"> Automation</span>
                    <br />for Your Business
                  </m.h1>

                  <m.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="font-body text-lg text-text-muted leading-relaxed max-w-xl mb-8"
                  >
                    AI chatbots that convert, voice agents that sound human, and automation pipelines that eliminate manual work — deployed in 48 hours.
                  </m.p>

                  <m.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap gap-4"
                  >
                    <button
                      onClick={() => setShowCalendly(true)}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full btn-cyan font-mono text-sm font-bold uppercase tracking-wider hover:brightness-110 transition-all active:scale-95"
                    >
                      <Calendar className="w-4 h-4" />
                      Schedule Consultation
                    </button>
                    <button
                      onClick={() => setShowInquiryModal(true)}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 text-white font-mono text-sm font-bold uppercase tracking-wider hover:border-white/30 transition-all active:scale-95"
                    >
                      Get Custom Solution
                    </button>
                  </m.div>
                </div>

                {/* 3D Sphere */}
                <m.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative flex-shrink-0 hidden lg:flex items-center justify-center w-[500px] h-[500px] xl:w-[600px] xl:h-[600px]"
                >
                  <RotatingSphere />
                </m.div>
              </div>
            </div>
          </section>

          {/* ── Stats ── */}
          <section className="py-12 px-6 border-y border-white/5">
            <div className="max-w-4xl mx-auto">
              <m.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {VERIX_STATS.map((stat, idx) => {
                  const colors = ['text-accent-cyan', 'text-accent-violet', 'text-accent-pink', 'text-accent-indigo'];
                  return (
                    <m.div
                      key={idx}
                      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1, duration: 0.5 } } }}
                      className="text-center"
                    >
                      <div className={`font-display text-4xl font-bold ${colors[idx]}`}>
                        <CountUp value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="font-mono text-[10px] text-text-faint uppercase tracking-widest mt-1">
                        {stat.label}
                      </div>
                    </m.div>
                  );
                })}
              </m.div>
            </div>
          </section>

          {/* ── Services Grid ── */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <p className="font-mono text-xs text-accent-violet uppercase tracking-widest mb-3">What We Build</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Services & Offerings</h2>
              </div>

              <m.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {services.map((service, idx) => (
                  <m.div
                    key={service.id}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0, transition: { delay: idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                    }}
                  >
                    <ServiceCard
                      service={service}
                      onGetSolution={() => setShowInquiryModal(true)}
                      onCalendly={() => setShowCalendly(true)}
                    />
                  </m.div>
                ))}
              </m.div>
            </div>
          </section>

          {/* ── Bottom CTA ── */}
          <section className="py-20 px-6">
            <div className="max-w-3xl mx-auto text-center">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="bg-surface border border-white/5 rounded-3xl p-10 md:p-16 relative overflow-hidden"
              >
                {/* Glow */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,217,255,0.06) 0%, transparent 60%)' }} />
                <div className="relative z-10">
                  <span className="font-mono text-xs text-accent-cyan uppercase tracking-widest">Ready to automate?</span>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
                    Let's Build Your{' '}
                    <span className="text-gradient-tri">AI-Powered</span> Future
                  </h2>
                  <p className="font-body text-base text-text-muted mb-8 max-w-lg mx-auto">
                    From a simple chatbot to a full automation infrastructure — book a free 30-minute consultation and let's scope your project.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <button
                      onClick={() => setShowCalendly(true)}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full btn-cyan font-mono text-sm font-bold uppercase tracking-wider hover:brightness-110 transition-all active:scale-95"
                    >
                      <Calendar className="w-4 h-4" />
                      Book Free Call
                    </button>
                    <button
                      onClick={() => setShowInquiryModal(true)}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 text-white font-mono text-sm font-bold uppercase tracking-wider hover:border-white/30 transition-all"
                    >
                      Get a Quote
                    </button>
                  </div>
                </div>
              </m.div>
            </div>
          </section>

        </main>
      </PageTransition>
    </>
  );
}

export default ServicesPageClient;

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { Button } from '@/components/ui/Button';
import { OWNER_EMAIL, SOCIAL_LINKS } from '@/lib/constants';
import { Mail, Send, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/animations/variants';

export function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Connect"
          title="Start a Conversation"
          subtitle="Feel free to reach out if you have a project in mind, want to collaborate on ML research, or just say hello."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct channels and social widgets */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px 0px' }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <motion.h4 variants={fadeUp} className="font-display text-xl font-bold text-white mb-2">
              Contact Details
            </motion.h4>
            
            {/* Email Widget */}
            <motion.div variants={fadeUp}>
              <GlowCard className="p-5 flex gap-4 items-center bg-surface">
                <span className="p-3 rounded-xl bg-background border border-neutral-805 text-accent-violet">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <span className="font-mono text-[9px] text-text-faint uppercase tracking-wider block">
                    Write to me
                  </span>
                  <a
                    href={`mailto:${OWNER_EMAIL}`}
                    className="font-body text-sm text-text-primary hover:text-accent-violet font-medium transition-colors"
                  >
                    {OWNER_EMAIL}
                  </a>
                </div>
              </GlowCard>
            </motion.div>

            {/* Social channels card */}
            <motion.div variants={fadeUp}>
              <GlowCard className="p-5 flex flex-col gap-4 bg-surface">
                <span className="font-mono text-[9px] text-text-faint uppercase tracking-wider block">
                  Find me online
                </span>
                <div className="flex gap-4">
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-neutral-800 text-xs font-mono text-text-muted hover:text-text-primary hover:border-accent-violet transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-neutral-800 text-xs font-mono text-text-muted hover:text-text-primary hover:border-accent-violet transition-all duration-300"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              </GlowCard>
            </motion.div>

          </motion.div>

          {/* Right Column: Dynamic Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px 0px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 w-full"
          >
            <GlowCard className="bg-surface p-6 md:p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-accent-violet animate-bounce" />
                  <h5 className="font-display text-xl font-bold text-white">
                    Message Sent Successfully!
                  </h5>
                  <p className="font-body text-sm text-text-muted max-w-sm">
                    Thank you for reaching out! I will review your message and reply as soon as possible.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-mono text-xs text-text-muted uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-text-faint focus:outline-none focus:border-accent-violet transition-colors font-body"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-mono text-xs text-text-muted uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-text-faint focus:outline-none focus:border-accent-violet transition-colors font-body"
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-mono text-xs text-text-muted uppercase tracking-wider">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your project, idea, or questions..."
                      className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-text-faint focus:outline-none focus:border-accent-violet transition-colors font-body resize-none"
                    />
                  </div>

                  <Button
                    variant="glow"
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="w-4 h-4 ml-1.5" />
                  </Button>
                </form>
              )}
            </GlowCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Contact;

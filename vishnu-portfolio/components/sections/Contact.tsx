'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { Button } from '@/components/ui/Button';
import { OWNER_EMAIL, SOCIAL_LINKS } from '@/lib/constants';
import { slideInLeft, slideInRight } from '@/animations/variants';

export function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE",
          name: formState.name,
          email: formState.email,
          subject: formState.subject || "New Message from Portfolio",
          message: formState.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error("Web3Forms Error:", result);
        alert(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form to Web3Forms:", error);
      alert("Failed to send message. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: OWNER_EMAIL,
      href: `mailto:${OWNER_EMAIL}`,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/thevishnupriyan',
      href: SOCIAL_LINKS.linkedin,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/V1shnuuu',
      href: SOCIAL_LINKS.github,
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 relative px-6 bg-background overflow-hidden">
      
      {/* Background Radial Glow: Violet glow bottom-center (8% opacity, 600px spread) */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none select-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          number="07"
          title="Let's Build Something"
          subtitle="Open for internships, collaborations, freelance projects, and interesting conversations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Contact Details (Slides in from Left)                        */}
          {/* ========================================================================= */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={slideInLeft}
            className="lg:col-span-5 flex flex-col gap-6 text-left"
          >
            {/* Display Header */}
            <h3 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
              Get in touch.
            </h3>

            {/* Paragraph Description */}
            <p className="font-body text-sm md:text-base text-text-muted leading-relaxed max-w-sm">
              Whether you're looking for a developer who can think in design, a designer who can think in code, or an ML engineer who cares about the end user — I'd love to hear from you.
            </p>

            {/* Contact Details List */}
            <div className="flex flex-col gap-4 mt-4">
              {contactMethods.map((method, idx) => {
                const Icon = method.icon;
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="p-3 rounded-lg bg-accent-violet/10 border border-accent-violet/20 text-accent-violet flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="font-mono text-[9px] text-text-faint uppercase tracking-wider block">
                        {method.label}
                      </span>
                      <a
                        href={method.href}
                        target={method.label !== 'Email' ? '_blank' : undefined}
                        rel={method.label !== 'Email' ? 'noopener noreferrer' : undefined}
                        className="font-body text-sm text-white hover:text-accent-violet transition-colors duration-300 underline-offset-4 hover:underline"
                      >
                        {method.value}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Availability notes */}
            <p className="font-body text-xs text-text-faint mt-4 border-t border-white/5 pt-6 max-w-sm">
              Based in Chennai, India. Open to remote & on-site opportunities in India and Taiwan.
            </p>
          </m.div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Contact Form (Slides in from Right)                        */}
          {/* ========================================================================= */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={slideInRight}
            className="lg:col-span-7 w-full"
          >
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <m.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16 gap-4"
                  >
                    <CheckCircle2 className="w-12 h-12 text-accent-violet animate-bounce" />
                    <h4 className="font-display text-xl font-bold text-white">
                      Message Sent Successfully!
                    </h4>
                    <p className="font-body text-sm text-text-muted max-w-sm">
                      Message received. I'll be in touch soon.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 rounded-xl"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send another message
                    </Button>
                  </m.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    
                    {/* Name input */}
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-text-faint focus:border-accent-violet/60 focus:ring-2 focus:ring-accent-violet/20 focus:outline-none transition-all duration-200"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-2">
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="Your Email"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-text-faint focus:border-accent-violet/60 focus:ring-2 focus:ring-accent-violet/20 focus:outline-none transition-all duration-200"
                      />
                    </div>

                    {/* Subject input */}
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        placeholder="Subject (Optional)"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-text-faint focus:border-accent-violet/60 focus:ring-2 focus:ring-accent-violet/20 focus:outline-none transition-all duration-200"
                      />
                    </div>

                    {/* Message input */}
                    <div className="flex flex-col gap-2">
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Your Message"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-text-faint focus:border-accent-violet/60 focus:ring-2 focus:ring-accent-violet/20 focus:outline-none transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-accent-violet to-accent-indigo text-white font-medium rounded-xl py-4 flex items-center justify-center gap-2 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-sm uppercase tracking-wider"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                  </form>
                )}
              </AnimatePresence>

            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
}

export default Contact;

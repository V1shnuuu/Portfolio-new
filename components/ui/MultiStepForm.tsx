'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = 1 | 2 | 3;

interface MultiStepFormProps {
  onClose?: () => void;
  className?: string;
}

const SERVICE_OPTIONS = [
  { value: 'ai-chatbot', label: 'AI Chatbot / Agent' },
  { value: 'voice-agent', label: 'Voice AI Agent' },
  { value: 'automation', label: 'Workflow Automation' },
  { value: 'web-dev', label: 'Web Development' },
  { value: 'ml-system', label: 'Machine Learning System' },
  { value: 'other', label: 'Something Else' },
];

const BUDGET_OPTIONS = [
  { value: 'under-15k', label: 'Under ₹15,000' },
  { value: '15k-50k', label: '₹15,000 – ₹50,000' },
  { value: '50k-1.5l', label: '₹50,000 – ₹1,50,000' },
  { value: 'above-1.5l', label: '₹1,50,000+' },
  { value: 'not-sure', label: 'Not Sure Yet' },
];

const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1month', label: 'Within 1 month' },
  { value: '3months', label: '1-3 months' },
  { value: 'flexible', label: 'Flexible / Exploring' },
];

export function MultiStepForm({ onClose, className }: MultiStepFormProps) {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    service: '',
    budget: '',
    timeline: '',
    description: '',
    name: '',
    email: '',
    company: '',
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceedStep1 = !!formData.service;
  const canProceedStep2 = !!formData.description.trim();
  const canSubmit = !!formData.name.trim() && !!formData.email.trim();

  const handleSubmit = async () => {
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
          name: formData.name,
          email: formData.email,
          subject: `Service Booking Inquiry: ${formData.service}`,
          message: `
Service: ${formData.service}
Budget: ${formData.budget}
Timeline: ${formData.timeline}
Company: ${formData.company || 'None'}

Description:
${formData.description}
          `,
          from_name: "Portfolio Multi-Step Booking Form",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          service: '',
          budget: '',
          timeline: '',
          description: '',
          name: '',
          email: '',
          company: '',
        });
      } else {
        console.error("Web3Forms Error:", result);
        alert(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form to Web3Forms:", error);
      alert("Failed to send booking inquiry. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white text-sm placeholder:text-text-faint focus:border-accent-violet/60 focus:ring-1 focus:ring-accent-violet/30 focus:outline-none transition-all duration-200";
  const optionCardClass = (selected: boolean) => cn(
    "flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200",
    selected
      ? "border-accent-violet/60 bg-accent-violet/10 text-white"
      : "border-white/10 text-text-muted hover:border-white/20 hover:text-white"
  );

  if (isSubmitted) {
    return (
      <div className={cn("flex flex-col items-center justify-center text-center py-12 gap-4", className)}>
        <div className="w-16 h-16 rounded-full bg-accent-violet/20 border border-accent-violet/30 flex items-center justify-center">
          <Check className="w-8 h-8 text-accent-violet" />
        </div>
        <h3 className="font-display text-2xl font-bold text-white">Inquiry Received!</h3>
        <p className="font-body text-sm text-text-muted max-w-sm">
          I'll review your project details and reach out within 24 hours to discuss next steps.
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-2 px-6 py-2.5 rounded-xl border border-white/10 text-text-muted hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {([1, 2, 3] as Step[]).map((s) => (
          <React.Fragment key={s}>
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full font-mono text-xs font-bold transition-all duration-300",
              step > s
                ? "bg-accent-violet text-white"
                : step === s
                  ? "bg-accent-violet/20 border border-accent-violet text-accent-violet"
                  : "bg-surface-elevated border border-white/10 text-text-faint"
            )}>
              {step > s ? <Check className="w-3.5 h-3.5" /> : s}
            </div>
            {s < 3 && (
              <div className={cn(
                "flex-1 h-[1px] transition-all duration-300",
                step > s ? "bg-accent-violet" : "bg-white/10"
              )} />
            )}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Step 1: Service Selection ── */}
        {step === 1 && (
          <m.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-white">What can I help you with?</h3>
              <p className="font-body text-sm text-text-muted mt-1">Select the service you're interested in</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SERVICE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateField('service', opt.value)}
                  className={optionCardClass(formData.service === opt.value)}
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full border flex-shrink-0",
                    formData.service === opt.value ? "bg-accent-violet border-accent-violet" : "border-white/30"
                  )} />
                  <span className="font-body text-sm">{opt.label}</span>
                </button>
              ))}
            </div>
          </m.div>
        )}

        {/* ── Step 2: Project Details ── */}
        {step === 2 && (
          <m.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-white">Tell me about your project</h3>
              <p className="font-body text-sm text-text-muted mt-1">The more detail, the better I can help</p>
            </div>

            <textarea
              rows={4}
              value={formData.description}
              onChange={e => updateField('description', e.target.value)}
              placeholder="Describe what you're looking to build, current challenges, and any specific requirements..."
              className={cn(inputClass, "resize-none")}
            />

            <div>
              <p className="font-mono text-xs text-text-faint uppercase tracking-wider mb-2">Budget Range</p>
              <div className="grid grid-cols-2 gap-2">
                {BUDGET_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => updateField('budget', opt.value)}
                    className={optionCardClass(formData.budget === opt.value)}
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full border flex-shrink-0",
                      formData.budget === opt.value ? "bg-accent-violet border-accent-violet" : "border-white/30"
                    )} />
                    <span className="font-body text-xs">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-xs text-text-faint uppercase tracking-wider mb-2">Timeline</p>
              <div className="grid grid-cols-2 gap-2">
                {TIMELINE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => updateField('timeline', opt.value)}
                    className={optionCardClass(formData.timeline === opt.value)}
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full border flex-shrink-0",
                      formData.timeline === opt.value ? "bg-accent-violet border-accent-violet" : "border-white/30"
                    )} />
                    <span className="font-body text-xs">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </m.div>
        )}

        {/* ── Step 3: Contact Info ── */}
        {step === 3 && (
          <m.div
            key="step-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-white">How can I reach you?</h3>
              <p className="font-body text-sm text-text-muted mt-1">I'll be in touch within 24 hours</p>
            </div>

            <input
              type="text"
              required
              value={formData.name}
              onChange={e => updateField('name', e.target.value)}
              placeholder="Your Name *"
              className={inputClass}
            />
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => updateField('email', e.target.value)}
              placeholder="Your Email *"
              className={inputClass}
            />
            <input
              type="text"
              value={formData.company}
              onChange={e => updateField('company', e.target.value)}
              placeholder="Company / Organization (Optional)"
              className={inputClass}
            />
          </m.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        {step > 1 ? (
          <button
            onClick={() => setStep(prev => (prev - 1) as Step)}
            className="font-mono text-xs text-text-muted hover:text-white transition-colors uppercase tracking-wider"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            onClick={() => setStep(prev => (prev + 1) as Step)}
            disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-indigo text-white font-mono text-xs font-semibold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-indigo text-white font-mono text-xs font-semibold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none"
          >
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
            ) : (
              <><Send className="w-4 h-4" /> Send Inquiry</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default MultiStepForm;

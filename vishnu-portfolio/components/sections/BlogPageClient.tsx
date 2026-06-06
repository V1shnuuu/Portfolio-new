'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Clock, ArrowRight, Send, CheckCircle2 } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { BlogPost, BlogFilterValue } from '@/types';
import { FilterTabs } from '@/components/ui/FilterTabs';
import { PageTransition } from '@/components/ui/PageTransition';
import { BLOG_CATEGORIES, OWNER_EMAIL } from '@/lib/constants';
import { staggerContainer } from '@/animations/variants';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const categoryColors: Record<string, string> = {
    ai: 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10',
    web: 'text-accent-violet border-accent-violet/30 bg-accent-violet/10',
    design: 'text-accent-pink border-accent-pink/30 bg-accent-pink/10',
    career: 'text-accent-indigo border-accent-indigo/30 bg-accent-indigo/10',
  };
  const colorClass = categoryColors[post.category] || 'text-text-muted border-white/10 bg-white/5';

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="bg-surface border border-white/5 hover:border-accent-violet/30 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.06)]">
          <div className="flex flex-col md:flex-row">
            {/* Image placeholder */}
            <div className="md:w-96 aspect-video md:aspect-auto flex-shrink-0 bg-surface-elevated flex items-center justify-center relative overflow-hidden">
              <span className="font-mono text-7xl font-bold text-white/5 select-none">AI</span>
              <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/5 to-transparent" />
            </div>
            <div className="p-6 md:p-8 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className={`font-mono text-[9px] uppercase tracking-widest border px-2.5 py-1 rounded-full ${colorClass}`}>
                  {post.category}
                </span>
                <span className="font-mono text-[9px] text-text-faint uppercase tracking-wider">Featured</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-accent-violet transition-colors">
                {post.title}
              </h2>
              <p className="font-body text-sm text-text-muted leading-relaxed line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center gap-4 mt-2 pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-text-faint">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px]">{post.readTime} min read</span>
                </div>
                <span className="font-mono text-[10px] text-text-faint">{formatDate(post.date)}</span>
                <span className="ml-auto font-mono text-xs text-accent-violet flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <div className="h-full bg-surface border border-white/5 hover:border-accent-violet/30 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.08)] flex flex-col">
        {/* Image placeholder */}
        <div className="w-full aspect-video bg-surface-elevated flex items-center justify-center relative overflow-hidden">
          <span className="font-mono text-5xl font-bold text-white/5 select-none">
            {post.category.slice(0, 2).toUpperCase()}
          </span>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/4 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className={`font-mono text-[9px] uppercase tracking-widest border px-2.5 py-1 rounded-full ${colorClass}`}>
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col gap-3 flex-1">
          <h3 className="font-display text-lg font-bold text-white group-hover:text-accent-violet transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="font-body text-sm text-text-muted leading-relaxed line-clamp-3 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 pt-3 border-t border-white/5">
            <Clock className="w-3 h-3 text-text-faint" />
            <span className="font-mono text-[10px] text-text-faint">{post.readTime} min</span>
            <span className="font-mono text-[10px] text-text-faint ml-auto">{formatDate(post.date)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: Connect to Brevo/Mailchimp API
    setSubmitted(true);
  };

  return (
    <div className="bg-surface border border-white/5 rounded-2xl p-8 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,217,255,0.04) 0%, transparent 60%)' }} />
      <div className="relative z-10 max-w-md mx-auto text-center">
        <p className="font-mono text-xs text-accent-cyan uppercase tracking-widest mb-3">Newsletter</p>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
          AI Insights, Monthly
        </h3>
        <p className="font-body text-sm text-text-muted mb-6">
          No spam. Just the most interesting things in AI, ML, and creative development — once a month.
        </p>
        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-accent-cyan">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-mono text-sm">You're subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-text-faint focus:border-accent-cyan/50 focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-purple text-black font-mono text-sm font-bold hover:brightness-110 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function BlogPageClient() {
  const [activeFilter, setActiveFilter] = useState<BlogFilterValue>('all');

  const filteredPosts = activeFilter === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeFilter);

  const featuredPosts = blogPosts.filter(p => p.featured);
  const regularPosts = activeFilter === 'all'
    ? blogPosts.filter(p => !p.featured)
    : filteredPosts;

  return (
    <PageTransition>
      <main className="min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">

          {/* Header */}
          <div>
            <m.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="font-mono text-xs text-accent-violet uppercase tracking-widest mb-3">
              Writing
            </m.p>
            <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Blog & Insights
            </m.h1>
            <m.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-base text-text-muted max-w-lg">
              Thoughts on AI automation, machine learning, and building premium digital products.
            </m.p>
          </div>

          {/* Featured (only on 'all' filter) */}
          {activeFilter === 'all' && featuredPosts.length > 0 && (
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col gap-4">
              <h2 className="font-mono text-xs text-text-faint uppercase tracking-widest">Featured</h2>
              <div className="flex flex-col gap-4">
                {featuredPosts.map(post => <BlogCard key={post.id} post={post} featured />)}
              </div>
            </m.div>
          )}

          {/* Filter & Grid */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="font-mono text-xs text-text-faint uppercase tracking-widest">
                {activeFilter === 'all' ? 'All Articles' : 'Filtered'}
              </h2>
              <FilterTabs
                filters={BLOG_CATEGORIES as unknown as { label: string; value: BlogFilterValue }[]}
                active={activeFilter}
                onChange={setActiveFilter}
              />
            </div>

            <AnimatePresence mode="wait">
              <m.div
                key={activeFilter}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {regularPosts.map((post, idx) => (
                  <m.div
                    key={post.id}
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1, duration: 0.5 } } }}
                    className="h-full"
                  >
                    <BlogCard post={post} />
                  </m.div>
                ))}
                {regularPosts.length === 0 && (
                  <m.p
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    className="col-span-full text-center py-20 font-mono text-text-faint"
                  >
                    No articles in this category yet.
                  </m.p>
                )}
              </m.div>
            </AnimatePresence>
          </div>

          {/* Newsletter */}
          <NewsletterSignup />

        </div>
      </main>
    </PageTransition>
  );
}

export default BlogPageClient;

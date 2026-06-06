'use client';

import React, { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import Link from 'next/link';
import { Clock, ArrowLeft, Share2, ExternalLink } from 'lucide-react';
import { BlogPost } from '@/types';

interface BlogDetailClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="reading-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function BlogDetailClient({ post, relatedPosts }: BlogDetailClientProps) {
  const categoryColors: Record<string, string> = {
    ai: 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10',
    web: 'text-accent-violet border-accent-violet/30 bg-accent-violet/10',
    design: 'text-accent-pink border-accent-pink/30 bg-accent-pink/10',
    career: 'text-accent-indigo border-accent-indigo/30 bg-accent-indigo/10',
  };
  const colorClass = categoryColors[post.category] || 'text-text-muted border-white/10 bg-white/5';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <ReadingProgress />

      <m.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-8"
      >
        {/* Header */}
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`font-mono text-[10px] uppercase tracking-widest border px-3 py-1 rounded-full ${colorClass}`}>
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-text-faint">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-mono text-[10px]">{post.readTime} min read</span>
            </div>
            <span className="font-mono text-[10px] text-text-faint">{formatDate(post.date)}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="font-body text-lg text-text-muted leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author + Share */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center font-display font-bold text-xs text-accent-violet">
                {post.author.initials}
              </div>
              <div>
                <div className="font-display text-sm font-bold text-white">{post.author.name}</div>
                <div className="font-mono text-[10px] text-text-faint">Author</div>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors"
              aria-label="Share article"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </header>

        {/* Hero image placeholder */}
        <div className="w-full aspect-video bg-surface-elevated rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden relative">
          <span className="font-mono text-[8rem] font-bold text-white/5 select-none">
            {post.category.slice(0, 2).toUpperCase()}
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated/50 to-transparent" />
        </div>

        {/* Article Content */}
        {post.content && (
          <div
            className="prose-dark"
            style={{
              color: 'var(--text-muted)',
              lineHeight: '1.8',
              fontSize: '1rem',
            }}
            dangerouslySetInnerHTML={{
              __html: post.content
                // Convert markdown headings
                .replace(/^## (.+)$/gm, '<h2 style="font-family:\'Clash Display\',sans-serif;font-size:1.5rem;font-weight:700;color:#fff;margin-top:2.5rem;margin-bottom:0.75rem">$1</h2>')
                .replace(/^### (.+)$/gm, '<h3 style="font-family:\'Clash Display\',sans-serif;font-size:1.2rem;font-weight:700;color:#fff;margin-top:2rem;margin-bottom:0.5rem">$1</h3>')
                // Bold
                .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff;font-weight:600">$1</strong>')
                // Code blocks  
                .replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre style="background:#111;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:1.25rem;overflow-x:auto;font-family:\'JetBrains Mono\',monospace;font-size:0.8rem;color:#a1a1aa;margin:1.5rem 0"><code>$2</code></pre>')
                // Inline code
                .replace(/`(.+?)`/g, '<code style="font-family:\'JetBrains Mono\',monospace;font-size:0.85em;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:0.15em 0.4em;color:#8b5cf6">$1</code>')
                // Tables
                .replace(/\|(.+)\|\n\|[-|]+\|\n((?:\|.+\|\n?)+)/g, (match) => {
                  const lines = match.trim().split('\n').filter(l => !l.match(/^\|[-|]+\|$/));
                  const header = lines[0].split('|').filter(Boolean).map(h => `<th style="padding:0.5rem 1rem;text-align:left;color:#fff;font-family:\'JetBrains Mono\',monospace;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;border-bottom:1px solid rgba(255,255,255,0.1)">${h.trim()}</th>`).join('');
                  const rows = lines.slice(1).map(row => {
                    const cells = row.split('|').filter(Boolean).map(c => `<td style="padding:0.5rem 1rem;color:var(--text-muted);font-size:0.9rem;border-bottom:1px solid rgba(255,255,255,0.04)">${c.trim()}</td>`).join('');
                    return `<tr>${cells}</tr>`;
                  }).join('');
                  return `<table style="width:100%;border-collapse:collapse;background:#111;border:1px solid rgba(255,255,255,0.1);border-radius:12px;overflow:hidden;margin:1.5rem 0"><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table>`;
                })
                // Ordered lists
                .replace(/^\d+\. (.+)$/gm, '<li style="list-style:decimal;margin-left:1.5rem;margin-bottom:0.25rem">$1</li>')
                // Unordered lists
                .replace(/^- (.+)$/gm, '<li style="list-style:disc;margin-left:1.5rem;margin-bottom:0.25rem;color:var(--text-muted)">$1</li>')
                // Links
                .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:var(--accent-violet);text-decoration:underline;text-underline-offset:3px" target="_blank" rel="noopener noreferrer">$1</a>')
                // Line breaks to paragraphs
                .replace(/\n\n/g, '</p><p style="margin-bottom:1rem">')
                .replace(/^\s*(.+)/, '<p style="margin-bottom:1rem">$1')
                + '</p>'
            }}
          />
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
          {post.tags.map(tag => (
            <span key={tag} className="font-mono text-[9px] uppercase tracking-wider text-text-faint bg-surface border border-white/5 px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Back + Share */}
        <div className="flex items-center justify-between">
          <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 text-text-muted hover:text-white font-mono text-xs transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>

        {/* Related */}
        {relatedPosts.length > 0 && (
          <div className="pt-10 border-t border-white/5">
            <h2 className="font-display text-xl font-bold text-white mb-4">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPosts.map(rp => (
                <Link key={rp.id} href={`/blog/${rp.slug}`} className="group block bg-surface border border-white/5 hover:border-accent-violet/30 rounded-xl p-4 transition-colors">
                  <span className="font-mono text-[9px] text-text-faint uppercase tracking-wider">{rp.category}</span>
                  <h3 className="font-display text-base font-bold text-white group-hover:text-accent-violet transition-colors mt-1 mb-1 line-clamp-2">
                    {rp.title}
                  </h3>
                  <div className="flex items-center gap-2 text-text-faint">
                    <Clock className="w-3 h-3" />
                    <span className="font-mono text-[9px]">{rp.readTime} min</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </m.article>
    </>
  );
}

export default BlogDetailClient;

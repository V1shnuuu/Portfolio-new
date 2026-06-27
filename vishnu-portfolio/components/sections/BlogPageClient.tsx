'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ArrowRight,
  AtSign,
  Bold,
  BookOpen,
  Bookmark,
  CalendarDays,
  CheckCircle2,
  Clock,
  Code2,
  Edit3,
  Eye,
  Filter,
  Hash,
  Heart,
  ImagePlus,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  MessageCircle,
  Minus,
  MoreHorizontal,
  Plus,
  Quote,
  Redo2,
  Save,
  Search,
  Send,
  Share2,
  Smile,
  Strikethrough,
  Table2,
  Trash2,
  Underline,
  Undo2,
  UploadCloud,
  Video,
  X,
  Youtube,
} from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { BlogPost, BlogStatus } from '@/types';
import { PageTransition } from '@/components/ui/PageTransition';
import { SOCIAL_LINKS } from '@/lib/constants';
import { staggerContainer } from '@/animations/variants';

type SortValue = 'newest' | 'oldest' | 'az' | 'views' | 'likes' | 'updated' | 'readTime';
type ReadingFilter = 'all' | 'short' | 'medium' | 'long' | 'epic';

const STORAGE_KEYS = {
  posts: 'portfolio.blog.localPosts',
  bookmarks: 'portfolio.blog.bookmarks',
  likes: 'portfolio.blog.likes',
  drafts: 'portfolio.blog.autosave',
};

const CURRENT_AUTHOR = {
  id: 'vishnu-priyan',
  name: 'B Vishnu Priyan',
  initials: 'VP',
  bio: 'Creative developer, ML engineer, and UI/UX designer building intelligent digital products.',
  socials: {
    website: '/contact',
    linkedin: SOCIAL_LINKS.linkedin,
    github: SOCIAL_LINKS.github,
  },
};

const CATEGORY_OPTIONS = [
  { label: 'Technology', value: 'technology' },
  { label: 'AI', value: 'ai' },
  { label: 'Machine Learning', value: 'machine-learning' },
  { label: 'Web Development', value: 'web' },
  { label: 'Business', value: 'business' },
  { label: 'Travel', value: 'travel' },
  { label: 'Education', value: 'education' },
  { label: 'Sports', value: 'sports' },
  { label: 'Programming', value: 'programming' },
  { label: 'React', value: 'react' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Design', value: 'design' },
  { label: 'Career', value: 'career' },
];

const TAG_OPTIONS = ['AI', 'NextJS', 'React', 'Career', 'Programming', 'NodeJS', 'Python', 'Automation', 'Design', 'Business'];

const SORT_OPTIONS: { label: string; value: SortValue }[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'A-Z', value: 'az' },
  { label: 'Most Viewed', value: 'views' },
  { label: 'Most Liked', value: 'likes' },
  { label: 'Most Recent Updated', value: 'updated' },
  { label: 'Reading Time', value: 'readTime' },
];

const READING_OPTIONS: { label: string; value: ReadingFilter }[] = [
  { label: 'Any length', value: 'all' },
  { label: '<5 min', value: 'short' },
  { label: '5-10 min', value: 'medium' },
  { label: '10-20 min', value: 'long' },
  { label: '20+ min', value: 'epic' },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function estimateReadingTime(content: string) {
  const text = content.replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatNumber(value = 0) {
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  return String(value);
}

function getCategoryLabel(value: string) {
  return CATEGORY_OPTIONS.find(category => category.value === value)?.label || value;
}

function getCategoryClass(category: string) {
  const categoryColors: Record<string, string> = {
    ai: 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10',
    'machine-learning': 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10',
    web: 'text-accent-violet border-accent-violet/30 bg-accent-violet/10',
    nextjs: 'text-accent-violet border-accent-violet/30 bg-accent-violet/10',
    react: 'text-accent-indigo border-accent-indigo/30 bg-accent-indigo/10',
    design: 'text-accent-pink border-accent-pink/30 bg-accent-pink/10',
    career: 'text-accent-indigo border-accent-indigo/30 bg-accent-indigo/10',
    business: 'text-accent-purple border-accent-purple/30 bg-accent-purple/10',
  };

  return categoryColors[category] || 'text-text-muted border-white/10 bg-white/5';
}

function normalizePost(post: BlogPost): BlogPost {
  const seededViews = post.views ?? 900 + post.title.length * 37;
  const seededLikes = post.likes ?? 80 + post.tags.length * 19;
  const createdAt = post.createdAt || post.date;

  return {
    ...post,
    createdAt,
    updatedAt: post.updatedAt || createdAt,
    status: post.status || 'published',
    views: seededViews,
    likes: seededLikes,
    comments: post.comments || [],
    authorId: post.authorId || CURRENT_AUTHOR.id,
    author: {
      ...post.author,
      bio: post.author.bio || CURRENT_AUTHOR.bio,
      socials: post.author.socials || CURRENT_AUTHOR.socials,
    },
  };
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={`${part}-${index}`} className="bg-accent-violet/25 text-white rounded px-0.5">{part}</mark>
      : part
  );
}

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-surface border border-white/5 rounded-2xl p-8 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,217,255,0.04) 0%, transparent 60%)' }} />
      <div className="relative z-10 max-w-md mx-auto text-center">
        <p className="font-mono text-xs text-accent-cyan uppercase tracking-widest mb-3">Newsletter</p>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">AI Insights, Monthly</h3>
        <p className="font-body text-sm text-text-muted mb-6">
          No spam. Just the most interesting things in AI, ML, and creative development once a month.
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
              aria-label="Subscribe"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-text-faint">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  query: string;
  showOwnerActions?: boolean;
  bookmarked: boolean;
  liked: boolean;
  onBookmark: (post: BlogPost) => void;
  onLike: (post: BlogPost) => void;
  onShare: (post: BlogPost) => void;
  onEdit: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
}

function BlogCard({ post, featured = false, query, showOwnerActions = false, bookmarked, liked, onBookmark, onLike, onShare, onEdit, onDelete }: BlogCardProps) {
  const colorClass = getCategoryClass(post.category);
  const imageFallback = post.category.slice(0, 2).toUpperCase();
  const canManage = showOwnerActions && post.authorId === CURRENT_AUTHOR.id;

  const action = (e: React.MouseEvent, callback: (post: BlogPost) => void) => {
    e.preventDefault();
    e.stopPropagation();
    callback(post);
  };

  const imageNode = (
    <div className={featured ? 'md:w-96 aspect-video md:aspect-auto flex-shrink-0 bg-surface-elevated relative overflow-hidden' : 'w-full aspect-video bg-surface-elevated relative overflow-hidden'}>
      {post.image ? (
        <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes={featured ? '(min-width: 768px) 384px, 100vw' : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'} />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-mono text-6xl font-bold text-white/5 select-none">{imageFallback}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
        {featured && <span className="font-mono text-[9px] uppercase tracking-widest border border-accent-pink/30 bg-accent-pink/10 text-accent-pink px-2.5 py-1 rounded-full">Featured</span>}
        <span className={`font-mono text-[9px] uppercase tracking-widest border px-2.5 py-1 rounded-full ${colorClass}`}>
          {getCategoryLabel(post.category)}
        </span>
      </div>
      <div className="absolute top-3 right-3 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <button onClick={e => action(e, onBookmark)} className={`w-9 h-9 rounded-full border backdrop-blur-md flex items-center justify-center transition-all ${bookmarked ? 'bg-accent-violet text-white border-accent-violet scale-105' : 'bg-black/30 text-white border-white/10 hover:border-accent-violet/50'}`} aria-label="Bookmark">
          <Bookmark className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
        <button onClick={e => action(e, onShare)} className="w-9 h-9 rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-white hover:border-accent-cyan/50 flex items-center justify-center transition-all" aria-label="Share">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const metaNode = (
    <div className="flex items-center gap-3 flex-wrap pt-4 border-t border-white/5">
      <Metric icon={Clock} label={`${post.readTime} min`} />
      <Metric icon={Eye} label={`${formatNumber(post.views)} views`} />
      <button onClick={e => action(e, onLike)} className={`inline-flex items-center gap-1.5 font-mono text-[10px] transition-all ${liked ? 'text-accent-pink scale-105' : 'text-text-faint hover:text-accent-pink'}`} aria-label="Like">
        <Heart className="w-3.5 h-3.5" fill={liked ? 'currentColor' : 'none'} />
        {formatNumber(post.likes)} likes
      </button>
      <Metric icon={MessageCircle} label={`${post.comments?.length || 0}`} />
      <span className="font-mono text-[10px] text-text-faint ml-auto">{formatDate(post.createdAt || post.date)}</span>
    </div>
  );

  const ownerActions = canManage && (
    <div className="flex items-center gap-2">
      <button onClick={e => action(e, onEdit)} className="w-8 h-8 rounded-full border border-white/10 text-text-muted hover:text-white hover:border-accent-violet/40 flex items-center justify-center transition-all" aria-label="Edit blog">
        <Edit3 className="w-3.5 h-3.5" />
      </button>
      <button onClick={e => action(e, onDelete)} className="w-8 h-8 rounded-full border border-white/10 text-text-muted hover:text-accent-pink hover:border-accent-pink/40 flex items-center justify-center transition-all" aria-label="Delete blog">
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="rounded-2xl p-px bg-gradient-to-br from-accent-violet/50 via-white/5 to-accent-cyan/30 transition-all duration-500 hover:shadow-[0_0_45px_rgba(139,92,246,0.12)]">
          <div className="bg-surface/90 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl">
            <div className="flex flex-col md:flex-row">
              {imageNode}
              <div className="p-6 md:p-8 flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center font-display font-bold text-xs text-accent-violet">
                      {post.author.initials}
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-white">{post.author.name}</p>
                      <p className="font-mono text-[10px] text-text-faint">{formatDate(post.updatedAt || post.date)}</p>
                    </div>
                  </div>
                  {ownerActions}
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-accent-violet transition-colors">
                  {highlightMatch(post.title, query)}
                </h2>
                <p className="font-body text-sm text-text-muted leading-relaxed line-clamp-3">{highlightMatch(post.excerpt, query)}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 4).map(tag => (
                    <span key={tag} className="font-mono text-[9px] uppercase tracking-wider text-text-faint bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-full">#{tag}</span>
                  ))}
                </div>
                <div className="mt-auto">
                  {metaNode}
                  <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-accent-violet group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <div className="h-full rounded-2xl p-px bg-gradient-to-br from-white/10 via-white/5 to-accent-violet/20 transition-all duration-500 hover:from-accent-violet/50 hover:to-accent-cyan/30 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]">
        <div className="h-full bg-surface/90 border border-white/5 rounded-2xl overflow-hidden flex flex-col backdrop-blur-xl">
          {imageNode}
          <div className="p-5 flex flex-col gap-3 flex-1">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-full bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center font-display font-bold text-[10px] text-accent-violet shrink-0">
                  {post.author.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xs font-bold text-white truncate">{post.author.name}</p>
                  <p className="font-mono text-[9px] text-text-faint">Updated {formatDate(post.updatedAt || post.date)}</p>
                </div>
              </div>
              {ownerActions}
            </div>
            <h3 className="font-display text-lg font-bold text-white group-hover:text-accent-violet transition-colors line-clamp-2">
              {highlightMatch(post.title, query)}
            </h3>
            <p className="font-body text-sm text-text-muted leading-relaxed line-clamp-3 flex-1">
              {highlightMatch(post.excerpt, query)}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map(tag => (
                <span key={tag} className="font-mono text-[9px] text-text-faint bg-white/[0.03] border border-white/5 px-2 py-1 rounded-full">#{tag}</span>
              ))}
            </div>
            {metaNode}
            <span className="inline-flex items-center gap-1 font-mono text-xs text-accent-violet group-hover:gap-2 transition-all">
              Read More <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface BlogEditorModalProps {
  post?: BlogPost | null;
  onClose: () => void;
  onSave: (post: BlogPost) => void;
}

function BlogEditorModal({ post, onClose, onSave }: BlogEditorModalProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [category, setCategory] = useState(post?.category || 'ai');
  const [tags, setTags] = useState((post?.tags || ['AI']).join(', '));
  const [image, setImage] = useState(post?.image || '');
  const [status, setStatus] = useState<BlogStatus>(post?.status || 'draft');
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle || post?.title || '');
  const [seoDescription, setSeoDescription] = useState(post?.seoDescription || post?.excerpt || '');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    if (editorRef.current && post?.content) editorRef.current.innerHTML = post.content;
  }, [post]);

  const content = () => editorRef.current?.innerHTML || '';

  const draftSnapshot = useMemo(() => ({
    id: post?.id || `draft-${Date.now()}`,
    title,
    excerpt,
    category,
    tags,
    image,
    status,
    seoTitle,
    seoDescription,
  }), [category, excerpt, image, post?.id, seoDescription, seoTitle, status, tags, title]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const payload = { ...draftSnapshot, content: content(), updatedAt: new Date().toISOString() };
      writeJson(STORAGE_KEYS.drafts, payload);
      setLastSaved(new Date().toISOString());
    }, 30000);
    return () => window.clearInterval(interval);
  }, [draftSnapshot]);

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  };

  const insertImage = (src: string) => {
    exec('insertHTML', `<img src="${src}" alt="" style="max-width:100%;border-radius:16px;margin:1rem 0;border:1px solid rgba(255,255,255,0.1)" />`);
  };

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.type)) {
      setError('Upload PNG, JPG, JPEG, or WEBP images only.');
      return;
    }
    setUploadProgress(15);
    const reader = new FileReader();
    reader.onprogress = event => {
      if (event.lengthComputable) setUploadProgress(Math.round((event.loaded / event.total) * 80));
    };
    reader.onload = () => {
      const src = String(reader.result);
      setImage(src);
      insertImage(src);
      setUploadProgress(100);
      window.setTimeout(() => setUploadProgress(0), 900);
    };
    reader.readAsDataURL(file);
  };

  const save = (nextStatus: BlogStatus) => {
    const richContent = content();
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!richContent.replace(/<[^>]*>/g, '').trim()) {
      setError('Content is required.');
      return;
    }
    if (!category) {
      setError('Category is required.');
      return;
    }

    const now = new Date().toISOString();
    const cleanTags = tags.split(',').map(tag => tag.trim().replace(/^#/, '')).filter(Boolean);
    const nextPost: BlogPost = {
      id: post?.id || `blog-${Date.now()}`,
      slug: post?.slug || slugify(title),
      title: title.trim(),
      subtitle: excerpt.trim(),
      excerpt: excerpt.trim(),
      category,
      tags: cleanTags.length ? cleanTags : ['AI'],
      readTime: estimateReadingTime(richContent),
      date: post?.date || now,
      createdAt: post?.createdAt || now,
      updatedAt: now,
      featured: post?.featured || false,
      image,
      status: nextStatus,
      views: post?.views || 0,
      likes: post?.likes || 0,
      comments: post?.comments || [],
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      authorId: CURRENT_AUTHOR.id,
      author: CURRENT_AUTHOR,
      content: richContent,
    };

    onSave(nextPost);
    writeJson(STORAGE_KEYS.drafts, null);
    onClose();
  };

  return (
    <div className="fixed left-0 right-0 bottom-0 top-[88px] md:top-[96px] z-40 flex items-start justify-center overflow-y-auto px-4 pb-6 pt-0 bg-black/80 backdrop-blur-xl">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="self-start w-full max-w-6xl max-h-[calc(100vh-88px)] md:max-h-[calc(100vh-96px)] overflow-y-auto rounded-b-2xl border border-t-0 border-white/10 bg-surface shadow-[0_0_80px_rgba(139,92,246,0.16)]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-surface/95 backdrop-blur-xl px-5 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent-violet">{post ? 'Edit Blog' : 'Create Blog'}</p>
            <h2 className="font-display text-xl font-bold text-white">Write in the portfolio voice</h2>
          </div>
          <div className="flex items-center gap-2">
            {lastSaved && <span className="hidden md:inline font-mono text-[10px] text-text-faint">Last edited {formatDate(lastSaved)}</span>}
            <button onClick={() => setPreview(!preview)} className="px-4 py-2 rounded-xl border border-white/10 text-text-muted hover:text-white hover:border-accent-violet/40 font-mono text-xs transition-all">
              {preview ? 'Editor' : 'Preview'}
            </button>
            <button onClick={onClose} className="w-10 h-10 rounded-xl border border-white/10 text-text-muted hover:text-white hover:border-white/20 flex items-center justify-center transition-all" aria-label="Close editor">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-0">
          <aside className="border-b lg:border-b-0 lg:border-r border-white/10 p-5 space-y-4">
            {error && <div className="rounded-xl border border-accent-pink/30 bg-accent-pink/10 px-4 py-3 font-mono text-xs text-accent-pink">{error}</div>}
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-faint">Title</span>
              <input value={title} onChange={e => setTitle(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all focus:border-accent-violet/50" placeholder="Article title" />
            </label>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-faint">Short Description</span>
              <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3} className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all focus:border-accent-violet/50" placeholder="A tight summary for cards and SEO" />
            </label>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-faint">Category</span>
              <select value={category} onChange={e => setCategory(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 text-sm text-white outline-none transition-all focus:border-accent-violet/50">
                {CATEGORY_OPTIONS.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-faint">Tags</span>
              <input value={tags} onChange={e => setTags(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all focus:border-accent-violet/50" placeholder="AI, NextJS, React" />
            </label>
            <div
              onDrop={e => {
                e.preventDefault();
                handleFiles(e.dataTransfer.files);
              }}
              onDragOver={e => e.preventDefault()}
              className="rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-4 text-center transition-all hover:border-accent-violet/40"
            >
              <UploadCloud className="mx-auto mb-2 h-5 w-5 text-accent-violet" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint">Featured Image</p>
              <p className="mt-1 text-xs text-text-muted">Drag PNG, JPG, JPEG, or WEBP here</p>
              <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={e => handleFiles(e.target.files)} className="mt-3 block w-full text-xs text-text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-accent-violet file:px-3 file:py-2 file:font-mono file:text-xs file:text-white" />
              {uploadProgress > 0 && <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-gradient-to-r from-accent-cyan to-accent-violet transition-all" style={{ width: `${uploadProgress}%` }} /></div>}
              {image && <div className="relative mt-3 aspect-video overflow-hidden rounded-xl border border-white/10"><Image src={image} alt="" fill className="object-cover" /></div>}
            </div>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-faint">SEO Title</span>
              <input value={seoTitle} onChange={e => setSeoTitle(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all focus:border-accent-violet/50" />
            </label>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-faint">SEO Description</span>
              <textarea value={seoDescription} onChange={e => setSeoDescription(e.target.value)} rows={2} className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all focus:border-accent-violet/50" />
            </label>
          </aside>

          <section className="p-5">
            {!preview && (
              <div className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2">
                {[
                  { icon: Bold, label: 'Bold', action: () => exec('bold') },
                  { icon: Italic, label: 'Italic', action: () => exec('italic') },
                  { icon: Underline, label: 'Underline', action: () => exec('underline') },
                  { icon: Strikethrough, label: 'Strikethrough', action: () => exec('strikeThrough') },
                  { icon: List, label: 'Bullet List', action: () => exec('insertUnorderedList') },
                  { icon: ListOrdered, label: 'Numbered List', action: () => exec('insertOrderedList') },
                  { icon: Quote, label: 'Block Quote', action: () => exec('formatBlock', 'blockquote') },
                  { icon: Code2, label: 'Code Block', action: () => exec('formatBlock', 'pre') },
                  { icon: LinkIcon, label: 'Hyperlink', action: () => exec('createLink', window.prompt('Paste URL') || '') },
                  { icon: AlignLeft, label: 'Left', action: () => exec('justifyLeft') },
                  { icon: AlignCenter, label: 'Center', action: () => exec('justifyCenter') },
                  { icon: AlignRight, label: 'Right', action: () => exec('justifyRight') },
                  { icon: AlignJustify, label: 'Justify', action: () => exec('justifyFull') },
                  { icon: Undo2, label: 'Undo', action: () => exec('undo') },
                  { icon: Redo2, label: 'Redo', action: () => exec('redo') },
                  { icon: Table2, label: 'Table', action: () => exec('insertHTML', '<table><tbody><tr><td>Cell</td><td>Cell</td></tr></tbody></table>') },
                  { icon: Smile, label: 'Emoji', action: () => exec('insertText', '✨') },
                  { icon: AtSign, label: 'Mention', action: () => exec('insertText', '@') },
                  { icon: Minus, label: 'Horizontal Rule', action: () => exec('insertHorizontalRule') },
                  { icon: Video, label: 'Video Embed', action: () => exec('insertHTML', '<p>[video embed]</p>') },
                  { icon: Youtube, label: 'YouTube Embed', action: () => exec('insertHTML', '<p>[youtube embed]</p>') },
                ].map(tool => (
                  <button key={tool.label} type="button" onClick={tool.action} title={tool.label} className="w-9 h-9 rounded-xl border border-white/10 text-text-muted hover:text-white hover:border-accent-violet/40 flex items-center justify-center transition-all">
                    <tool.icon className="w-4 h-4" />
                  </button>
                ))}
                <select onChange={e => exec('formatBlock', e.target.value)} className="h-9 rounded-xl border border-white/10 bg-surface-elevated px-3 font-mono text-xs text-text-muted outline-none">
                  <option value="p">Text</option>
                  <option value="h1">H1</option>
                  <option value="h2">H2</option>
                  <option value="h3">H3</option>
                </select>
                <label title="Image Upload" className="w-9 h-9 rounded-xl border border-white/10 text-text-muted hover:text-white hover:border-accent-violet/40 flex items-center justify-center transition-all cursor-pointer">
                  <ImagePlus className="w-4 h-4" />
                  <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp" className="hidden" onChange={e => handleFiles(e.target.files)} />
                </label>
              </div>
            )}

            {preview ? (
              <div className="min-h-[460px] rounded-2xl border border-white/10 bg-black/20 p-6 text-text-muted">
                <h1 className="font-display text-3xl font-bold text-white">{title || 'Untitled draft'}</h1>
                <p className="mt-3 text-text-muted">{excerpt}</p>
                <div className="mt-8 space-y-4 leading-8" dangerouslySetInnerHTML={{ __html: content() }} />
              </div>
            ) : (
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onPaste={() => window.setTimeout(() => setLastSaved(new Date().toISOString()), 0)}
                className="min-h-[460px] rounded-2xl border border-white/10 bg-black/20 p-6 text-text-muted outline-none transition-all focus:border-accent-violet/40 [&_a]:text-accent-violet [&_blockquote]:border-l-2 [&_blockquote]:border-accent-violet [&_blockquote]:pl-4 [&_blockquote]:text-white [&_h1]:font-display [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-black/40 [&_pre]:p-4 [&_table]:w-full [&_td]:border [&_td]:border-white/10 [&_td]:p-2"
              >
                {!post?.content && <p>Start writing your article...</p>}
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] text-text-faint">
                  <Hash className="w-3 h-3" /> /{slugify(title || 'untitled')}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] text-text-faint">
                  <Clock className="w-3 h-3" /> {estimateReadingTime(content())} min read
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => save('draft')} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 font-mono text-xs text-text-muted hover:text-white hover:border-accent-violet/40 transition-all">
                  <Save className="w-4 h-4" /> Save Draft
                </button>
                <button onClick={() => save('published')} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-violet px-4 py-2 font-mono text-xs font-bold text-black hover:brightness-110 transition-all">
                  <BookOpen className="w-4 h-4" /> Publish
                </button>
              </div>
            </div>
          </section>
        </div>
      </m.div>
    </div>
  );
}

function DeleteDialog({ post, onCancel, onConfirm }: { post: BlogPost; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed left-0 right-0 bottom-0 top-[88px] md:top-[96px] z-40 flex items-start justify-center overflow-y-auto bg-black/80 px-4 pb-6 pt-0 backdrop-blur-xl">
      <m.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="max-w-md rounded-2xl border border-white/10 bg-surface p-6 shadow-[0_0_60px_rgba(255,0,110,0.12)]">
        <div className="w-12 h-12 rounded-2xl border border-accent-pink/30 bg-accent-pink/10 text-accent-pink flex items-center justify-center mb-4">
          <Trash2 className="w-5 h-5" />
        </div>
        <h2 className="font-display text-2xl font-bold text-white">Delete this blog?</h2>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          This will archive "{post.title}" instead of permanently removing it, so accidental deletion can be recovered later.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onCancel} className="rounded-xl border border-white/10 px-4 py-2 font-mono text-xs text-text-muted hover:text-white transition-all">Cancel</button>
          <button onClick={onConfirm} className="rounded-xl bg-accent-pink px-4 py-2 font-mono text-xs font-bold text-white hover:brightness-110 transition-all">Archive Blog</button>
        </div>
      </m.div>
    </div>
  );
}

export function BlogPageClient({ mode = 'all' }: { mode?: 'all' | 'bookmarks' }) {
  const [localPosts, setLocalPosts] = useState<BlogPost[]>([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortValue>('newest');
  const [readingFilter, setReadingFilter] = useState<ReadingFilter>('all');
  const [statusFilter, setStatusFilter] = useState<'published' | 'draft'>('published');
  const [visibleCount, setVisibleCount] = useState(10);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const [editorPost, setEditorPost] = useState<BlogPost | null | undefined>(undefined);
  const [deletePost, setDeletePost] = useState<BlogPost | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [authConfigured, setAuthConfigured] = useState(true);

  useEffect(() => {
    setLocalPosts(readJson<BlogPost[]>(STORAGE_KEYS.posts, []).map(normalizePost));
    setBookmarks(readJson<string[]>(STORAGE_KEYS.bookmarks, []));
    setLikes(readJson<string[]>(STORAGE_KEYS.likes, []));

    fetch('/api/auth/owner', { cache: 'no-store' })
      .then(async response => response.ok ? response.json() : Promise.reject(new Error('Failed to check owner session')))
      .then(data => {
        setIsOwner(Boolean(data?.isOwner));
        setAuthConfigured(Boolean(data?.configured));
      })
      .catch(() => {
        setIsOwner(false);
      });
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 250);
    return () => window.clearTimeout(timer);
  }, [query]);

  const allPosts = useMemo(() => {
    const staticPosts = blogPosts.map(normalizePost);
    const localById = new Map(localPosts.map(post => [post.id, normalizePost(post)]));
    return staticPosts.map(post => localById.get(post.id) || post).concat(localPosts.filter(post => !staticPosts.some(staticPost => staticPost.id === post.id)));
  }, [localPosts]);

  const publishedPosts = allPosts.filter(post => post.status !== 'archived' && post.status !== 'draft');
  const featuredPosts = publishedPosts.filter(post => post.featured);

  const filteredPosts = useMemo(() => {
    const source = mode === 'bookmarks'
      ? allPosts.filter(post => bookmarks.includes(post.id) && post.status !== 'archived')
      : allPosts.filter(post => post.status === (isOwner ? statusFilter : 'published'));

    return source
      .filter(post => category === 'all' || post.category === category)
      .filter(post => {
        if (!selectedTags.length) return true;
        const lowered = post.tags.map(tag => tag.toLowerCase());
        return selectedTags.every(tag => lowered.includes(tag.toLowerCase()));
      })
      .filter(post => {
        if (readingFilter === 'short') return post.readTime < 5;
        if (readingFilter === 'medium') return post.readTime >= 5 && post.readTime <= 10;
        if (readingFilter === 'long') return post.readTime > 10 && post.readTime <= 20;
        if (readingFilter === 'epic') return post.readTime > 20;
        return true;
      })
      .filter(post => {
        if (!debouncedQuery) return true;
        const haystack = [post.title, post.excerpt, post.category, post.author.name, post.tags.join(' '), post.content || ''].join(' ').toLowerCase();
        return haystack.includes(debouncedQuery);
      })
      .sort((a, b) => {
        if (sort === 'oldest') return new Date(a.createdAt || a.date).getTime() - new Date(b.createdAt || b.date).getTime();
        if (sort === 'az') return a.title.localeCompare(b.title);
        if (sort === 'views') return (b.views || 0) - (a.views || 0);
        if (sort === 'likes') return (b.likes || 0) - (a.likes || 0);
        if (sort === 'updated') return new Date(b.updatedAt || b.date).getTime() - new Date(a.updatedAt || a.date).getTime();
        if (sort === 'readTime') return a.readTime - b.readTime;
        return new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime();
      });
  }, [allPosts, bookmarks, category, debouncedQuery, isOwner, mode, readingFilter, selectedTags, sort, statusFilter]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const saveLocalPosts = (next: BlogPost[]) => {
    setLocalPosts(next);
    writeJson(STORAGE_KEYS.posts, next);
  };

  const savePost = (post: BlogPost) => {
    const next = localPosts.some(item => item.id === post.id)
      ? localPosts.map(item => item.id === post.id ? post : item)
      : [...localPosts, post];
    saveLocalPosts(next);
  };

  const toggleBookmark = (post: BlogPost) => {
    const next = bookmarks.includes(post.id) ? bookmarks.filter(id => id !== post.id) : [...bookmarks, post.id];
    setBookmarks(next);
    writeJson(STORAGE_KEYS.bookmarks, next);
  };

  const toggleLike = (post: BlogPost) => {
    const alreadyLiked = likes.includes(post.id);
    const nextLikes = alreadyLiked ? likes.filter(id => id !== post.id) : [...likes, post.id];
    const update = (item: BlogPost) => item.id === post.id ? { ...item, likes: Math.max(0, (item.likes || 0) + (alreadyLiked ? -1 : 1)) } : item;
    setLikes(nextLikes);
    writeJson(STORAGE_KEYS.likes, nextLikes);
    saveLocalPosts(localPosts.some(item => item.id === post.id) ? localPosts.map(update) : [...localPosts, update(normalizePost(post))]);
  };

  const sharePost = async (post: BlogPost) => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    if (navigator.share) await navigator.share({ title: post.title, text: post.excerpt, url });
    else await navigator.clipboard.writeText(url);
  };

  const confirmDelete = () => {
    if (!deletePost) return;
    const archived = { ...deletePost, status: 'archived' as BlogStatus, updatedAt: new Date().toISOString() };
    saveLocalPosts(localPosts.some(item => item.id === archived.id) ? localPosts.map(item => item.id === archived.id ? archived : item) : [...localPosts, archived]);
    setDeletePost(null);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(current => current.includes(tag) ? current.filter(item => item !== tag) : [...current, tag]);
  };

  const requestOwnerAccess = async () => {
    if (!authConfigured) {
      window.alert('Owner auth is not configured. Set BLOG_OWNER_PASSWORD in your .env.local and restart the server.');
      return;
    }

    const password = window.prompt('Enter owner password');
    if (!password) return;

    const response = await fetch('/api/auth/owner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      window.alert('Invalid owner password');
      return;
    }

    setIsOwner(true);
  };

  const exitOwnerAccess = async () => {
    await fetch('/api/auth/owner', { method: 'DELETE' });
    setIsOwner(false);
    setEditorPost(undefined);
    setDeletePost(null);
    setStatusFilter('published');
  };

  return (
    <PageTransition>
      <main className="min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div>
            <m.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="font-mono text-xs text-accent-violet uppercase tracking-widest mb-3">
              {mode === 'bookmarks' ? 'Saved Reading' : 'Writing'}
            </m.p>
            <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              {mode === 'bookmarks' ? 'My Bookmarks' : 'Blog & Insights'}
            </m.h1>
            <m.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-base text-text-muted max-w-lg">
              {mode === 'bookmarks'
                ? 'Saved articles, drafts worth revisiting, and ideas queued for deeper reading.'
                : 'Thoughts on AI automation, machine learning, and building premium digital products.'}
            </m.p>
          </div>

          {mode === 'all' && featuredPosts.length > 0 && (!isOwner || statusFilter === 'published') && (
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col gap-4">
              <h2 className="font-mono text-xs text-text-faint uppercase tracking-widest">Featured Post</h2>
              <div className="flex flex-col gap-4">
                {featuredPosts.slice(0, 1).map(post => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    featured
                    query={debouncedQuery}
                    showOwnerActions={isOwner}
                    bookmarked={bookmarks.includes(post.id)}
                    liked={likes.includes(post.id)}
                    onBookmark={toggleBookmark}
                    onLike={toggleLike}
                    onShare={sharePost}
                    onEdit={setEditorPost}
                    onDelete={setDeletePost}
                  />
                ))}
              </div>
            </m.div>
          )}

          <section className="sticky top-20 z-30 rounded-2xl border border-white/10 bg-background/80 p-4 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-faint" />
                  <input
                    value={query}
                    onChange={e => {
                      setQuery(e.target.value);
                      setVisibleCount(10);
                    }}
                    placeholder="Search title, author, tags, category, or content..."
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white placeholder:text-text-faint outline-none transition-all focus:border-accent-violet/50 focus:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
                  />
                </div>
                <div className="grid grid-cols-2 md:flex gap-2">
                  <select value={sort} onChange={e => setSort(e.target.value as SortValue)} className="rounded-xl border border-white/10 bg-surface-elevated px-3 py-3 font-mono text-xs text-text-muted outline-none transition-all focus:border-accent-violet/50">
                    {SORT_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                  <select value={readingFilter} onChange={e => setReadingFilter(e.target.value as ReadingFilter)} className="rounded-xl border border-white/10 bg-surface-elevated px-3 py-3 font-mono text-xs text-text-muted outline-none transition-all focus:border-accent-violet/50">
                    {READING_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                  {mode === 'all' && isOwner && (
                    <button onClick={() => setStatusFilter(statusFilter === 'published' ? 'draft' : 'published')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 font-mono text-xs text-text-muted hover:text-white hover:border-accent-violet/40 transition-all">
                      <Filter className="w-4 h-4" /> {statusFilter === 'published' ? 'Drafts' : 'Published'}
                    </button>
                  )}
                  {isOwner ? (
                    <>
                      <button onClick={() => setEditorPost(null)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-violet px-4 py-3 font-mono text-xs font-bold text-black hover:brightness-110 transition-all">
                        <Plus className="w-4 h-4" /> Create Blog
                      </button>
                      <button onClick={exitOwnerAccess} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 font-mono text-xs text-text-muted hover:text-white hover:border-accent-pink/40 transition-all">
                        Exit Owner
                      </button>
                    </>
                  ) : (
                    <button onClick={requestOwnerAccess} className="inline-flex items-center justify-center gap-2 rounded-xl border border-accent-violet/30 bg-accent-violet/10 px-4 py-3 font-mono text-xs font-bold text-accent-violet hover:border-accent-violet/60 transition-all">
                      Unlock Owner
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                <button onClick={() => setCategory('all')} className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all ${category === 'all' ? 'border-accent-violet bg-accent-violet text-white' : 'border-white/10 text-text-faint hover:text-white hover:border-accent-violet/40'}`}>All</button>
                {CATEGORY_OPTIONS.map(item => (
                  <button key={item.value} onClick={() => setCategory(item.value)} className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all ${category === item.value ? 'border-accent-violet bg-accent-violet text-white' : 'border-white/10 text-text-faint hover:text-white hover:border-accent-violet/40'}`}>
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {TAG_OPTIONS.map(tag => (
                  <button key={tag} onClick={() => toggleTag(tag)} className={`rounded-full border px-3 py-1.5 font-mono text-[10px] transition-all ${selectedTags.includes(tag) ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-white/10 text-text-faint hover:text-white hover:border-accent-cyan/40'}`}>
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <div className="flex items-center justify-between gap-4">
            <h2 className="font-mono text-xs text-text-faint uppercase tracking-widest">
              {mode === 'bookmarks' ? 'Bookmarked Articles' : (isOwner && statusFilter === 'draft') ? 'Saved Drafts' : 'All Articles'} ({filteredPosts.length})
            </h2>
            {mode === 'all' ? (
              <Link href="/blog/bookmarks" className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors">
                <Bookmark className="w-4 h-4" /> My Bookmarks
              </Link>
            ) : (
              <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" /> Back to Blogs
              </Link>
            )}
          </div>

          <AnimatePresence mode="wait">
            <m.div
              key={`${category}-${selectedTags.join('-')}-${sort}-${readingFilter}-${debouncedQuery}-${statusFilter}-${mode}`}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visiblePosts.map((post, idx) => (
                <m.div key={post.id} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: Math.min(idx * 0.06, 0.4), duration: 0.5 } } }} className="h-full">
                  <BlogCard
                    post={post}
                    query={debouncedQuery}
                    showOwnerActions={isOwner}
                    bookmarked={bookmarks.includes(post.id)}
                    liked={likes.includes(post.id)}
                    onBookmark={toggleBookmark}
                    onLike={toggleLike}
                    onShare={sharePost}
                    onEdit={setEditorPost}
                    onDelete={setDeletePost}
                  />
                </m.div>
              ))}
              {visiblePosts.length === 0 && (
                <m.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="col-span-full rounded-2xl border border-white/10 bg-surface/60 p-12 text-center">
                  <MoreHorizontal className="mx-auto mb-3 h-6 w-6 text-text-faint" />
                  <p className="font-mono text-sm text-text-faint">No articles match the current filters.</p>
                </m.div>
              )}
            </m.div>
          </AnimatePresence>

          {visibleCount < filteredPosts.length && (
            <div className="flex justify-center">
              <button onClick={() => setVisibleCount(count => count + 10)} className="rounded-xl border border-white/10 px-5 py-3 font-mono text-xs text-text-muted hover:text-white hover:border-accent-violet/40 transition-all">
                Load More
              </button>
            </div>
          )}

          <NewsletterSignup />
        </div>
      </main>

      <AnimatePresence>
        {isOwner && editorPost !== undefined && <BlogEditorModal post={editorPost} onClose={() => setEditorPost(undefined)} onSave={savePost} />}
        {isOwner && deletePost && <DeleteDialog post={deletePost} onCancel={() => setDeletePost(null)} onConfirm={confirmDelete} />}
      </AnimatePresence>
    </PageTransition>
  );
}

export default BlogPageClient;

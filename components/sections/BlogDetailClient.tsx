'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { m } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bookmark,
  CalendarDays,
  Clock,
  Copy,
  Edit3,
  Eye,
  Heart,
  Link as LinkIcon,
  MessageCircle,
  Printer,
  Reply,
  Share2,
  Trash2,
  User,
} from 'lucide-react';
import { BlogComment, BlogPost } from '@/types';
import { blogPosts } from '@/data/blog';
import { SOCIAL_LINKS } from '@/lib/constants';

interface BlogDetailClientProps {
  post?: BlogPost | null;
  relatedPosts: BlogPost[];
  slug: string;
}

const STORAGE_KEYS = {
  posts: 'portfolio.blog.localPosts',
  bookmarks: 'portfolio.blog.bookmarks',
  likes: 'portfolio.blog.likes',
  views: 'portfolio.blog.viewed',
};

const CURRENT_AUTHOR = {
  id: 'vishnu-priyan',
  name: 'B Vishnu Priyan',
  initials: 'VP',
};

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    update();
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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatNumber(value = 0) {
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  return String(value);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function categoryLabel(category: string) {
  const labels: Record<string, string> = {
    ai: 'AI',
    'machine-learning': 'Machine Learning',
    web: 'Web Development',
    nextjs: 'Next.js',
    react: 'React',
    design: 'Design',
    career: 'Career',
    business: 'Business',
    technology: 'Technology',
    programming: 'Programming',
  };
  return labels[category] || category;
}

function normalizePost(post: BlogPost): BlogPost {
  const createdAt = post.createdAt || post.date;
  return {
    ...post,
    createdAt,
    updatedAt: post.updatedAt || createdAt,
    status: post.status || 'published',
    views: post.views ?? 900 + post.title.length * 37,
    likes: post.likes ?? 80 + post.tags.length * 19,
    comments: post.comments || [],
    authorId: post.authorId || CURRENT_AUTHOR.id,
    author: {
      ...post.author,
      bio: post.author.bio || 'Creative developer, ML engineer, and UI/UX designer building intelligent digital products.',
      socials: post.author.socials || {
        website: '/contact',
        linkedin: SOCIAL_LINKS.linkedin,
        github: SOCIAL_LINKS.github,
      },
    },
  };
}

function markdownToHtml(markdown: string) {
  const html = markdown
    .trim()
    .replace(/```(\w+)?\n([\s\S]+?)```/g, (_match, _language, code) => `<pre><code>${String(code).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`)
    .replace(/^### (.+)$/gm, (_match, title) => `<h3 id="${slugify(title)}">${title}<button data-copy-heading="${slugify(title)}" aria-label="Copy heading link">#</button></h3>`)
    .replace(/^## (.+)$/gm, (_match, title) => `<h2 id="${slugify(title)}">${title}<button data-copy-heading="${slugify(title)}" aria-label="Copy heading link">#</button></h2>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/^- (.+)$/gm, '<li>$1</li>');

  return html
    .split(/\n{2,}/)
    .map(block => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (/^<(h2|h3|pre|ul|ol|table|blockquote)/.test(trimmed) || trimmed.startsWith('<li>')) {
        if (trimmed.startsWith('<li>')) return `<ul>${trimmed}</ul>`;
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
    })
    .join('');
}

function getHtml(post: BlogPost) {
  const content = post.content || '';
  return /<\/?[a-z][\s\S]*>/i.test(content) ? content : markdownToHtml(content);
}

function getHeadings(html: string) {
  const headings: { id: string; title: string; level: number }[] = [];
  const regex = /<h([23])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h[23]>/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html))) {
    headings.push({
      level: Number(match[1]),
      id: match[2],
      title: match[3].replace(/<[^>]+>/g, '').replace('#', '').trim(),
    });
  }

  return headings;
}

function ArticleImage({ post }: { post: BlogPost }) {
  return (
    <div className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated">
      {post.image ? (
        <Image src={post.image} alt={post.title} fill className="object-cover" priority sizes="(min-width: 1024px) 896px, 100vw" />
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="font-mono text-[8rem] font-bold text-white/5 select-none">{post.category.slice(0, 2).toUpperCase()}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
    </div>
  );
}

function CommentThread({ comments, canManage, onDelete, onEdit, onReply }: {
  comments: BlogComment[];
  canManage: boolean;
  onDelete: (comment: BlogComment) => void;
  onEdit: (comment: BlogComment) => void;
  onReply: (comment: BlogComment) => void;
}) {
  const parents = comments.filter(comment => !comment.parentComment);
  const replies = (id: string) => comments.filter(comment => comment.parentComment === id);

  return (
    <div className="space-y-4">
      {parents.map(comment => (
        <div key={comment.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center font-display font-bold text-xs text-accent-violet">{comment.authorInitials}</div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-sm font-bold text-white">{comment.authorName}</span>
                <span className="rounded-full border border-accent-cyan/20 bg-accent-cyan/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-accent-cyan">Author</span>
                <span className="font-mono text-[10px] text-text-faint">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{comment.content}</p>
              {canManage && (
                <div className="mt-3 flex gap-3">
                  <button onClick={() => onReply(comment)} className="inline-flex items-center gap-1 font-mono text-[10px] text-text-faint hover:text-white"><Reply className="w-3 h-3" /> Reply</button>
                  <button onClick={() => onEdit(comment)} className="inline-flex items-center gap-1 font-mono text-[10px] text-text-faint hover:text-white"><Edit3 className="w-3 h-3" /> Edit</button>
                  <button onClick={() => onDelete(comment)} className="inline-flex items-center gap-1 font-mono text-[10px] text-text-faint hover:text-accent-pink"><Trash2 className="w-3 h-3" /> Delete</button>
                </div>
              )}
            </div>
          </div>
          {replies(comment.id).length > 0 && (
            <div className="mt-4 space-y-3 border-l border-white/10 pl-4">
              {replies(comment.id).map(reply => (
                <div key={reply.id} className="rounded-xl border border-white/5 bg-black/20 p-3">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xs font-bold text-white">{reply.authorName}</span>
                    <span className="font-mono text-[9px] text-text-faint">{formatDate(reply.createdAt)}</span>
                  </div>
                  <p className="mt-1 text-sm text-text-muted">{reply.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {comments.length === 0 && <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center font-mono text-xs text-text-faint">No comments yet. Start the conversation.</p>}
    </div>
  );
}

export function BlogDetailClient({ post: initialPost, relatedPosts, slug }: BlogDetailClientProps) {
  const [localPosts, setLocalPosts] = useState<BlogPost[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [authConfigured, setAuthConfigured] = useState(true);
  const [comment, setComment] = useState('');
  const [replyTo, setReplyTo] = useState<BlogComment | null>(null);
  const [activeHeading, setActiveHeading] = useState('');

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

  const post = useMemo(() => {
    const local = localPosts.find(item => item.slug === slug && item.status !== 'archived');
    return local || (initialPost ? normalizePost(initialPost) : null);
  }, [initialPost, localPosts, slug]);

  const allPosts = useMemo(() => {
    const staticPosts = blogPosts.map(normalizePost);
    const localById = new Map(localPosts.map(item => [item.id, item]));
    return staticPosts.map(item => localById.get(item.id) || item).concat(localPosts.filter(item => !staticPosts.some(staticPost => staticPost.id === item.id)));
  }, [localPosts]);

  const html = useMemo(() => post ? getHtml(post) : '', [post]);
  const headings = useMemo(() => getHeadings(html), [html]);

  useEffect(() => {
    if (!post) return;
    const viewed = readJson<string[]>(STORAGE_KEYS.views, []);
    if (viewed.includes(post.id)) return;

    const nextPost = { ...post, views: (post.views || 0) + 1 };
    const nextLocal = localPosts.some(item => item.id === nextPost.id)
      ? localPosts.map(item => item.id === nextPost.id ? nextPost : item)
      : [...localPosts, nextPost];
    setLocalPosts(nextLocal);
    writeJson(STORAGE_KEYS.posts, nextLocal);
    writeJson(STORAGE_KEYS.views, [...viewed, post.id]);
  }, [post?.id]);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveHeading(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -65% 0px' });

    headings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    const click = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const id = target.dataset.copyHeading;
      if (id) navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${id}`);
    };
    document.addEventListener('click', click);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', click);
    };
  }, [headings]);

  if (!post) {
    return (
      <div className="rounded-2xl border border-white/10 bg-surface p-10 text-center">
        <h1 className="font-display text-3xl font-bold text-white">Article not found</h1>
        <p className="mt-3 text-text-muted">This post may have been archived or only exists in another browser session.</p>
        <Link href="/blog" className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 font-mono text-xs text-text-muted hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>
      </div>
    );
  }

  const currentIndex = allPosts.filter(item => item.status === 'published').findIndex(item => item.id === post.id);
  const previousPost = currentIndex > 0 ? allPosts.filter(item => item.status === 'published')[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 ? allPosts.filter(item => item.status === 'published')[currentIndex + 1] : null;
  const isBookmarked = bookmarks.includes(post.id);
  const isLiked = likes.includes(post.id);

  const savePost = (nextPost: BlogPost) => {
    const nextLocal = localPosts.some(item => item.id === nextPost.id)
      ? localPosts.map(item => item.id === nextPost.id ? nextPost : item)
      : [...localPosts, nextPost];
    setLocalPosts(nextLocal);
    writeJson(STORAGE_KEYS.posts, nextLocal);
  };

  const handleShare = async () => {
    if (navigator.share) await navigator.share({ title: post.title, text: post.excerpt, url: window.location.href });
    else await navigator.clipboard.writeText(window.location.href);
  };

  const toggleBookmark = () => {
    const next = isBookmarked ? bookmarks.filter(id => id !== post.id) : [...bookmarks, post.id];
    setBookmarks(next);
    writeJson(STORAGE_KEYS.bookmarks, next);
  };

  const toggleLike = () => {
    const nextLikes = isLiked ? likes.filter(id => id !== post.id) : [...likes, post.id];
    setLikes(nextLikes);
    writeJson(STORAGE_KEYS.likes, nextLikes);
    savePost({ ...post, likes: Math.max(0, (post.likes || 0) + (isLiked ? -1 : 1)) });
  };

  const submitComment = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isOwner) return;
    if (!comment.trim()) return;
    const now = new Date().toISOString();
    const nextComment: BlogComment = {
      id: `comment-${Date.now()}`,
      blogId: post.id,
      authorId: CURRENT_AUTHOR.id,
      authorName: CURRENT_AUTHOR.name,
      authorInitials: CURRENT_AUTHOR.initials,
      content: comment.trim(),
      parentComment: replyTo?.id,
      createdAt: now,
      updatedAt: now,
    };
    savePost({ ...post, comments: [...(post.comments || []), nextComment] });
    setComment('');
    setReplyTo(null);
  };

  const editComment = (target: BlogComment) => {
    if (!isOwner) return;
    const next = window.prompt('Edit comment', target.content);
    if (!next) return;
    savePost({
      ...post,
      comments: (post.comments || []).map(item => item.id === target.id ? { ...item, content: next, updatedAt: new Date().toISOString() } : item),
    });
  };

  const deleteComment = (target: BlogComment) => {
    if (!isOwner) return;
    savePost({ ...post, comments: (post.comments || []).filter(item => item.id !== target.id && item.parentComment !== target.id) });
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

  const related = relatedPosts.length
    ? relatedPosts.map(normalizePost)
    : allPosts.filter(item => item.id !== post.id && (item.category === post.category || item.tags.some(tag => post.tags.includes(tag)))).slice(0, 3);

  return (
    <>
      <ReadingProgress />

      <m.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-10"
      >
        <div className="min-w-0 flex flex-col gap-8">
          <header className="flex flex-col gap-5">
            <Link href="/blog" className="inline-flex w-fit items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blogs
            </Link>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-[10px] uppercase tracking-widest border border-accent-violet/30 bg-accent-violet/10 text-accent-violet px-3 py-1 rounded-full">
                {categoryLabel(post.category)}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-text-faint"><Clock className="w-3.5 h-3.5" /> {post.readTime} min read</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-text-faint"><Eye className="w-3.5 h-3.5" /> {formatNumber(post.views)} views</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-text-faint"><CalendarDays className="w-3.5 h-3.5" /> Updated {formatDate(post.updatedAt || post.date)}</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">{post.title}</h1>
            <p className="font-body text-lg text-text-muted leading-relaxed">{post.subtitle || post.excerpt}</p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center font-display font-bold text-sm text-accent-violet">
                  {post.author.initials}
                </div>
                <div>
                  <div className="font-display text-sm font-bold text-white">{post.author.name}</div>
                  <div className="font-mono text-[10px] text-text-faint">{formatDate(post.createdAt || post.date)}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={toggleLike} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-mono text-xs transition-all ${isLiked ? 'border-accent-pink bg-accent-pink/10 text-accent-pink' : 'border-white/10 text-text-muted hover:text-accent-pink hover:border-accent-pink/40'}`}>
                  <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} /> {formatNumber(post.likes)}
                </button>
                <button onClick={toggleBookmark} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-mono text-xs transition-all ${isBookmarked ? 'border-accent-violet bg-accent-violet text-white' : 'border-white/10 text-text-muted hover:text-white hover:border-accent-violet/40'}`}>
                  <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} /> Save
                </button>
                <button onClick={handleShare} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 font-mono text-xs text-text-muted hover:text-white hover:border-accent-cyan/40 transition-all">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 font-mono text-xs text-text-muted hover:text-white hover:border-white/20 transition-all">
                  <Printer className="w-4 h-4" /> Print
                </button>
              </div>
            </div>
          </header>

          <ArticleImage post={post} />

          <div
            className="prose-dark max-w-none text-text-muted leading-8
              [&_a]:text-accent-violet [&_a]:underline [&_a]:underline-offset-4
              [&_blockquote]:border-l-2 [&_blockquote]:border-accent-violet [&_blockquote]:pl-5 [&_blockquote]:text-white
              [&_code]:rounded [&_code]:border [&_code]:border-white/10 [&_code]:bg-white/[0.04] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-accent-violet
              [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-white
              [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-white
              [&_h2_button]:ml-2 [&_h2_button]:text-text-faint [&_h2_button]:opacity-0 [&_h2_button]:transition-opacity [&_h2:hover_button]:opacity-100
              [&_h3_button]:ml-2 [&_h3_button]:text-text-faint [&_h3_button]:opacity-0 [&_h3_button]:transition-opacity [&_h3:hover_button]:opacity-100
              [&_li]:ml-5 [&_li]:list-disc [&_p]:mb-5
              [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-black/40 [&_pre]:p-5"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
            {post.tags.map(tag => (
              <span key={tag} className="font-mono text-[9px] uppercase tracking-wider text-text-faint bg-surface border border-white/5 px-3 py-1 rounded-full">#{tag}</span>
            ))}
          </div>

          <section className="rounded-2xl border border-white/10 bg-surface/70 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-14 h-14 rounded-2xl bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center font-display font-bold text-accent-violet">{post.author.initials}</div>
              <div className="flex-1">
                <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint">Author</p>
                <h2 className="font-display text-2xl font-bold text-white">{post.author.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{post.author.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-text-faint">{allPosts.filter(item => item.author.name === post.author.name).length} Articles</span>
                  <Link href="/contact" className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-text-faint hover:text-white">View Profile</Link>
                  {post.author.socials?.linkedin && <a href={post.author.socials.linkedin} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-text-faint hover:text-white" target="_blank" rel="noreferrer">LinkedIn</a>}
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-2xl font-bold text-white">Comments</h2>
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-2 font-mono text-xs text-text-faint"><MessageCircle className="w-4 h-4" /> {post.comments?.length || 0}</span>
                {!isOwner && (
                  <button onClick={requestOwnerAccess} className="rounded-xl border border-accent-violet/30 bg-accent-violet/10 px-3 py-1.5 font-mono text-[10px] font-bold text-accent-violet hover:border-accent-violet/60 transition-all">
                    Unlock Owner
                  </button>
                )}
              </div>
            </div>
            {isOwner ? (
              <form onSubmit={submitComment} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                {replyTo && (
                  <div className="mb-3 flex items-center justify-between rounded-xl border border-accent-violet/20 bg-accent-violet/10 px-3 py-2">
                    <span className="font-mono text-[10px] text-accent-violet">Replying to {replyTo.authorName}</span>
                    <button type="button" onClick={() => setReplyTo(null)} className="font-mono text-[10px] text-text-faint hover:text-white">Cancel</button>
                  </div>
                )}
                <textarea value={comment} onChange={event => setComment(event.target.value)} rows={3} placeholder="Add a thoughtful comment..." className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-text-faint focus:border-accent-violet/50" />
                <div className="mt-3 flex justify-end">
                  <button type="submit" className="rounded-xl bg-gradient-to-r from-accent-cyan to-accent-violet px-4 py-2 font-mono text-xs font-bold text-black hover:brightness-110 transition-all">Add Comment</button>
                </div>
              </form>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 font-mono text-xs text-text-faint">
                Comments are read-only for visitors.
              </div>
            )}
            <CommentThread canManage={isOwner} comments={post.comments || []} onDelete={deleteComment} onEdit={editComment} onReply={setReplyTo} />
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {previousPost && (
              <Link href={`/blog/${previousPost.slug}`} className="rounded-2xl border border-white/10 bg-surface/70 p-4 hover:border-accent-violet/40 transition-all">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] text-text-faint"><ArrowLeft className="w-3 h-3" /> Previous Article</span>
                <h3 className="mt-2 font-display text-base font-bold text-white line-clamp-2">{previousPost.title}</h3>
              </Link>
            )}
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="rounded-2xl border border-white/10 bg-surface/70 p-4 hover:border-accent-violet/40 transition-all sm:text-right">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] text-text-faint">Next Article <ArrowRight className="w-3 h-3" /></span>
                <h3 className="mt-2 font-display text-base font-bold text-white line-clamp-2">{nextPost.title}</h3>
              </Link>
            )}
          </div>

          {related.length > 0 && (
            <section className="pt-8 border-t border-white/5">
              <h2 className="font-display text-2xl font-bold text-white mb-4">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map(item => (
                  <Link key={item.id} href={`/blog/${item.slug}`} className="group block bg-surface border border-white/5 hover:border-accent-violet/30 rounded-xl p-4 transition-colors">
                    <span className="font-mono text-[9px] text-text-faint uppercase tracking-wider">{categoryLabel(item.category)}</span>
                    <h3 className="font-display text-base font-bold text-white group-hover:text-accent-violet transition-colors mt-1 mb-2 line-clamp-2">{item.title}</h3>
                    <div className="flex items-center gap-2 text-text-faint">
                      <Clock className="w-3 h-3" />
                      <span className="font-mono text-[9px]">{item.readTime} min</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-surface/70 p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint mb-4">Table of Contents</p>
              <nav className="space-y-2">
                {headings.map(heading => (
                  <a key={heading.id} href={`#${heading.id}`} className={`block font-mono text-[11px] transition-colors ${heading.level === 3 ? 'pl-3' : ''} ${activeHeading === heading.id ? 'text-accent-violet' : 'text-text-faint hover:text-white'}`}>
                    {heading.title}
                  </a>
                ))}
                {headings.length === 0 && <span className="font-mono text-[11px] text-text-faint">No headings yet.</span>}
              </nav>
            </div>
            <div className="rounded-2xl border border-white/10 bg-surface/70 p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint mb-3">Reading</p>
              <div className="space-y-2 font-mono text-[11px] text-text-faint">
                <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Estimated {post.readTime} min</p>
                <p className="flex items-center gap-2"><User className="w-3.5 h-3.5" /> {post.author.name}</p>
                <p className="flex items-center gap-2"><LinkIcon className="w-3.5 h-3.5" /> {categoryLabel(post.category)}</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 font-mono text-[10px] text-text-faint hover:text-white">
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 font-mono text-[10px] text-text-faint hover:text-white">
                  <ArrowUp className="w-3.5 h-3.5" /> Top
                </button>
              </div>
            </div>
          </div>
        </aside>
      </m.article>
    </>
  );
}

export default BlogDetailClient;

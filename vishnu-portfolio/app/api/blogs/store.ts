import { BlogComment, BlogPost } from '@/types';
import { blogPosts } from '@/data/blog';

const now = () => new Date().toISOString();

function normalize(post: BlogPost): BlogPost {
  const createdAt = post.createdAt || post.date;
  return {
    ...post,
    createdAt,
    updatedAt: post.updatedAt || createdAt,
    status: post.status || 'published',
    views: post.views ?? 900 + post.title.length * 37,
    likes: post.likes ?? 80 + post.tags.length * 19,
    comments: post.comments || [],
    authorId: post.authorId || 'vishnu-priyan',
  };
}

let blogs: BlogPost[] = blogPosts.map(normalize);
let bookmarks: { id: string; userId: string; blogId: string }[] = [];
let likes: { id: string; userId: string; blogId: string }[] = [];
let drafts: { id: string; userId: string; blogId?: string; content: string; updatedAt: string }[] = [];

export function listBlogs() {
  return blogs.filter(blog => blog.status !== 'archived');
}

export function getBlog(identifier: string) {
  return blogs.find(blog => blog.id === identifier || blog.slug === identifier);
}

export function upsertBlog(post: BlogPost) {
  const next = normalize({
    ...post,
    updatedAt: now(),
    createdAt: post.createdAt || now(),
  });

  blogs = blogs.some(blog => blog.id === next.id)
    ? blogs.map(blog => blog.id === next.id ? next : blog)
    : [next, ...blogs];

  return next;
}

export function archiveBlog(id: string) {
  const blog = getBlog(id);
  if (!blog) return null;
  const archived = { ...blog, status: 'archived' as const, updatedAt: now() };
  blogs = blogs.map(item => item.id === blog.id ? archived : item);
  return archived;
}

export function listCategories() {
  return Array.from(new Set(listBlogs().map(blog => blog.category)));
}

export function listTags() {
  return Array.from(new Set(listBlogs().flatMap(blog => blog.tags)));
}

export function listFeatured() {
  return listBlogs().filter(blog => blog.featured && blog.status === 'published');
}

export function addComment(input: Omit<BlogComment, 'id' | 'createdAt' | 'updatedAt'>) {
  const blog = getBlog(input.blogId);
  if (!blog) return null;

  const comment: BlogComment = {
    ...input,
    id: `comment-${Date.now()}`,
    createdAt: now(),
    updatedAt: now(),
  };

  upsertBlog({ ...blog, comments: [...(blog.comments || []), comment] });
  return comment;
}

export function deleteComment(commentId: string) {
  const blog = blogs.find(item => item.comments?.some(comment => comment.id === commentId));
  if (!blog) return false;
  upsertBlog({
    ...blog,
    comments: (blog.comments || []).filter(comment => comment.id !== commentId && comment.parentComment !== commentId),
  });
  return true;
}

export function setLike(userId: string, blogId: string, enabled: boolean) {
  const blog = getBlog(blogId);
  if (!blog) return null;
  const exists = likes.some(like => like.userId === userId && like.blogId === blog.id);

  if (enabled && !exists) {
    likes = [...likes, { id: `like-${Date.now()}`, userId, blogId: blog.id }];
    upsertBlog({ ...blog, likes: (blog.likes || 0) + 1 });
  }

  if (!enabled && exists) {
    likes = likes.filter(like => !(like.userId === userId && like.blogId === blog.id));
    upsertBlog({ ...blog, likes: Math.max(0, (blog.likes || 0) - 1) });
  }

  return getBlog(blog.id);
}

export function setBookmark(userId: string, blogId: string, enabled: boolean) {
  const blog = getBlog(blogId);
  if (!blog) return null;
  const exists = bookmarks.some(bookmark => bookmark.userId === userId && bookmark.blogId === blog.id);

  if (enabled && !exists) bookmarks = [...bookmarks, { id: `bookmark-${Date.now()}`, userId, blogId: blog.id }];
  if (!enabled && exists) bookmarks = bookmarks.filter(bookmark => !(bookmark.userId === userId && bookmark.blogId === blog.id));

  return bookmarks.filter(bookmark => bookmark.userId === userId);
}

export function listDrafts(userId: string) {
  return drafts.filter(draft => draft.userId === userId);
}

export function upsertDraft(input: { userId: string; blogId?: string; content: string }) {
  const draft = {
    id: input.blogId || `draft-${Date.now()}`,
    ...input,
    updatedAt: now(),
  };
  drafts = drafts.some(item => item.id === draft.id)
    ? drafts.map(item => item.id === draft.id ? draft : item)
    : [draft, ...drafts];
  return draft;
}

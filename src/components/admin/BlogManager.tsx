"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getBlogs, createBlog, deleteBlog } from "@/app/admin/actions";
import { Plus, Trash2, Edit, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function BlogManager() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  const loadBlogs = async () => {
    setLoading(true);
    const res = await getBlogs();
    if (res.success) {
      setBlogs(res.data || []);
    } else {
      setError(res.error || "Failed to load blogs");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    
    const res = await deleteBlog(id);
    if (res.success) {
      loadBlogs();
    } else {
      alert("Failed to delete: " + res.error);
    }
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const res = await createBlog(formData);
    
    if (res.success) {
      setIsCreating(false);
      loadBlogs();
    } else {
      setError(res.error || "Failed to create blog");
    }
    setSubmitLoading(false);
  };

  if (isCreating) {
    return (
      <Card className="bg-[#0F172A]/50 backdrop-blur-md border-white/5 border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Create New Blog Post</CardTitle>
          <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-4">
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-muted">Title *</label>
                <Input name="title" required placeholder="Post Title" className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-muted">Slug *</label>
                <Input name="slug" required placeholder="post-url-slug" className="bg-white/5 border-white/10" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-muted">Author</label>
                <Input name="author" placeholder="Author Name" className="bg-white/5 border-white/10" defaultValue="BITSOL MARKETING" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-muted">Image URL</label>
                <Input name="image" placeholder="https://..." className="bg-white/5 border-white/10" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-muted">Tags (comma separated)</label>
              <Input name="tags" placeholder="AI, Marketing, SEO" className="bg-white/5 border-white/10" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-muted">Excerpt</label>
              <Textarea name="excerpt" placeholder="Short description..." className="bg-white/5 border-white/10 h-20" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-muted">Content * (HTML supported)</label>
              <Textarea name="content" required placeholder="<p>Blog content goes here...</p>" className="bg-white/5 border-white/10 h-64 font-mono text-sm" />
            </div>

            <Button type="submit" className="w-full bg-brand-cyan text-brand-dark hover:bg-brand-cyan/80" disabled={submitLoading}>
              {submitLoading ? "Publishing..." : "Publish Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#0F172A]/50 backdrop-blur-md border-white/5 border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Blog Management</CardTitle>
        <Button 
          onClick={() => setIsCreating(true)} 
          className="bg-brand-cyan text-brand-dark hover:bg-brand-cyan/80 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Post
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8 text-brand-muted">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-8 text-brand-muted">No blog posts found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left text-sm text-brand-muted">
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Author</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-4">
                      <div className="font-medium text-white">{blog.title}</div>
                      <div className="text-xs text-brand-muted mt-1">{blog.slug}</div>
                    </td>
                    <td className="py-4 text-sm text-brand-muted">{blog.author}</td>
                    <td className="py-4 text-sm text-brand-muted">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/blog/${blog.slug}`} target="_blank">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-brand-muted hover:text-white">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/20 hover:text-destructive"
                          onClick={() => handleDelete(blog.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

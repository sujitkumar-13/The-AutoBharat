import { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, FileText, FolderOpen, Plus, ArrowLeft, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { RichTextEditor } from "@/components/RichTextEditor";
import { ImageUpload } from "@/components/ImageUpload";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  category_id: string | null;
  status: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  ad_html: string | null;
  hinglish_content: string | null;
  published_at: string | null;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

// Post Editor Component
function PostEditor({ postId, onSave }: { postId?: string; onSave: () => void }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [hinglishContent, setHinglishContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("draft");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [adHtml, setAdHtml] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<"english" | "hinglish">("english");

  useEffect(() => {
    supabase.from("categories").select("*").then(({ data }) => {
      if (data) setCategories(data);
    });

    if (postId) {
      supabase.from("posts").select("*").eq("id", postId).single().then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setSlug(data.slug);
          setExcerpt(data.excerpt || "");
          setContent(data.content || "");
          setHinglishContent(data.hinglish_content || "");
          setFeaturedImage(data.featured_image || "");
          setCategoryId(data.category_id || "");
          setStatus(data.status);
          setMetaTitle(data.meta_title || "");
          setMetaDescription(data.meta_description || "");
          setMetaKeywords(data.meta_keywords || "");
          setAdHtml(data.ad_html || "");
        }
      });
    }
  }, [postId]);

  const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSave = async (publishStatus?: string) => {
    setSaving(true);
    const finalStatus = publishStatus || status;
    const postData = {
      title,
      slug: slug || generateSlug(title),
      excerpt,
      content,
      hinglish_content: hinglishContent || null,
      featured_image: featuredImage || null,
      category_id: categoryId || null,
      status: finalStatus,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      meta_keywords: metaKeywords || null,
      ad_html: adHtml || null,
      published_at: finalStatus === "published" ? new Date().toISOString() : null,
    };

    let error;
    if (postId) {
      ({ error } = await supabase.from("posts").update(postData).eq("id", postId));
    } else {
      ({ error } = await supabase.from("posts").insert(postData));
    }

    setSaving(false);

    if (error) {
      alert("Error saving post: " + error.message);
      console.error("Save error:", error);
    } else {
      onSave();
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-display text-2xl tracking-wider">
          {postId ? "Edit Post" : "New Post"}
        </h2>
        <div className="flex gap-3">
          <button onClick={() => setPreview(!preview)} className="flex items-center gap-2 px-4 py-2 border border-border text-display text-xs tracking-widest hover:border-accent transition-colors">
            {preview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {preview ? "Edit" : "Preview"}
          </button>
          <button onClick={() => handleSave("draft")} disabled={saving} className="px-4 py-2 border border-border text-display text-xs tracking-widest hover:border-accent transition-colors disabled:opacity-50">
            Save Draft
          </button>
          <button onClick={() => handleSave("published")} disabled={saving} className="px-4 py-2 bg-accent text-accent-foreground text-display text-xs tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50">
            Publish
          </button>
        </div>
      </div>

      {preview ? (
        <div className="border border-border p-8 bg-card">
          <span className="text-display text-xs tracking-[0.2em] text-accent">{categories.find(c => c.id === categoryId)?.name}</span>
          <h1 className="text-display text-3xl mt-2">{title}</h1>
          <p className="text-muted-foreground mt-4 text-editorial">{excerpt}</p>
          <div className="mt-8 text-editorial" dangerouslySetInnerHTML={{ __html: activeTab === "hinglish" && hinglishContent ? hinglishContent : content }} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-display text-xs tracking-widest block mb-2">Title</label>
              <input value={title} onChange={(e) => { setTitle(e.target.value); if (!postId) setSlug(generateSlug(e.target.value)); }} className="w-full bg-card border border-border px-4 py-3 text-foreground outline-none focus:border-accent transition-colors text-sm" />
            </div>
            <div>
              <label className="text-display text-xs tracking-widest block mb-2">Slug</label>
              <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full bg-card border border-border px-4 py-3 text-foreground outline-none focus:border-accent transition-colors text-sm" />
            </div>
          </div>

          <div>
            <label className="text-display text-xs tracking-widest block mb-2">Category</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full bg-card border border-border px-4 py-3 text-foreground outline-none focus:border-accent transition-colors text-sm">
              <option value="">Select category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="text-display text-xs tracking-widest block mb-2">Featured Image</label>
            <ImageUpload value={featuredImage} onChange={setFeaturedImage} />
          </div>

          <div>
            <label className="text-display text-xs tracking-widest block mb-2">Excerpt</label>
            <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="w-full bg-card border border-border px-4 py-3 text-foreground outline-none focus:border-accent transition-colors text-sm resize-none" />
          </div>

          {/* Content Tabs: English / Hinglish */}
          <div>
            <div className="flex gap-4 mb-4 border-b border-border">
              <button
                onClick={() => setActiveTab("english")}
                className={`pb-2 text-display text-xs tracking-widest transition-colors ${activeTab === "english" ? "text-accent border-b-2 border-accent" : "text-muted-foreground hover:text-foreground"}`}
              >
                English Content
              </button>
              <button
                onClick={() => setActiveTab("hinglish")}
                className={`pb-2 text-display text-xs tracking-widest transition-colors ${activeTab === "hinglish" ? "text-accent border-b-2 border-accent" : "text-muted-foreground hover:text-foreground"}`}
              >
                Hinglish Content
              </button>
            </div>
            {activeTab === "english" ? (
              <RichTextEditor content={content} onChange={setContent} />
            ) : (
              <RichTextEditor content={hinglishContent} onChange={setHinglishContent} />
            )}
          </div>

          {/* SEO Section */}
          <div className="border-t border-border pt-6">
            <h3 className="text-display text-sm tracking-widest mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-display text-xs tracking-widest block mb-2">Meta Title <span className="text-muted-foreground">({metaTitle.length}/60)</span></label>
                <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} maxLength={60} className="w-full bg-card border border-border px-4 py-3 text-foreground outline-none focus:border-accent transition-colors text-sm" />
              </div>
              <div>
                <label className="text-display text-xs tracking-widest block mb-2">Meta Description <span className="text-muted-foreground">({metaDescription.length}/160)</span></label>
                <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} maxLength={160} rows={2} className="w-full bg-card border border-border px-4 py-3 text-foreground outline-none focus:border-accent transition-colors text-sm resize-none" />
              </div>
              <div>
                <label className="text-display text-xs tracking-widest block mb-2">Keywords</label>
                <input value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} placeholder="comma, separated, keywords" className="w-full bg-card border border-border px-4 py-3 text-foreground outline-none focus:border-accent transition-colors text-sm" />
              </div>
            </div>
          </div>

          {/* Ad HTML */}
          <div className="border-t border-border pt-6">
            <h3 className="text-display text-sm tracking-widest mb-4">Ad HTML Injection</h3>
            <textarea value={adHtml} onChange={(e) => setAdHtml(e.target.value)} rows={4} placeholder="<div>Your ad code here</div>" className="w-full bg-card border border-border px-4 py-3 text-foreground outline-none focus:border-accent transition-colors text-sm font-mono resize-none" />
          </div>
        </div>
      )}
    </div>
  );
}

// Posts List
function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (error) {
      console.error("Fetch posts error:", error);
      alert("Error fetching posts: " + error.message);
    }
    if (data) setPosts(data as Post[]);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("posts").delete().eq("id", id);
    fetchPosts();
  };

  if (creating || editingId) {
    return (
      <div>
        <button onClick={() => { setCreating(false); setEditingId(null); }} className="flex items-center gap-2 text-sm text-muted-foreground hover-accent mb-6 text-display tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to posts
        </button>
        <PostEditor postId={editingId || undefined} onSave={() => { setCreating(false); setEditingId(null); fetchPosts(); }} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-display text-2xl tracking-wider">Posts</h2>
        <button onClick={() => setCreating(true)} className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground text-display text-xs tracking-widest hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 border border-border bg-card animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {posts.map((post) => (
              <div key={post.id} className="flex items-center justify-between px-6 py-4 border border-border bg-card hover:border-accent/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-display text-sm truncate">{post.title}</h3>
                    <span className={`text-display text-[10px] tracking-widest px-2 py-0.5 border ${post.status === "published" ? "border-accent text-accent" : "border-border text-muted-foreground"}`}>
                      {post.status}
                    </span>
                    {post.hinglish_content && (
                      <span className="text-display text-[10px] tracking-widest px-2 py-0.5 border border-border text-muted-foreground">
                        HI
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(post.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => setEditingId(post.id)} className="p-2 hover:text-accent transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 hover:text-accent transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
            {posts.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">No posts yet. Create your first post.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Categories Manager
function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*").order("name");
    if (data) setCategories(data);
  };

  useEffect(() => { fetchCategories(); }, []);

  const addCategory = async () => {
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await supabase.from("categories").insert({ name: newName.trim(), slug });
    setNewName("");
    fetchCategories();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await supabase.from("categories").delete().eq("id", id);
    fetchCategories();
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-display text-2xl tracking-wider mb-8">Categories</h2>
      <div className="flex gap-3 mb-8">
        <input value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCategory()} placeholder="New category name" className="flex-1 bg-card border border-border px-4 py-3 text-foreground outline-none focus:border-accent transition-colors text-sm" />
        <button onClick={addCategory} className="px-4 py-3 bg-accent text-accent-foreground text-display text-xs tracking-widest hover:opacity-90 transition-opacity">Add</button>
      </div>
      <div className="space-y-2">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between px-4 py-3 border border-border">
            <span className="text-display text-sm">{cat.name}</span>
            <button onClick={() => deleteCategory(cat.id)} className="text-muted-foreground hover:text-accent transition-colors"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Dashboard
const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <main className="min-h-screen flex">
        <aside className="w-56 border-r border-border min-h-screen p-6 hidden md:block">
          <div className="space-y-4">
            <div className="h-4 bg-muted animate-pulse w-3/4" />
            <div className="h-4 bg-muted animate-pulse w-1/2" />
          </div>
        </aside>
        <div className="flex-1 p-8">
          <div className="h-8 bg-muted animate-pulse w-48 mb-8" />
          <div className="space-y-4">
            <div className="h-20 bg-muted animate-pulse w-full border border-border" />
            <div className="h-20 bg-muted animate-pulse w-full border border-border" />
            <div className="h-20 bg-muted animate-pulse w-full border border-border" />
          </div>
        </div>
      </main>
    );
  }

  if (!user || !isAdmin) return null;

  const isPostsActive = location.pathname === "/admin" || location.pathname === "/admin/posts";
  const isCategoriesActive = location.pathname === "/admin/categories";

  return (
    <main className="min-h-screen">
      {/* Admin header - uses relative positioning so it doesn't overlap sidebar nav */}
      <header className="sticky top-0 z-30 border-b border-border px-8 py-4 flex items-center justify-between bg-background">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-display text-lg tracking-wider">AUTOBHARAT</Link>
          <span className="text-display text-xs tracking-widest text-muted-foreground">ADMIN</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">{user.email}</span>
          <button onClick={signOut} className="p-2 hover:text-accent transition-colors"><LogOut className="w-4 h-4" /></button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 border-r border-border min-h-[calc(100vh-57px)] p-6">
          <nav className="space-y-1">
            <Link to="/admin" className={`flex items-center gap-3 px-3 py-2 text-display text-sm tracking-wider transition-colors ${isPostsActive ? "text-accent" : "hover-accent"}`}>
              <FileText className="w-4 h-4" /> Posts
            </Link>
            <Link to="/admin/categories" className={`flex items-center gap-3 px-3 py-2 text-display text-sm tracking-wider transition-colors ${isCategoriesActive ? "text-accent" : "hover-accent"}`}>
              <FolderOpen className="w-4 h-4" /> Categories
            </Link>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route index element={<PostsList />} />
            <Route path="posts" element={<PostsList />} />
            <Route path="categories" element={<CategoriesManager />} />
          </Routes>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;

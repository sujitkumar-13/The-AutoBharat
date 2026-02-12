import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Languages } from "lucide-react";
import { usePostBySlug, usePublishedPosts } from "@/hooks/usePosts";
import { InteractiveFooter } from "@/components/InteractiveFooter";
import { AdBlock } from "@/components/AdBlock";
import { SuggestedPosts } from "@/components/SuggestedPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const { data: post, isLoading } = usePostBySlug(slug);
  const { data: allPosts = [] } = usePublishedPosts();
  const [isHinglish, setIsHinglish] = useState(false);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-display text-sm tracking-widest text-muted-foreground">Loading...</div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display text-4xl mb-4">Article Not Found</h1>
          <Link to="/" className="text-accent hover-accent text-display text-sm tracking-widest">
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const suggestedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);
  const relatedPosts = allPosts.filter((p) => p.id !== post.id && p.category_id === post.category_id).slice(0, 2);

  const displayContent = isHinglish && post.hinglish_content ? post.hinglish_content : (post.content || "");
  const contentParts = displayContent.split(/(?=<h2>)/);

  return (
    <>
      <article>
        <header className="relative h-[70vh] overflow-hidden">
          {post.featured_image && (
            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-display text-xs tracking-[0.3em] text-accent">{post.category_name}</span>
              <h1 className="text-display text-3xl sm:text-5xl md:text-6xl leading-tight mt-4">{post.title}</h1>
              {post.published_at && (
                <time className="block mt-6 text-sm text-muted-foreground tracking-wider">
                  {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>
              )}
            </motion.div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 pt-12 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover-accent transition-colors text-display tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          {post.hinglish_content && (
            <button
              onClick={() => setIsHinglish(!isHinglish)}
              className={`inline-flex items-center gap-2 px-4 py-2 border text-display text-xs tracking-widest transition-colors ${
                isHinglish ? "border-accent text-accent" : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
              }`}
            >
              <Languages className="w-4 h-4" />
              {isHinglish ? "English" : "Hinglish"}
            </button>
          )}
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <div className="text-editorial text-secondary-foreground [&>p]:mb-6 [&>h2]:text-display [&>h2]:text-2xl [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:text-foreground [&>blockquote]:border-l-2 [&>blockquote]:border-accent [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-muted-foreground">
              {contentParts.map((part, i) => (
                <div key={i}>
                  <div dangerouslySetInnerHTML={{ __html: part }} />
                  {i === 0 && <AdBlock slot="In-Article Top" />}
                  {i === 1 && post.ad_html && <AdBlock html={post.ad_html} />}
                </div>
              ))}
            </div>
            <AdBlock slot="After Article" />
          </motion.div>

          <aside className="space-y-8">
            <AdBlock slot="Sidebar Top" />
            {relatedPosts.length > 0 && <SuggestedPosts posts={relatedPosts} title="Related" />}
            <AdBlock slot="Sidebar Mid" />
            {suggestedPosts.length > 0 && <SuggestedPosts posts={suggestedPosts} title="More Stories" />}
          </aside>
        </div>
      </article>

      <InteractiveFooter />
    </>
  );
};

export default BlogPost;

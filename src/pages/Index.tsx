import { motion } from "framer-motion";
import { HeroSlider } from "@/components/HeroSlider";
import { BlogCard } from "@/components/BlogCard";
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton";
import { InteractiveFooter } from "@/components/InteractiveFooter";
import { usePublishedPosts } from "@/hooks/usePosts";

const Index = () => {
  const { data: posts = [], isLoading, error } = usePublishedPosts();
  const featuredPosts = posts.slice(0, 3);
  const otherPosts = posts.slice(1);

  if (isLoading) {
    return (
      <main>
        <section className="relative h-[80vh] w-full overflow-hidden bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-4 w-full max-w-4xl px-6">
              <div className="h-12 bg-muted-foreground/10 rounded w-2/3 animate-pulse" />
              <div className="h-6 bg-muted-foreground/10 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="mb-16">
            <div className="accent-line mb-6" />
            <div className="h-10 bg-muted-foreground/10 rounded w-48 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2, 3, 4].map((i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (posts.length === 0 && !isLoading) {
    if (error) {
      return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-display text-lg text-accent">Unable to load posts.</p>
          <p className="text-muted-foreground text-sm">Please check your internet connection and try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-accent text-accent-foreground text-display text-xs tracking-widest hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        </main>
      );
    }
  }

  return (
    <main>
      {featuredPosts.length > 0 && <HeroSlider posts={featuredPosts} />}

      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="accent-line mb-6" />
          <h2 className="text-display text-3xl sm:text-4xl tracking-wider">
            Latest Stories
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {otherPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-muted-foreground text-sm">No articles published yet.</p>
        )}
      </section>

      <InteractiveFooter />
    </main>
  );
};

export default Index;

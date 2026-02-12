import { motion } from "framer-motion";
import { HeroSlider } from "@/components/HeroSlider";
import { BlogCard } from "@/components/BlogCard";
import { InteractiveFooter } from "@/components/InteractiveFooter";
import { usePublishedPosts } from "@/hooks/usePosts";

const Index = () => {
  const { data: posts = [], isLoading } = usePublishedPosts();
  const featuredPosts = posts.slice(0, 3);
  const otherPosts = posts.slice(1);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-display text-sm tracking-widest text-muted-foreground">Loading...</div>
      </main>
    );
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

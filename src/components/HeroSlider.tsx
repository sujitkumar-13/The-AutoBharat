import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Post } from "@/hooks/usePosts";

interface HeroSliderProps {
  posts: Post[];
}

export function HeroSlider({ posts }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const slideTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % posts.length);
  }, [posts.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + posts.length) % posts.length);
  }, [posts.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const post = posts[current];
  if (!post) return null;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={post.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          {post.featured_image && (
            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />

          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-16 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="text-display text-xs tracking-[0.3em] text-accent">
                {post.category_name}
              </span>
              <h2 className="text-display text-3xl sm:text-5xl md:text-6xl leading-tight mt-4">
                {post.title}
              </h2>
              <p className="mt-4 text-sm text-secondary-foreground text-editorial max-w-xl line-clamp-2">
                {post.excerpt}
              </p>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-block mt-6 text-display text-sm tracking-widest text-accent hover:tracking-[0.3em] transition-all duration-300"
              >
                Read Article →
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 right-8 flex items-center gap-4 z-10">
        <button onClick={prev} className="p-2 border border-border hover:border-accent transition-colors" aria-label="Previous">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => slideTo(i)}
              className={`w-8 h-[2px] transition-colors duration-300 ${i === current ? "bg-accent" : "bg-border"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} className="p-2 border border-border hover:border-accent transition-colors" aria-label="Next">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

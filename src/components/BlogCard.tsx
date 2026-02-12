import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Post } from "@/hooks/usePosts";

interface BlogCardProps {
  post: Post;
  index: number;
  featured?: boolean;
}

export function BlogCard({ post, index, featured = false }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/blog/${post.slug}`} className="group block">
        <div className={`relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-square"}`}>
          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors duration-500" />
          <div className="absolute top-4 left-4">
            <span className="text-display text-xs tracking-[0.2em] px-3 py-1 bg-background/80 backdrop-blur-sm border border-border">
              {post.category_name}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <h3 className={`text-display leading-tight group-hover:text-accent transition-colors duration-300 ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}>
            {post.title}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground text-editorial line-clamp-2">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-4">
            {post.published_at && (
              <time className="text-xs text-muted-foreground tracking-wider">
                {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </time>
            )}
            <span className="text-xs text-accent text-display tracking-widest group-hover:tracking-[0.3em] transition-all duration-300">
              Read →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

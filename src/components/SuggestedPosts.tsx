import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Post } from "@/hooks/usePosts";

interface SuggestedPostsProps {
  posts: Post[];
  title?: string;
}

export function SuggestedPosts({ posts, title = "Suggested" }: SuggestedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-t border-border pt-8"
    >
      <div className="accent-line mb-4" />
      <h3 className="text-display text-lg tracking-wider mb-6">{title}</h3>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="group flex gap-4">
            <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
              {post.featured_image && (
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-display text-[10px] tracking-[0.2em] text-accent">
                {post.category_name}
              </span>
              <h4 className="text-display text-sm leading-tight mt-1 group-hover:text-accent transition-colors line-clamp-2">
                {post.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </motion.aside>
  );
}

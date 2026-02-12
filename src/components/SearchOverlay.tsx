import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { usePublishedPosts } from "@/hooks/usePosts";

export function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: posts = [] } = usePublishedPosts();

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const results = query.trim()
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          (p.excerpt || "").toLowerCase().includes(query.toLowerCase()) ||
          (p.category_name || "").toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 border border-border text-sm text-display tracking-widest hover:border-accent hover:text-accent transition-all duration-300"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-md flex items-start justify-center pt-[20vh]"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl mx-6 bg-card border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-display tracking-wider outline-none"
                />
                <button onClick={() => setIsOpen(false)} className="hover-accent">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {query.trim() && (
                <div className="max-h-80 overflow-y-auto">
                  {results.length > 0 ? (
                    results.map((post) => (
                      <Link
                        key={post.id}
                        to={`/blog/${post.slug}`}
                        onClick={() => { setIsOpen(false); setQuery(""); }}
                        className="block px-6 py-4 hover:bg-secondary/50 transition-colors border-b border-border last:border-0"
                      >
                        <span className="text-display text-xs tracking-[0.2em] text-accent">
                          {post.category_name}
                        </span>
                        <h4 className="text-display text-sm mt-1">{post.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {post.excerpt}
                        </p>
                      </Link>
                    ))
                  ) : (
                    <div className="px-6 py-8 text-center text-muted-foreground text-sm">
                      No articles found for "{query}"
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

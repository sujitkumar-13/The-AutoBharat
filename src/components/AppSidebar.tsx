import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const location = useLocation();

  useEffect(() => {
    supabase.from("categories").select("*").order("name").then(({ data }) => {
      if (data) setCategories(data);
    });
  }, []);

  // Hide sidebar on admin pages
  if (location.pathname.startsWith("/admin")) return null;

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 flex items-center gap-3 hover-accent"
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="text-display text-sm tracking-widest hidden sm:inline">Menu</span>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 left-0 z-40 h-full w-72 bg-card border-r border-border flex flex-col pt-24 px-8"
          >
            <div className="flex flex-col gap-1">
              {menuItems.map((item, i) => (
                <motion.div key={item.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                  <Link to={item.path} onClick={() => setIsOpen(false)} className={`block py-3 text-display text-lg tracking-wider hover-accent transition-colors ${location.pathname === item.path ? "text-accent" : ""}`}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Categories */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <button onClick={() => setCategoriesOpen(!categoriesOpen)} className="flex items-center justify-between w-full py-3 text-display text-lg tracking-wider hover-accent">
                  <span>Categories</span>
                  {categoriesOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                <AnimatePresence>
                  {categoriesOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden pl-4">
                      {categories.map((cat) => (
                        <Link key={cat.id} to={`/?category=${cat.slug}`} onClick={() => setIsOpen(false)} className="block py-2 text-sm text-secondary-foreground hover-accent transition-colors">
                          {cat.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Footer in sidebar */}
            <div className="mt-auto pb-8">
              <div className="accent-line mb-4" />
              <p className="text-xs text-muted-foreground tracking-wider">© 2026 AUTOBHARAT</p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

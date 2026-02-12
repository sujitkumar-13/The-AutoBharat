import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";

export function JoinCommunityButton() {
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 border border-border text-sm text-display tracking-widest hover:border-accent hover:text-accent transition-all duration-300"
      >
        <Users className="w-4 h-4" />
        <span className="hidden sm:inline">Join Community</span>
      </button>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 right-6 z-50 px-6 py-4 bg-card border border-accent text-foreground"
          >
            <p className="text-display text-sm tracking-wider">Coming Soon</p>
            <p className="text-xs text-muted-foreground mt-1">
              Community features are under development.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

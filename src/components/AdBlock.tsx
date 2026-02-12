import { motion } from "framer-motion";

interface AdBlockProps {
  html?: string;
  slot?: string;
}

export function AdBlock({ html, slot = "advertisement" }: AdBlockProps) {
  if (html) {
    return (
      <div
        className="my-8 border border-border bg-card p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="my-8 border border-border bg-card flex items-center justify-center py-12"
    >
      <div className="text-center">
        <p className="text-display text-xs tracking-[0.3em] text-muted-foreground">
          {slot.toUpperCase()}
        </p>
        <p className="text-xs text-muted-foreground mt-1">Ad space</p>
      </div>
    </motion.div>
  );
}

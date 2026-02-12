import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { InteractiveFooter } from "@/components/InteractiveFooter";

const Contact = () => {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg text-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover-accent transition-colors text-display tracking-wider mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="accent-line mx-auto mb-8" />
          <h1 className="text-display text-4xl sm:text-5xl tracking-wider mb-6">
            Contact
          </h1>
          <p className="text-editorial text-muted-foreground mb-8">
            For editorial inquiries, partnerships, and collaborations.
          </p>
          <a
            href="mailto:ashwin@theautobharat.com"
            className="inline-flex items-center gap-3 px-6 py-3 border border-border text-display text-sm tracking-widest hover:border-accent hover:text-accent transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            ashwin@theautobharat.com
          </a>
        </motion.div>
      </main>

      <InteractiveFooter />
    </>
  );
};

export default Contact;

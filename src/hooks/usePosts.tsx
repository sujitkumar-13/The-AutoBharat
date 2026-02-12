import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  category_id: string | null;
  category_name?: string;
  status: string;
  published_at: string | null;
  created_at: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  ad_html: string | null;
  og_image: string | null;
  hinglish_content: string | null;
}

export function usePublishedPosts() {
  return useQuery({
    queryKey: ["published-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*, categories(name)")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return (data || []).map((p: any) => ({
        ...p,
        category_name: p.categories?.name || "Uncategorized",
      })) as Post[];
    },
  });
}

export function usePostBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("posts")
        .select("*, categories(name)")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return {
        ...data,
        category_name: (data as any).categories?.name || "Uncategorized",
      } as Post;
    },
    enabled: !!slug,
  });
}

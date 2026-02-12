
-- Add hinglish_content column to posts
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS hinglish_content text;

-- Create storage bucket for post images
INSERT INTO storage.buckets (id, name, public) VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view post images
CREATE POLICY "Anyone can view post images"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-images');

-- Allow admins to upload post images
CREATE POLICY "Admins can upload post images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'post-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to update post images
CREATE POLICY "Admins can update post images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'post-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete post images
CREATE POLICY "Admins can delete post images"
ON storage.objects FOR DELETE
USING (bucket_id = 'post-images' AND public.has_role(auth.uid(), 'admin'));

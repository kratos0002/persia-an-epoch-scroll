
-- 1. Create story_og table
CREATE TABLE public.story_og (
  story_id text PRIMARY KEY,
  og_title text,
  og_description text,
  og_image_url text,
  updated_by uuid,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.story_og ENABLE ROW LEVEL SECURITY;

-- Anyone can read OG data (crawlers need this)
CREATE POLICY "Anyone can read story OG data"
  ON public.story_og FOR SELECT
  TO public
  USING (true);

-- Only admins can insert
CREATE POLICY "Admins can insert story OG data"
  ON public.story_og FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update
CREATE POLICY "Admins can update story OG data"
  ON public.story_og FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete
CREATE POLICY "Admins can delete story OG data"
  ON public.story_og FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. Create og-images public storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('og-images', 'og-images', true);

-- Allow anyone to read from og-images (crawlers need public access)
CREATE POLICY "Public read access for og-images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'og-images');

-- Only admins can upload to og-images
CREATE POLICY "Admins can upload og-images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'og-images' AND has_role(auth.uid(), 'admin'::app_role));

-- Admins can update og-images
CREATE POLICY "Admins can update og-images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'og-images' AND has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete og-images
CREATE POLICY "Admins can delete og-images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'og-images' AND has_role(auth.uid(), 'admin'::app_role));

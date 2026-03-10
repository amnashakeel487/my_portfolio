-- Run this in SQL Editor if your profiles table was created before youtube_url was added
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS youtube_url text;

-- Create a table for storing email addresses
CREATE TABLE public.emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.emails ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert emails (no auth required)
CREATE POLICY "Anyone can insert emails" 
ON public.emails 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading emails (for admin purposes later if needed)
CREATE POLICY "Anyone can view emails" 
ON public.emails 
FOR SELECT 
USING (true);
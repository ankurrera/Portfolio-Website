-- Fix admin signup issue by allowing authenticated users to create admin profiles
-- This addresses the chicken-and-egg problem where only existing admins can create admin_users

-- Drop the overly restrictive admin_users policy
DROP POLICY IF EXISTS "Admins can manage admin_users" ON public.admin_users;

-- Create more nuanced policies for admin_users table
-- Allow admins to manage all admin_users
CREATE POLICY "Admins can manage all admin_users" ON public.admin_users
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users WHERE id = auth.uid()));

-- Allow authenticated users to insert themselves into admin_users (for initial signup)
CREATE POLICY "Authenticated users can create admin profile" ON public.admin_users
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Allow users to read their own admin profile
CREATE POLICY "Users can read own admin profile" ON public.admin_users
  FOR SELECT 
  USING (auth.uid() = id);
-- Allow initial admin user signup by adding a policy for authenticated users
-- This addresses the chicken-and-egg problem where only existing admins can create admin_users

-- Add policy to allow authenticated users to insert themselves into admin_users
-- This enables the initial admin signup process
CREATE POLICY "Allow authenticated users to create admin profile" ON public.admin_users
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Add policy to allow users to read their own admin profile
CREATE POLICY "Users can read own admin profile" ON public.admin_users
  FOR SELECT 
  USING (auth.uid() = id);
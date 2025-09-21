-- Fix infinite recursion in admin_users RLS policy
-- First, drop the existing policies that cause recursion
DROP POLICY IF EXISTS "Admins can manage admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow authenticated users to create admin profile" ON admin_users;
DROP POLICY IF EXISTS "Users can read own admin profile" ON admin_users;

-- Create a security definer function to check admin status without recursion
CREATE OR REPLACE FUNCTION public.is_admin_user(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = user_id
  );
$$;

-- Create new policies using the security definer function
CREATE POLICY "Users can create their own admin profile" 
ON admin_users 
FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read their own admin profile" 
ON admin_users 
FOR SELECT 
USING (auth.uid() = id);

-- Allow existing admins to manage all admin_users (but only after they exist)
CREATE POLICY "Existing admins can manage all admin profiles" 
ON admin_users 
FOR ALL 
USING (public.is_admin_user(auth.uid()));

-- Grant execute permission on the function to authenticated users
GRANT EXECUTE ON FUNCTION public.is_admin_user TO authenticated;
import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signOut, isAdmin, user } = useAuth();
  const { toast } = useToast();

  // Handle case where user authenticates but isn't admin
  useEffect(() => {
    if (user && !isAdmin && !loading) {
      toast({
        title: "Access Denied",
        description: "You are not authorized to access the admin panel. Please contact an administrator.",
        variant: "destructive",
      });
    }
  }, [user, isAdmin, loading, toast]);

  if (user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      // Sign-in succeeded - show success message
      toast({
        title: "Authentication Successful",
        description: "Checking admin permissions...",
        variant: "default",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            <div className="mt-4 text-center">
              {user && !isAdmin ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Signed in as: {user.email}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={signOut}
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
import React from 'react';
import { Outlet, NavLink, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FolderOpen, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Settings,
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminLayout = () => {
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  
  // Check for demo mode in the current URL or initial location
  const isDemoMode = location.search.includes('demo=true') || 
                     location.pathname.includes('demo') ||
                     sessionStorage.getItem('demoMode') === 'true';

  // Set demo mode in session storage for persistence
  React.useEffect(() => {
    if (location.search.includes('demo=true')) {
      sessionStorage.setItem('demoMode', 'true');
    }
  }, [location.search]);

  // Allow demo mode access
  if (!isDemoMode && (!user || !isAdmin)) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
    { name: 'Case Studies', href: '/admin/case-studies', icon: BookOpen },
    { name: 'Resume', href: '/admin/resume', icon: FileText },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const getDemoUrl = (href: string) => {
    return isDemoMode ? `${href}?demo=true` : href;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border">
        <div className="p-6">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm text-muted-foreground mt-1">Portfolio Management</p>
          {isDemoMode && (
            <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs text-yellow-800">
              Demo Mode - Changes won't be saved
            </div>
          )}
        </div>

        <nav className="px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={getDemoUrl(item.href)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={signOut}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
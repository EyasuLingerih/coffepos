// src/components/auth/ProtectedRoute.tsx
"use client";

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext'; // Use relative path within the same directory
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert, Loader2 } from 'lucide-react'; // Ensure TriangleAlert is imported
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

export function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { user, loading, userRole, authError } = useAuth(); // Destructure authError
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client after hydration
    setIsClient(true);
  }, []);


  // Don't render anything on the server or before hydration is complete
  // to avoid hydration mismatches related to redirects or auth state.
  if (!isClient) {
    return null; // Or a minimal loading skeleton if preferred
  }

  // Display specific auth initialization errors
   if (authError && !loading && !user) { // Show auth error only if not loading and no user
     return (
       <div className="flex items-center justify-center min-h-screen p-4">
          <Alert variant="destructive" className="max-w-lg">
            <TriangleAlert className="h-5 w-5" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription>
              {authError}. Please check your Firebase configuration (.env.local) and ensure the services are enabled. Restart the server after changes.
            </AlertDescription>
          </Alert>
        </div>
     );
   }


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
         <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
         <p className="text-lg text-muted-foreground">Loading user data...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login page if not authenticated
    // This check now only runs client-side
    // Ensure router is ready before pushing
     if (typeof window !== 'undefined') {
       router.push('/login');
     }
    // Return a loading state or null while redirecting
    return (
       <div className="flex flex-col items-center justify-center min-h-screen">
         <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
         <p className="ml-4 text-lg text-muted-foreground">Redirecting to login...</p>
      </div>
    );
  }

  // Check if user has the required role
  if (requiredRoles && requiredRoles.length > 0 && (!userRole || !requiredRoles.includes(userRole))) {
    // User doesn't have the required role, show an error or redirect
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
         <Alert variant="destructive" className="max-w-md">
           <TriangleAlert className="h-5 w-5" />
           <AlertTitle>Access Denied</AlertTitle>
           <AlertDescription>
             You do not have permission to access this page. Your role: {userRole || 'None'}. Required: {requiredRoles.join(', ')}.
           </AlertDescription>
         </Alert>
       </div>
    );
  }

  // User is authenticated and has the required role (if any)
  return <>{children}</>;
}

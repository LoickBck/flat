import React from 'react';
    import { Navigate, useLocation } from 'react-router-dom';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { AlertTriangle } from 'lucide-react';

    const RoleBasedGuard = ({ children, allowedRoles }) => {
      const { user, profile, loading } = useAuth();
      const location = useLocation();

      if (loading) {
        return <div className="flex justify-center items-center h-screen">Chargement...</div>;
      }

      if (!user) {
        return <Navigate to="/connexion" state={{ from: location }} replace />;
      }

      const userRole = profile?.role;
      const isAllowed = userRole && allowedRoles.includes(userRole);

      if (!isAllowed) {
        return (
            <div className="flex items-center justify-center p-8">
                <Card className="w-full max-w-md border-destructive/50 bg-destructive/10">
                    <CardHeader>
                        <CardTitle className="flex items-center text-destructive">
                            <AlertTriangle className="mr-3" />
                            Accès non autorisé
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-destructive/90">
                            Vous n'avez pas la permission d'accéder à cette page. Votre rôle actuel ({userRole || 'non défini'}) ne vous y autorise pas.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
      }

      return children;
    };

    export default RoleBasedGuard;
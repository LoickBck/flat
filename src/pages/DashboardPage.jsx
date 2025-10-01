import React from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import { Button } from "@/components/ui/button";
import { Link, Outlet, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import TenantDashboard from "@/components/dashboards/TenantDashboard";
import OwnerDashboard from "@/components/dashboards/OwnerDashboard";

const DefaultDashboard = () => {
  const { user, profile } = useAuth(); // ❌ SUPPRIMER loading ici !

  if (!user) return <Navigate to="/connexion" />;

  // Utiliser user.user_metadata.role si profile n'est pas disponible
  const role = profile?.role || user?.user_metadata?.role || "tenant";

  switch (role) {
    case "tenant":
      return <TenantDashboard user={user} />;
    case "owner":
      return <OwnerDashboard user={user} />;
    default:
      return <TenantDashboard user={user} />; // ✅ Par défaut tenant
  }
};

const DashboardPage = () => {
  const { user, loading } = useAuth();

  // ✅ GARDER UNE SEULE vérification de loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <h2 className="text-3xl font-bold text-foreground">
          Veuillez vous connecter
        </h2>
        <p className="text-muted-foreground mt-4 mb-8 max-w-md">
          Pour accéder à votre espace personnalisé, vous devez être connecté.
        </p>
        <div className="flex gap-4">
          <Link to="/connexion">
            <Button size="lg">Connexion</Button>
          </Link>
          <Link to="/inscription">
            <Button size="lg" variant="outline">
              Créer un compte
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Tableau de bord - Flat</title>
      </Helmet>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </>
  );
};

DashboardPage.DefaultDashboard = DefaultDashboard;

export default DashboardPage;

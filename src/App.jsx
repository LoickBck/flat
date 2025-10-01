import React from 'react';
    import { Routes, Route, Navigate } from 'react-router-dom';
    import { Helmet } from 'react-helmet';
    import Header from '@/components/Header';
    import Footer from '@/components/Footer';
    import HomePage from '@/pages/HomePage';
    import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
    import LegalMentionsPage from '@/pages/LegalMentionsPage';
    import DashboardPage from '@/pages/DashboardPage';
    import MyFilePage from '@/pages/MyFilePage';
    import MyPropertiesPage from '@/pages/MyPropertiesPage';
    import ApplicationsPage from '@/pages/ApplicationsPage';
    import ReceivedApplicationsPage from '@/pages/ReceivedApplicationsPage';
    import VisitsPage from '@/pages/VisitsPage';
    import SignaturesPage from '@/pages/SignaturesPage';
    import PaymentsPage from '@/pages/PaymentsPage';
    import NotificationsPage from '@/pages/NotificationsPage';
    import SettingsPage from '@/pages/SettingsPage';
    import HelpPage from '@/pages/HelpPage';
    import MessagesPage from '@/pages/MessagesPage';
    import AddPropertyPage from '@/pages/AddPropertyPage';
    import PropertyDetailPage from '@/pages/PropertyDetailPage';
    import { Toaster } from '@/components/ui/toaster';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import RegisterPage from '@/pages/auth/RegisterPage';
    import LoginPage from '@/pages/auth/LoginPage';
    import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
    import RentalApplicationPreview from '@/components/tenant/RentalApplicationPreview';
    import RoleBasedGuard from '@/components/RoleBasedGuard';

    const FullScreenLoader = () => (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    const ProtectedRoute = ({ children }) => {
        const { user, loading } = useAuth();
        if (loading) {
            return <FullScreenLoader />;
        }
        if (!user) {
            return <Navigate to="/connexion" />;
        }
        return children;
    };

    const PublicRoute = ({ children }) => {
        const { user, loading, loadingAuth } = useAuth();
        if (loading || loadingAuth) {
            return <FullScreenLoader />;
        }
        if (user) {
            return <Navigate to="/tableau-de-bord" />;
        }
        return children;
    };

    function App() {
      return (
          <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
            <Helmet>
              <title>Flat - La location immobilière, simplifiée.</title>
              <meta name="description" content="Flat simplifie, digitalise et sécurise la rencontre entre locataires et propriétaires en Belgique." />
              <html lang="fr" />
            </Helmet>
            
            <Header />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                
                {/* Auth Routes */}
                <Route path="/connexion" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/mot-de-passe-oublie" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
                <Route path="/inscription" element={<PublicRoute><RegisterPage /></PublicRoute>} />
                
                {/* Obsolete registration routes removed */}
                <Route path="/connexion/agence" element={<Navigate to="/connexion" replace />} />
                <Route path="/inscription/locataire" element={<Navigate to="/inscription" replace />} />
                <Route path="/inscription/proprietaire" element={<Navigate to="/inscription" replace />} />
                <Route path="/inscription/agence" element={<Navigate to="/inscription" replace />} />
                <Route path="/inscription-locataire" element={<Navigate to="/inscription" replace />} />


                {/* Dashboard Routes with nested content */}
                <Route 
                    path="/tableau-de-bord" 
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<DashboardPage.DefaultDashboard />} />
                    
                    {/* TENANT Routes */}
                    <Route path="mon-dossier" element={<RoleBasedGuard allowedRoles={['tenant']}><MyFilePage /></RoleBasedGuard>} />
                    <Route path="mon-dossier/apercu" element={<RoleBasedGuard allowedRoles={['tenant']}><RentalApplicationPreview /></RoleBasedGuard>} />
                    <Route path="mes-visites" element={<RoleBasedGuard allowedRoles={['tenant']}><VisitsPage /></RoleBasedGuard>} />
                    
                    {/* OWNER Routes (can be expanded later) */}
                    
                    {/* COMMON Routes */}
                    <Route path="paiements" element={<RoleBasedGuard allowedRoles={['tenant', 'owner']}><PaymentsPage /></RoleBasedGuard>} />
                    <Route path="notifications" element={<RoleBasedGuard allowedRoles={['tenant', 'owner']}><NotificationsPage /></RoleBasedGuard>} />
                    <Route path="parametres" element={<RoleBasedGuard allowedRoles={['tenant', 'owner']}><SettingsPage /></RoleBasedGuard>} />
                    <Route path="support" element={<RoleBasedGuard allowedRoles={['tenant', 'owner']}><HelpPage /></RoleBasedGuard>} />
                    <Route path="signatures" element={<RoleBasedGuard allowedRoles={['tenant', 'owner']}><SignaturesPage /></RoleBasedGuard>} />

                    {/* Deprecated redirects to new routes */}
                    <Route path="locataire" element={<Navigate to="/tableau-de-bord" replace />} />
                    <Route path="proprietaire" element={<Navigate to="/tableau-de-bord" replace />} />
                    <Route path="agence" element={<Navigate to="/tableau-de-bord" replace />} />
                    <Route path="agenda-locataire" element={<Navigate to="/tableau-de-bord/mes-visites" replace />} />
                    <Route path="agenda-proprietaire" element={<Navigate to="/tableau-de-bord" replace />} />
                </Route>

                {/* Legacy Redirects - For bookmarks or old links */}
                <Route path="/mon-dossier" element={<Navigate to="/tableau-de-bord/mon-dossier" replace />} />
                <Route path="/mes-biens" element={<Navigate to="/tableau-de-bord" replace />} />
                <Route path="/agenda" element={<Navigate to="/tableau-de-bord" replace />} />
                <Route path="/espace-proprietaire" element={<Navigate to="/tableau-de-bord" replace />} />

                {/* Functional Routes (stand-alone) */}
                <Route path="/bien/:id" element={<PropertyDetailPage />} />

                {/* Static pages */}
                <Route path="/politique-de-confidentialite" element={<PrivacyPolicyPage />} />
                <Route path="/mentions-legales" element={<LegalMentionsPage />} />
              </Routes>
            </main>
            
            <Footer />
            <Toaster />
          </div>
      );
    }

    export default App;
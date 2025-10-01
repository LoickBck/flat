import React, { useState } from 'react';
    import { Link, useLocation, useNavigate } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Building2, Menu, X, LayoutDashboard, FileText, Briefcase, Calendar, PenSquare, LifeBuoy, MessageSquare, Users, Gift, Settings } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useAuth } from '@/contexts/SupabaseAuthContext';

    const Header = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const location = useLocation();
      const navigate = useNavigate();
      const { user, profile, signOut } = useAuth();
      const navItems = [];
      const dashboardMobileNavItems = {
        tenant: [{
          path: '/tableau-de-bord',
          label: 'Tableau de bord',
          icon: LayoutDashboard
        }, {
          path: '/tableau-de-bord/mon-dossier',
          label: 'Mon dossier',
          icon: FileText
        }, {
          path: '/tableau-de-bord/mes-visites',
          label: 'Mes visites',
          icon: Calendar
        }, {
          path: '/tableau-de-bord/signatures',
          label: 'Mes baux',
          icon: PenSquare
        }, {
          path: '/tableau-de-bord/parametres',
          label: 'Paramètres',
          icon: Settings
        }, {
          path: '/tableau-de-bord/support',
          label: 'Support',
          icon: LifeBuoy
        }],
        owner: [{
          path: '/tableau-de-bord',
          label: 'Tableau de bord',
          icon: LayoutDashboard
        }, {
          path: '/tableau-de-bord/mes-biens',
          label: 'Mes biens',
          icon: Briefcase
        }, {
          path: '/tableau-de-bord/candidatures-recues',
          label: 'Candidatures',
          icon: Users
        }, {
          path: '/tableau-de-bord/mon-agenda',
          label: 'Agenda',
          icon: Calendar
        }, {
          path: '/tableau-de-bord/signatures',
          label: 'Baux',
          icon: PenSquare
        }, {
          path: '/tableau-de-bord/messages',
          label: 'Messages',
          icon: MessageSquare
        }, {
          path: '/tableau-de-bord/parametres',
          label: 'Paramètres',
          icon: Settings
        }],
      };
      const handleLogout = () => {
        signOut();
        setIsMenuOpen(false);
        navigate('/');
      };
      const getMobileNavForUser = () => {
        if (!profile) return [];
        return dashboardMobileNavItems[profile.role] || [];
      };

      const logoLink = user ? '/tableau-de-bord' : '/';

      return <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
          <div className="container flex h-16 items-center">
            <Link to={logoLink} className="mr-6 flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Building2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Flat.</span>
            </Link>

            <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
              {!location.pathname.startsWith('/tableau-de-bord') && navItems.map(item => {
              const isActive = location.pathname === item.path;
              return <Link key={item.path} to={item.path} className={`transition-colors hover:text-primary relative ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                    {item.label}
                    {isActive && <motion.div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary" layoutId="underline" />}
                  </Link>;
            })}
            </nav>

            <div className="flex flex-1 items-center justify-end space-x-2">
              <nav className="hidden md:flex items-center space-x-2">
                {user ? <>
                    <Button variant="ghost" onClick={() => navigate('/tableau-de-bord')}>
                      Tableau de bord
                    </Button>
                    <Button variant="outline" onClick={handleLogout}>
                      Déconnexion
                    </Button>
                  </> : <>
                    <Link to="/connexion">
                      <Button variant="ghost">
                        Connexion
                      </Button>
                    </Link>
                    <Link to="/inscription">
                      <Button>
                        Inscription
                      </Button>
                    </Link>
                  </>}
              </nav>
            </div>

            <Button variant="ghost" size="icon" className="md:hidden ml-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          <AnimatePresence>
            {isMenuOpen && <motion.div initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: 'auto'
          }} exit={{
            opacity: 0,
            height: 0
          }} transition={{
            duration: 0.3,
            ease: 'easeInOut'
          }} className="md:hidden absolute top-16 inset-x-0 z-40 bg-background border-b">
                <div className="p-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
                {user ? <>
                    {getMobileNavForUser().map(item => <Link key={`mobile-dash-${item.path}`} to={item.path} className="flex items-center text-base font-medium text-foreground/80 hover:text-foreground py-3 px-2 rounded-lg hover:bg-muted" onClick={() => setIsMenuOpen(false)}>
                        <item.icon className="w-5 h-5 mr-4 text-primary" />
                        {item.label}
                      </Link>)}
                    <div className="border-t pt-4 mt-2">
                      <Button variant="outline" className="w-full mt-2" onClick={handleLogout}>
                        Déconnexion
                      </Button>
                    </div>
                  </> : <>
                    <Link to="/" className="block text-base font-medium text-foreground/80 hover:text-foreground py-3 px-2 rounded-lg hover:bg-muted" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
                    {navItems.map(item => <Link key={`mobile-${item.path}`} to={item.path} className="block text-base font-medium text-foreground/80 hover:text-foreground py-3 px-2 rounded-lg hover:bg-muted" onClick={() => setIsMenuOpen(false)}>
                        {item.label}
                      </Link>)}
                    <div className="border-t pt-4 mt-2 space-y-2">
                      <Link to="/inscription" className="w-full">
                        <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
                          Inscription
                        </Button>
                      </Link>
                      <Link to="/connexion" className="w-full">
                        <Button variant="outline" className="w-full mt-2" onClick={() => setIsMenuOpen(false)}>
                          Connexion
                        </Button>
                      </Link>
                    </div>
                  </>}
                </div>
              </motion.div>}
          </AnimatePresence>
        </header>;
    };
    export default Header;
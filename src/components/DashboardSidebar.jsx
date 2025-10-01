import React from 'react';
    import { NavLink, useLocation, useNavigate } from 'react-router-dom';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import { cn } from '@/lib/utils';
    import {
        LayoutDashboard,
        FileText,
        Calendar,
        Settings,
        LifeBuoy,
        LogOut,
    } from 'lucide-react';
    import { Button } from './ui/button';
    import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
    import { motion } from 'framer-motion';

    const sidebarNavItems = {
        tenant: [
            { to: '/tableau-de-bord', icon: LayoutDashboard, text: 'Tableau de bord' },
            { to: '/tableau-de-bord/mon-dossier', icon: FileText, text: 'Mon dossier' },
            { to: '/tableau-de-bord/mes-visites', icon: Calendar, text: 'Mes visites' },
        ],
        owner: [
            { to: '/tableau-de-bord', icon: LayoutDashboard, text: 'Tableau de bord' },
        ],
    };

    const SidebarLink = ({ to, icon: Icon, text, onClick, isExact = false }) => {
        const location = useLocation();

        const isActive = isExact ? location.pathname === to : (to !== '/tableau-de-bord' && location.pathname.startsWith(to));

        return (
            <NavLink
                to={to}
                onClick={onClick}
                className={cn(
                    'flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 relative group',
                    isActive
                        ? 'text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
            >
                {isActive && <motion.div layoutId="sidebar-active-indicator" className="absolute inset-0 bg-primary rounded-md z-0" />}
                <div className="relative z-10 flex items-center">
                    <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary-foreground" : "")} />
                    <span>{text}</span>
                </div>
            </NavLink>
        );
    };

    const DashboardSidebar = ({ onLinkClick }) => {
        const { user, profile, signOut } = useAuth();
        const navigate = useNavigate();

        if (!user || !profile) return null;

        const role = profile.role;
        const navItems = sidebarNavItems[role] || [];
        const userName = profile.first_name ? `${profile.first_name} ${profile.last_name || ''}`.trim() : user.email;
        const userInitial = userName?.charAt(0).toUpperCase() || '?';

        const handleLogout = () => {
            if (onLinkClick) onLinkClick();
            signOut();
            navigate('/');
        };

        return (
            <div className="space-y-2 py-4 flex flex-col h-full lg:bg-background lg:rounded-xl lg:border lg:p-4">
                <div className="flex flex-col items-center text-center space-y-2 mb-6 px-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/50">
                        <AvatarImage src={profile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${userName}&backgroundColor=3b82f6,10b981,f97316,8b5cf6&backgroundType=gradientLinear`} alt={userName} />
                        <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                    <div>
                         <p className="font-semibold text-lg text-foreground truncate">{userName}</p>
                         <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                </div>

                <nav className="flex-grow space-y-1 px-2">
                    {navItems.map((item) => (
                        <SidebarLink key={item.to} {...item} onClick={onLinkClick} isExact={item.to === '/tableau-de-bord'} />
                    ))}
                </nav>

                <div className="mt-auto space-y-1 pt-4 border-t px-2">
                     <SidebarLink to="/tableau-de-bord/parametres" icon={Settings} text="Paramètres" onClick={onLinkClick} />
                     <SidebarLink to="/tableau-de-bord/support" icon={LifeBuoy} text="Centre d'aide" onClick={onLinkClick} />
                     <Button variant="ghost" className="w-full justify-start px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={handleLogout}>
                        <LogOut className="mr-3 h-5 w-5" />
                        Déconnexion
                    </Button>
                </div>
            </div>
        );
    };

    export default DashboardSidebar;
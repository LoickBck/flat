import React, { useState } from 'react';
    import { AnimatePresence, motion } from 'framer-motion';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import DashboardSidebar from '@/components/DashboardSidebar';
    import { Menu, X } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useLocation } from 'react-router-dom';

    const DashboardLayout = ({ children }) => {
        const { user, profile } = useAuth();
        const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
        const location = useLocation();

        const userName = profile?.first_name || user?.email;

        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:space-x-8 xl:space-x-12 py-8">
                    <div className="lg:hidden mb-6 flex justify-between items-center">
                         <h1 className="text-2xl font-bold text-foreground">
                            Bonjour, <span className="text-primary">{userName}</span>
                        </h1>
                        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                    
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                             <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="lg:hidden mb-6 bg-card p-4 rounded-xl border"
                            >
                                <DashboardSidebar onLinkClick={() => setMobileMenuOpen(false)} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <aside className="hidden lg:block w-full lg:w-60 xl:w-64 flex-shrink-0">
                        <DashboardSidebar />
                    </aside>

                    <main className="flex-1 min-w-0 bg-background p-6 sm:p-8 rounded-xl border">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        );
    };

    export default DashboardLayout;
import React from 'react';
    import { motion } from 'framer-motion';
    import { Building } from 'lucide-react';

    const OwnerDashboard = ({ user }) => {
        return (
            <div className="space-y-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                    <div>
                        <h1 className="text-3xl font-bold">Tableau de bord Propriétaire</h1>
                        <p className="text-muted-foreground mt-1">Bienvenue, {user.name}.</p>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="text-center py-20 bg-card border border-dashed rounded-xl flex flex-col items-center justify-center">
                        <Building className="w-16 h-16 text-muted-foreground mb-6" />
                        <h2 className="text-2xl font-semibold text-foreground">Espace en construction</h2>
                        <p className="text-muted-foreground mt-2 max-w-md">
                            Les fonctionnalités pour les propriétaires arrivent bientôt. Revenez plus tard pour gérer vos biens, vos visites et vos candidatures.
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    };

    export default OwnerDashboard;
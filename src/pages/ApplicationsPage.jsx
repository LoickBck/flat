import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Gift, FileText, Search } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { AuthContext } from '@/contexts/AuthContext';
    import { useContext } from 'react';
    import TenantProposals from '@/components/tenant/TenantProposals';
    import { Link } from 'react-router-dom';

    const ApplicationsPage = () => {
        const { user } = useContext(AuthContext);
        const hasProposals = true; 

        return (
            <>
            <Helmet>
                <title>Mes Propositions - Flat</title>
            </Helmet>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                <div className="flex items-center space-x-4">
                    <Gift className="w-10 h-10 text-primary" />
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Mes Propositions</h1>
                        <p className="text-muted-foreground">Les biens que nous avons sélectionnés pour vous, en fonction de votre dossier.</p>
                    </div>
                </div>

                {hasProposals ? (
                    <TenantProposals />
                ) : (
                    <div className="text-center py-20 bg-card border border-dashed rounded-xl">
                        <Search className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                        <h2 className="text-2xl font-semibold text-foreground">Aucune proposition pour le moment.</h2>
                        <p className="text-muted-foreground mt-2 mb-6 max-w-md mx-auto">
                            Assurez-vous que votre dossier locatif et votre fiche de recherche sont complets pour que nous puissions vous envoyer des biens correspondants.
                        </p>
                        <Link to="/tableau-de-bord/mon-dossier">
                            <Button>Compléter mon dossier</Button>
                        </Link>
                    </div>
                )}
                
            </motion.div>
            </>
        );
    };

    export default ApplicationsPage;
import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Settings } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';

    const SettingsPage = () => {
        const { toast } = useToast();

        const handleAction = () => {
            toast({
            title: "🚧 Bientôt disponible !",
            description: "La page des paramètres sera bientôt disponible pour personnaliser votre expérience.",
            });
        };

        return (
            <>
            <Helmet>
                <title>Paramètres - Flat</title>
            </Helmet>
            <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
                >
                <Settings className="w-16 h-16 mx-auto text-primary mb-4" />
                <h1 className="text-4xl font-bold text-foreground">Paramètres du Compte</h1>
                <p className="text-lg text-muted-foreground mt-2 mb-6">
                    Gérez vos informations personnelles, la sécurité de votre compte et vos préférences.
                </p>
                <Button onClick={handleAction}>Modifier mes informations</Button>
                </motion.div>
            </div>
            </>
        );
    };

    export default SettingsPage;
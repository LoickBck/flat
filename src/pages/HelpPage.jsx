import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { LifeBuoy } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';

    const HelpPage = () => {
        const { toast } = useToast();

        const handleAction = () => {
            toast({
            title: "🚧 Bientôt disponible !",
            description: "Notre centre d'aide est en cours de rédaction pour répondre à toutes vos questions.",
            });
        };

        return (
            <>
            <Helmet>
                <title>Support & Centre d'aide - Flat</title>
            </Helmet>
            <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
                >
                <LifeBuoy className="w-16 h-16 mx-auto text-primary mb-4" />
                <h1 className="text-4xl font-bold text-foreground">Support & Centre d'aide</h1>
                <p className="text-lg text-muted-foreground mt-2 mb-6">
                    Besoin d'aide ? Trouvez des réponses à vos questions ou contactez notre équipe.
                </p>
                <Button onClick={handleAction}>Consulter la FAQ</Button>
                </motion.div>
            </div>
            </>
        );
    };

    export default HelpPage;
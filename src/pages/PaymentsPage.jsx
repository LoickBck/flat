import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { CreditCard } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';

    const PaymentsPage = () => {
        const { toast } = useToast();

        const handleAction = () => {
            toast({
            title: "🚧 Bientôt disponible !",
            description: "Le module de paiement sécurisé pour le premier loyer et la garantie locative arrive prochainement.",
            });
        };

        return (
            <>
            <Helmet>
                <title>Paiements - Flat</title>
            </Helmet>
            <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
                >
                <CreditCard className="w-16 h-16 mx-auto text-primary mb-4" />
                <h1 className="text-4xl font-bold text-foreground">Paiements</h1>
                <p className="text-lg text-muted-foreground mt-2 mb-6">
                    Effectuez vos transactions en toute sécurité (premier loyer, garantie, etc.).
                </p>
                <Button onClick={handleAction}>Voir les options de paiement</Button>
                </motion.div>
            </div>
            </>
        );
    };

    export default PaymentsPage;
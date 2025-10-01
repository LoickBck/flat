import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { PenSquare } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';

    const SignaturesPage = () => {
        const { toast } = useToast();

        const handleAction = () => {
            toast({
            title: "🚧 Bientôt disponible !",
            description: "La signature électronique des baux sera bientôt disponible.",
            });
        };

        return (
            <>
            <Helmet>
                <title>Signatures & Baux - Flat</title>
            </Helmet>
            <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
                >
                <PenSquare className="w-16 h-16 mx-auto text-primary mb-4" />
                <h1 className="text-4xl font-bold text-foreground">Signatures & Baux</h1>
                <p className="text-lg text-muted-foreground mt-2 mb-6">
                    Générez, signez et archivez vos baux de location 100% en ligne.
                </p>
                <Button onClick={handleAction}>Comment ça marche ?</Button>
                </motion.div>
            </div>
            </>
        );
    };

    export default SignaturesPage;
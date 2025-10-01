import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';
    import { FileText, User, Briefcase, Shield } from 'lucide-react';

    const MyFilesPage = () => {
      const { toast } = useToast();

      const handleAction = () => {
        toast({
          title: "🚧 Bientôt disponible !",
          description: "Cette fonctionnalité est en cours de développement. Revenez bientôt !",
        });
      };

      return (
        <>
          <Helmet>
            <title>Mon Dossier - Flat</title>
          </Helmet>
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <FileText className="w-16 h-16 mx-auto text-primary mb-4" />
              <h1 className="text-4xl font-bold text-foreground">Mon Dossier Locataire</h1>
              <p className="text-lg text-muted-foreground mt-2">
                Un dossier complet et vérifié pour postuler en un clic.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto bg-card p-8 rounded-xl border border-border space-y-8">
              <Section icon={User} title="Informations personnelles" status="Complété" />
              <Section icon={Briefcase} title="Situation professionnelle et revenus" status="À compléter" />
              <Section icon={Shield} title="Pièces justificatives" status="En attente de vérification" />

              <div className="text-center pt-6 border-t border-border">
                <Button size="lg" onClick={handleAction}>
                  Modifier mon dossier
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    };

    const Section = ({ icon: Icon, title, status }) => {
      const statusStyles = {
        'Complété': 'text-green-600 bg-green-100',
        'À compléter': 'text-yellow-600 bg-yellow-100',
        'En attente de vérification': 'text-blue-600 bg-blue-100',
      };

      return (
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/40">
          <div className="flex items-center">
            <Icon className="w-6 h-6 mr-4 text-primary" />
            <span className="font-semibold text-foreground">{title}</span>
          </div>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusStyles[status]}`}>
            {status}
          </span>
        </div>
      );
    }

    export default MyFilesPage;
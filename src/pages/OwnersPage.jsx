import React from 'react';
    import { motion } from 'framer-motion';
    import { UploadCloud, UserCheck, CalendarCheck, FileSignature } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';

    const OwnersPage = () => {
      const { toast } = useToast();
      
      const features = [
        {
          icon: UploadCloud,
          title: "Encodez votre bien facilement",
          description: "Notre formulaire intelligent vous guide pour créer une annonce attractive et complète en quelques minutes. Mettez en valeur votre bien sans effort."
        },
        {
          icon: UserCheck,
          title: "Recevez des candidats sérieux",
          description: "Fini le tri interminable. Nous vous présentons uniquement des candidats dont le dossier est complet et correspond à vos attentes. Gagnez un temps précieux."
        },
        {
          icon: CalendarCheck,
          title: "Organisez vos visites simplement",
          description: "Gérez votre emploi du temps et laissez les candidats réserver des créneaux de visite directement en ligne. Fini les allers-retours par email ou téléphone."
        },
        {
          icon: FileSignature,
          title: "Générez et signez le bail officiel",
          description: "Créez un bail conforme à la législation belge, signez-le électroniquement et enregistrez-le automatiquement. Tout est centralisé et sécurisé."
        }
      ];

      const handlePublish = () => {
        toast({
          title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀"
        });
      };

      return (
        <div className="py-12 md:py-24">
          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tighter mb-4">
                L'espace <span className="text-primary">Propriétaire</span>
              </h1>
              <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
                Louez votre bien en toute confiance et optimisez votre gestion locative.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-card p-8 rounded-xl border border-border"
                >
                  <div className="mb-4 h-12 w-12 flex items-center justify-center rounded-lg bg-background border border-border">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-center mt-20"
            >
              <h2 className="text-3xl font-bold mb-4 text-foreground">Prêt à trouver le locataire idéal ?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Inscrivez-vous gratuitement et publiez votre annonce pour accéder à notre base de locataires qualifiés.
              </p>
              <Button size="lg" onClick={handlePublish}>
                Publier mon bien
              </Button>
            </motion.div>
          </div>
        </div>
      );
    };

    export default OwnersPage;
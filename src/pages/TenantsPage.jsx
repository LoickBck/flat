import React from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { FilePlus, Bell, Calendar, Edit } from 'lucide-react';
    import { Button } from '@/components/ui/button';

    const TenantsPage = () => {
      const features = [
        {
          icon: FilePlus,
          title: "Créez un dossier unique et complet",
          description: "Créez un dossier flexible et détaillé avec vos critères précis : localisations multiples, types de biens, situation professionnelle. Un profil complet pour un matching parfait."
        },
        {
          icon: Bell,
          title: "Recevez des biens qui vous correspondent",
          description: "Ne perdez plus de temps. Notre système vous envoie uniquement des annonces qui matchent parfaitement avec vos critères de recherche. Votre futur logement vient à vous."
        },
        {
          icon: Calendar,
          title: "Réservez vos visites en ligne",
          description: "Consultez les disponibilités du propriétaire et réservez votre créneau de visite directement depuis notre agenda partagé. Recevez des rappels pour ne rien oublier."
        },
        {
          icon: Edit,
          title: "Signez votre bail digitalement",
          description: "Le processus est 100% en ligne, jusqu'à la signature. Signez votre bail électronique de manière sécurisée, où que vous soyez. Simple, rapide et légal."
        }
      ];

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
                L'espace <span className="text-secondary">Locataire</span>
              </h1>
              <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
                Simplifiez votre recherche de logement et trouvez la perle rare sans stress.
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
                    <feature.icon className="w-6 h-6 text-secondary" />
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Prêt à trouver votre futur chez-vous ?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Créez votre dossier locataire gratuitement et commencez à recevoir des offres personnalisées dès aujourd'hui.
              </p>
              <Link to="/inscription-locataire">
                <Button size="lg" variant="secondary">
                  Créer mon dossier locataire
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      );
    };

    export default TenantsPage;
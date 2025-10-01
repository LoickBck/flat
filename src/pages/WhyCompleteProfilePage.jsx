import React from 'react';
    import { motion } from 'framer-motion';
    import { ShieldCheck, Zap, Award } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';

    const WhyCompleteProfilePage = () => {
      const benefits = [
        {
          icon: ShieldCheck,
          title: "Gagnez la confiance des propriétaires",
          description: "Un dossier complet est un gage de sérieux. Il montre que vous êtes un candidat fiable et organisé, ce qui rassure immédiatement les propriétaires."
        },
        {
          icon: Zap,
          title: "Accélérez le processus de location",
          description: "Lorsque vous trouvez le bien parfait, postulez instantanément. Plus besoin de chercher vos documents à la dernière minute. Cette réactivité fait la différence."
        },
        {
          icon: Award,
          title: "Démarquez-vous de la concurrence",
          description: "Sur un marché compétitif, un dossier impeccable vous place en tête de liste. C'est votre meilleure carte de visite pour prouver votre solvabilité et votre motivation."
        }
      ];

      return (
        <div className="py-12 md:py-24">
          <div className="container px-4 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tighter mb-4">
                Un dossier <span className="text-secondary">complet</span>,
                <br />
                un avantage <span className="text-primary">décisif</span>.
              </h1>
              <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
                Mettez toutes les chances de votre côté pour décrocher le logement de vos rêves.
              </p>
            </motion.div>

            <div className="space-y-12">
              {benefits.map((benefit, index) => (
                 <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center border border-border">
                    <benefit.icon className="w-10 h-10 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-center mt-20 bg-card p-10 rounded-xl border border-border"
            >
              <h2 className="text-3xl font-bold mb-4 text-foreground">Votre prochain logement vous attend.</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Ne laissez pas un dossier incomplet vous freiner. Prenez quelques minutes pour le finaliser maintenant et soyez prêt à saisir la prochaine opportunité.
              </p>
              <Link to="/inscription-locataire">
                <Button size="lg" variant="secondary">
                  Compléter mon dossier
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      );
    };

    export default WhyCompleteProfilePage;
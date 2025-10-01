import React from 'react';
    import { motion } from 'framer-motion';
    import { Link, Navigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { User, Home, Zap, ShieldCheck, Users, Briefcase, ArrowRight, FileText, CalendarCheck, PenSquare, Sparkles } from 'lucide-react';
    import { Helmet } from 'react-helmet';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    const RoleCard = ({
      icon: Icon,
      title,
      description,
      link
    }) => <Link to={link} className="block w-full group">
                <motion.div whileHover={{
        y: -5,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }} transition={{
        duration: 0.2,
        ease: "circOut"
      }} className="bg-card p-8 rounded-2xl border text-center h-full flex flex-col justify-start items-center">
                  <div className="mb-5 h-16 w-16 flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </motion.div>
              </Link>;
    const HomePage = () => {
      const {
        user,
        loading
      } = useAuth();

      if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
      }
      
      if (user) {
        return <Navigate to="/tableau-de-bord" replace />;
      }
      const cardVariants = {
        hidden: {
          opacity: 0,
          y: 30
        },
        visible: i => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: "easeOut"
          }
        })
      };
      return <>
                  <Helmet>
                    <title>Flat - Créez votre compte et simplifiez votre location</title>
                    <meta name="description" content="Flat simplifie, digitalise et sécurise la rencontre entre locataires et propriétaires. Créez votre compte pour commencer." />
                  </Helmet>
                  
                  {/* Top Section */}
                  <section className="bg-background pt-24 pb-20 md:pt-32 md:pb-28">
                    <div className="container mx-auto px-4">
                      <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.7,
              ease: "easeOut"
            }} className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                          La location immobilière, <br />enfin simple et sécurisée.
                        </h1>
                        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl"></p>
                      </motion.div>

                      <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto justify-items-center">
                        <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
                            <RoleCard icon={User} title="Je suis locataire" description="Créez votre dossier unique pour trouver le logement de vos rêves." link="/inscription" />
                        </motion.div>
                      </div>
                    </div>
                  </section>

                  {/* Section 1: Qu'est-ce que Flat? */}
                  <section className="py-20 bg-muted/40">
                      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                          <motion.div initial={{
              opacity: 0,
              x: -50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true,
              amount: 0.5
            }} transition={{
              duration: 0.6,
              ease: 'easeOut'
            }}>
                              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Qu'est-ce que <span className="text-primary">Flat</span> ?</h2>
                              <p className="text-lg text-muted-foreground mb-4">Flat est une plateforme transactionnelle dédiée à la location longue durée. Contrairement aux portails d'annonces traditionnels, nous ne listons aucun bien publiquement. Dites nous ce que vous cherchez et retrouvez nos propositions directement dans votre tableau de bord.</p>
                              <p className="text-lg text-muted-foreground">Notre mission est de digitaliser et sécuriser l'ensemble du processus de location, de la création du dossier à l'enregistrement du bail, pour une expérience simple, rapide et transparente. </p>
                          </motion.div>
                          <motion.div initial={{
              opacity: 0,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true,
              amount: 0.5
            }} transition={{
              duration: 0.6,
              ease: 'easeOut'
            }}>
                              <Card className="p-4 bg-background">
                                  <CardContent className="p-0">
                                      <img class="rounded-lg shadow-md" alt="Dashboard de l'application Flat montrant une interface épurée" src="https://horizons-cdn.hostinger.com/b259af18-cdad-4c02-bd6d-01c633eab60a/51960842-plU8D.webp" />
                                  </CardContent>
                              </Card>
                          </motion.div>
                      </div>
                  </section>

                  {/* Section 2: Problèmes et Solutions */}
                  <section className="py-24">
                      <div className="container mx-auto px-4">
                          <div className="text-center mb-16">
                              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Nous transformons la location</h2>
                              <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">Adieu la paperasse et le stress. Bonjour l'efficacité et la sérénité.</p>
                          </div>
                          <div className="grid md:grid-cols-2 gap-8">
                              <motion.div initial={{
                opacity: 0,
                y: 30
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true,
                amount: 0.3
              }} transition={{
                duration: 0.6
              }}>
                                  <Card className="h-full border-destructive/30">
                                      <CardHeader>
                                          <CardTitle className="text-destructive flex items-center gap-3">
                                              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                                                  <Zap className="w-5 h-5" />
                                              </div>
                                              Le chaos actuel
                                          </CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-3 text-muted-foreground">
                                          <p>• Dossiers de location incomplets et non vérifiés</p>
                                          <p>• Visites désorganisées et perte de temps</p>
                                          <p>• Baux papier, sources d'erreurs et de lenteur</p>
                                          <p>• Communication éclatée (emails, SMS, appels)</p>
                                          <p>• Manque de transparence et de suivi</p>
                                      </CardContent>
                                  </Card>
                              </motion.div>
                              <motion.div initial={{
                opacity: 0,
                y: 30
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true,
                amount: 0.3
              }} transition={{
                duration: 0.6,
                delay: 0.2
              }}>
                                  <Card className="h-full border-primary/30 bg-primary/5">
                                      <CardHeader>
                                          <CardTitle className="text-primary flex items-center gap-3">
                                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                                  <Sparkles className="w-5 h-5" />
                                              </div>
                                              La solution Flat
                                          </CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-3 text-foreground">
                                          <p>✓ Dossier numérique standardisé et complet</p>
                                          <p>✓ Matching intelligent et agenda de visites en ligne</p>
                                          <p>✓ Signature électronique de bail sécurisée et enregistrement du bail digitalisé.</p>
                                          <p>✓ Messagerie interne centralisée</p>
                                          <p>✓ Tableau de bord pour un suivi en temps réel</p>
                                      </CardContent>
                                  </Card>
                              </motion.div>
                          </div>
                      </div>
                  </section>
                  
                  {/* Section 3: Pour qui ? */}
                  <section className="py-20 bg-muted/40">
                      <div className="container mx-auto px-4">
                          <div className="text-center mb-16">
                              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Conçu pour vous</h2>
                              <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">Que vous cherchiez un logement ou un locataire, Flat vous simplifie la vie.</p>
                          </div>
                          <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto justify-items-center">
                              <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{
                once: true,
                amount: 0.5
              }} variants={cardVariants} className="space-y-3">
                                  <Users className="w-10 h-10 text-primary" />
                                  <h3 className="text-2xl font-bold text-foreground">Pour les locataires</h3>
                                  <p className="text-muted-foreground">Créez une seule fois votre dossier de location complet et sécurisé. Recevez des propositions de biens qui vous correspondent et oubliez les recherches interminables.</p>
                                  <Link to="/inscription">
                                      <Button variant="link" className="px-0 group">
                                          Créer mon dossier <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                      </Button>
                                  </Link>
                              </motion.div>
                          </div>
                      </div>
                  </section>
                </>;
    };
    export default HomePage;
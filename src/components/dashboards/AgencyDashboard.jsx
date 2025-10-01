import React from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
    import { Building, Users, FileText, TrendingUp, Plus } from 'lucide-react';

    const AgencyDashboard = ({ user }) => {
        const stats = [
            { label: 'Biens actifs', value: 0, icon: Building },
            { label: 'Candidats en cours', value: 0, icon: Users },
            { label: 'Baux en cours', value: 0, icon: FileText },
            { label: 'Taux de conversion', value: '0%', icon: TrendingUp },
        ];

        return (
            <div className="space-y-8">
                {/* Key Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="bg-background">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                    <div className="text-center py-20 bg-background border border-dashed rounded-xl">
                        <h2 className="text-2xl font-semibold text-foreground">Bienvenue sur votre tableau de bord Agence.</h2>
                        <p className="text-muted-foreground mt-2 mb-6">Commencez par ajouter vos biens pour les proposer à nos locataires qualifiés.</p>
                        <Link to="/tableau-de-bord/ajouter-un-bien">
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Ajouter un bien
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                     <DashboardSection title="Gestion des biens" link="/tableau-de-bord/mes-biens" delay={0.5} />
                     <DashboardSection title="Candidatures locataires" link="/tableau-de-bord/mes-candidatures" delay={0.6} />
                     <DashboardSection title="Baux" link="/tableau-de-bord/signatures" delay={0.7} />
                     <DashboardSection title="Messages" link="/tableau-de-bord/messages" delay={0.8} />
                </div>
            </div>
        );
    };

    const DashboardSection = ({ title, link, delay }) => (
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: delay }}>
            <Card className="bg-background">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>Section en cours de construction.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link to={link}>
                        <Button variant="outline">Accéder à la section</Button>
                    </Link>
                </CardContent>
            </Card>
        </motion.div>
    );

    export default AgencyDashboard;
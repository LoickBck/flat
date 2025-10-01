import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, MessageSquare, CheckCircle, Info, Bell, FileText, AlertTriangle } from 'lucide-react';
import SavedFile from '@/components/tenant/SavedFile';

const TenantDashboard = () => {
    const [dossier, setDossier] = useState(null);
    const dossierProgress = dossier ? (dossier.status === 'complete' ? 100 : 60) : 0;
    const upcomingVisits = 2;
    // const newMessages = 3; // Removed as messages section is temporarily removed

    useEffect(() => {
        // We use a trick to re-render when localStorage changes from another component
        const handleStorageChange = () => {
            const savedData = localStorage.getItem('rentalApplicationData');
            if (savedData) {
                setDossier(JSON.parse(savedData));
            } else {
                setDossier(null);
            }
        };

        handleStorageChange(); // Initial load
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    return (
        <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Bienvenue !</h1>
                    <p className="text-muted-foreground">Voici un aperçu de votre situation sur Flat.</p>
                </div>
                
                {dossier ? (
                    <SavedFile dossier={dossier} setDossier={setDossier} />
                ) : (
                    <Card className="bg-background border-primary/20 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="flex items-center"><FileText className="w-5 h-5 mr-3 text-primary" />Commencez votre dossier locatif</span>
                                <span className="text-sm font-medium text-amber-600 flex items-center bg-amber-100/50 text-amber-800 px-2 py-1 rounded-md"><AlertTriangle className="w-4 h-4 mr-2" />Non commencé</span>
                            </CardTitle>
                            <CardDescription>Un dossier complet augmente vos chances de trouver le bien idéal. Créez le vôtre dès maintenant !</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="flex items-center space-x-4 mb-4">
                                <Progress value={0} className="w-full" />
                                <span className="font-semibold text-primary">0%</span>
                            </div>
                            <Link to="/tableau-de-bord/mon-dossier">
                                <Button>
                                    Créer mon dossier
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                     <Card className="bg-background">
                        <CardContent className="pt-6">
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-100 rounded-full mr-4">
                                     <Calendar className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{upcomingVisits}</p>
                                    <p className="text-muted-foreground">Visite(s) à venir</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                
                {/* Temporarily removed messages card */}
                {/* <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                     <Card className="bg-background">
                        <CardContent className="pt-6">
                            <div className="flex items-center">
                                <div className="p-3 bg-green-100 rounded-full mr-4">
                                     <MessageSquare className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{newMessages}</p>
                                    <p className="text-muted-foreground">Nouveau(x) message(s)</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div> */}
            </div>
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="flex flex-row items-center space-x-4">
                         <Bell className="w-6 h-6 text-blue-600" />
                        <div>
                            <CardTitle className="text-blue-900">N'oubliez pas d'activer les notifications</CardTitle>
                            <CardDescription className="text-blue-700">Pour être alerté en temps réel des nouvelles propositions et messages.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Link to="/tableau-de-bord/parametres">
                            <Button variant="link" className="p-0 text-blue-600">Gérer mes préférences</Button>
                        </Link>
                    </CardContent>
                </Card>
            </motion.div>

        </div>
    );
};

export default TenantDashboard;
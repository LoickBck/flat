import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileSearch, UserCheck, Eye, MessageSquare, Check, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';


const ApplicationCard = ({ app, delay }) => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleAction = (e, action) => {
        e.stopPropagation();
        toast({
            title: `Candidature ${action}`,
            description: `Le candidat a été notifié.`,
        });
    };

    const viewApplication = () => {
         toast({
            title: 'Affichage du dossier...',
            description: 'Redirection vers le dossier complet du candidat.',
        });
        // In a real app, this would navigate to a preview of the candidate's file
        // navigate(`/tableau-de-bord/candidature/${app.id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={viewApplication}>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={app.avatar} alt={app.name} />
                                <AvatarFallback>{app.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>{app.name}</CardTitle>
                                <CardDescription>Pour: {app.property}</CardDescription>
                            </div>
                        </div>
                        {app.verified && <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300"><UserCheck className="w-3 h-3 mr-1" />Dossier Vérifié</Badge>}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Revenu total net:</span>
                        <span className="font-semibold text-foreground">{app.income}€/mois</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>Garant:</span>
                        <span className="font-semibold text-foreground">{app.guarantor ? "Oui" : "Non"}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={(e) => handleAction(e, 'contacté')}>
                        <MessageSquare className="w-4 h-4 mr-2" /> Contacter
                    </Button>
                    <Button variant="outline" size="sm" onClick={(e) => handleAction(e, 'refusée')}>
                        <X className="w-4 h-4 mr-2" /> Refuser
                    </Button>
                    <Button size="sm" onClick={(e) => handleAction(e, 'acceptée pour visite')}>
                        <Check className="w-4 h-4 mr-2" /> Proposer une visite
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

const ReceivedApplicationsPage = () => {
    const applications = [
        { id: 1, name: 'Claire Martin', property: 'Appartement Grand-Place', income: 3200, guarantor: true, verified: true, avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Claire' },
        { id: 2, name: 'Lucas Dubois', property: 'Studio lumineux', income: 2100, guarantor: false, verified: false, avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Lucas' },
        { id: 3, name: 'Famille Bernard', property: 'Maison avec jardin', income: 4500, guarantor: true, verified: false, avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Bernard' },
    ];

    return (
        <>
            <Helmet>
                <title>Dossiers Reçus - Flat</title>
            </Helmet>
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center mb-8"
                >
                    <FileSearch className="w-10 h-10 mr-4 text-primary" />
                    <div>
                        <h1 className="text-4xl font-bold text-foreground">Dossiers Reçus</h1>
                        <p className="text-lg text-muted-foreground">Consultez et gérez les candidatures pour vos biens.</p>
                    </div>
                </motion.div>
                
                {applications.length > 0 ? (
                    <div className="space-y-4">
                        {applications.map((app, index) => (
                           <ApplicationCard key={app.id} app={app} delay={index * 0.1} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-card border border-dashed rounded-xl">
                        <h2 className="text-2xl font-semibold text-foreground">Aucune candidature reçue pour le moment.</h2>
                        <p className="text-muted-foreground mt-2">Lorsque des locataires postuleront à vos annonces, leurs dossiers apparaîtront ici.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default ReceivedApplicationsPage;
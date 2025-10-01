import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, BedDouble, Ruler, Heart, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const proposals = [
  {
    id: 1,
    title: 'Superbe appartement avec vue',
    location: '1000 Bruxelles',
    rent: 1150,
    bedrooms: 2,
    surface: 85,
    match: 92,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80',
    alt: 'Living room of a modern apartment'
  },
  {
    id: 2,
    title: 'Maison de charme avec jardin',
    location: '1180 Uccle',
    rent: 1800,
    bedrooms: 4,
    surface: 160,
    match: 85,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&q=80',
    alt: 'Exterior of a charming house with a garden'
  },
];

const ProposalCard = ({ proposal, onAction }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: 'backOut' }}
        >
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative">
                <img className="h-48 w-full object-cover" src={proposal.image} alt={proposal.alt} />
                <Badge variant="secondary" className="absolute top-3 left-3 bg-primary/80 backdrop-blur-sm text-primary-foreground">{proposal.match}% compatible</Badge>
            </div>
            <CardHeader>
                <CardTitle className="truncate">{proposal.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground pt-1">
                    <MapPin className="h-4 w-4 mr-1.5" />
                    {proposal.location}
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center text-lg font-bold text-primary">
                    <span>{proposal.rent} €</span>
                    <span className="text-sm font-normal text-muted-foreground">/ mois</span>
                </div>
                <div className="flex justify-around text-sm text-muted-foreground mt-4 border-t pt-3">
                    <div className="flex items-center"><BedDouble className="h-4 w-4 mr-1.5" /> {proposal.bedrooms} ch.</div>
                    <div className="flex items-center"><Ruler className="h-4 w-4 mr-1.5" /> {proposal.surface} m²</div>
                </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => onAction('refused')}>
                    <X className="h-4 w-4 mr-2" />
                    Refuser
                </Button>
                <Button onClick={() => onAction('interested')}>
                    <Heart className="h-4 w-4 mr-2" />
                    Intéressé
                </Button>
            </CardFooter>
        </Card>
        </motion.div>
    )
}


const TenantProposals = () => {
    const { toast } = useToast();

    const handleAction = (status) => {
        toast({
            title: `Proposition ${status === 'interested' ? 'acceptée' : 'refusée'}`,
            description: "Le propriétaire sera notifié de votre décision.",
        });
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Mes Propositions de Biens</CardTitle>
                <CardDescription>
                    Voici les biens qui correspondent à votre profil. Indiquez si vous êtes intéressé pour organiser une visite.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {proposals.map(p => (
                    <ProposalCard key={p.id} proposal={p} onAction={handleAction} />
                ))}
            </CardContent>
        </Card>
    );
};

export default TenantProposals;
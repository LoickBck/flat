import React from 'react';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Checkbox } from '@/components/ui/checkbox';
    import { useToast } from '@/components/ui/use-toast';

    const SearchProfile = () => {
        const { toast } = useToast();

        const handleSubmit = (e) => {
            e.preventDefault();
            toast({
                title: "🚧 Fonctionnalité en cours",
                description: "La sauvegarde de la fiche de recherche n'est pas encore implémentée.",
            });
        };

        return (
            <Card>
                <CardHeader>
                    <CardTitle>Ma Fiche de Recherche</CardTitle>
                    <CardDescription>
                        Ces informations restent confidentielles et nous aident à vous proposer les biens les plus pertinents.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Type(s) de bien recherché(s)</Label>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="type-appartement" />
                                    <Label htmlFor="type-appartement">Appartement</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="type-maison" />
                                    <Label htmlFor="type-maison">Maison</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="type-studio" />
                                    <Label htmlFor="type-studio">Studio / Kot</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="type-duplex" />
                                    <Label htmlFor="type-duplex">Duplex / Triplex</Label>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="locations">Localisations souhaitées</Label>
                                <Input id="locations" placeholder="ex: Bruxelles, 1000, Ixelles" />
                                <p className="text-xs text-muted-foreground">Séparez par des virgules.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="budget">Budget loyer mensuel maximum (€)</Label>
                                <Input id="budget" type="number" placeholder="ex: 1200" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="rooms">Nombre de chambres</Label>
                                <Input id="rooms" type="number" placeholder="ex: 2" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="entry-date">Date d'entrée idéale</Label>
                                <Input id="entry-date" type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="duration">Durée de location souhaitée</Label>
                                <Input id="duration" placeholder="ex: 3 ans, 1 an renouvelable..." />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Enregistrer ma recherche</Button>
                    </CardFooter>
                </form>
            </Card>
        );
    };

    export default SearchProfile;
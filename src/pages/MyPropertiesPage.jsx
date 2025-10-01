import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Link, useNavigate } from 'react-router-dom';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';
    import { Briefcase, Plus } from 'lucide-react';
    import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
    import { Badge } from '@/components/ui/badge';

    const PropertyCard = ({ property, delay }) => {
      const { toast } = useToast();

      const handleNotImplemented = (e) => {
        e.preventDefault();
        toast({
            title: "🚧 Bientôt disponible !",
            description: "La gestion des candidatures sera bientôt disponible ici.",
        });
      };
      
      return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delay }}
        >
          <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative">
                  <img className="w-full h-48 object-cover" alt={property.image} src="https://images.unsplash.com/photo-1697736715419-49e8e174e41f" />
                   <Badge className={`absolute top-3 right-3 ${
                      property.status === 'Loué' 
                        ? 'bg-secondary text-secondary-foreground' 
                        : 'bg-primary text-primary-foreground'
                    }`}>
                      {property.status}
                    </Badge>
              </div>
              <CardHeader>
                  <CardTitle className="truncate">{property.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{property.location}</p>
              </CardHeader>
              <CardContent className="flex-grow space-y-2 text-sm">
                  <div className="flex justify-between">
                      <span>Loyer:</span> <span className="font-semibold">{property.price}€/mois</span>
                  </div>
                  <div className="flex justify-between">
                      <span>Type:</span> <span className="font-semibold">{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                      <span>Surface:</span> <span className="font-semibold">{property.surface} m²</span>
                  </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full" onClick={handleNotImplemented}>
                      {property.candidates} Candidatures
                  </Button>
                  <Button className="w-full" onClick={handleNotImplemented}>Gérer</Button>
              </CardFooter>
          </Card>
        </motion.div>
      )
    };


    const MyPropertiesPage = () => {
      const navigate = useNavigate();

      const userProperties = [
        {
          id: 1,
          title: "Appartement moderne centre-ville",
          location: "Bruxelles",
          price: 1200,
          type: "Appartement",
          rooms: 3,
          surface: 65,
          image: "Appartement moderne avec cuisine équipée et balcon",
          status: "Loué",
          candidates: 5,
        },
        {
          id: 2,
          title: "Studio lumineux",
          location: "Liège",
          price: 650,
          type: "Studio",
          rooms: 1,
          surface: 25,
          image: "Studio moderne et lumineux proche métro",
          status: "Disponible",
          candidates: 12,
        }
      ];

      const handleAddProperty = () => {
        navigate('/tableau-de-bord/ajouter-un-bien');
      };

      return (
        <>
          <Helmet>
            <title>Mes Biens - Flat</title>
          </Helmet>
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center mb-8"
            >
              <div className="flex items-center">
                <Briefcase className="w-10 h-10 mr-4 text-primary" />
                <div>
                  <h1 className="text-4xl font-bold text-foreground">Mes Biens</h1>
                  <p className="text-lg text-muted-foreground">Gérez vos propriétés et candidatures.</p>
                </div>
              </div>
              <Button onClick={handleAddProperty}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un bien
              </Button>
            </motion.div>

            {userProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} delay={index * 0.1} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card border border-dashed rounded-xl">
                  <h2 className="text-2xl font-semibold text-foreground">Vous n'avez aucun bien publié.</h2>
                  <p className="text-muted-foreground mt-2 mb-6">Commencez par ajouter votre premier bien pour recevoir des candidatures.</p>
                  <Button onClick={handleAddProperty}>
                    <Plus className="w-4 h-4 mr-2" />
                    Publier ma première annonce
                  </Button>
              </div>
            )}
          </div>
        </>
      );
    };

    export default MyPropertiesPage;
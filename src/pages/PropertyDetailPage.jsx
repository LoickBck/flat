import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Home, Maximize, Calendar, Phone, Mail, Heart, Share2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Données d'exemple pour le bien immobilier
  const property = {
    id: parseInt(id),
    title: "Appartement moderne centre-ville",
    location: "Paris 11ème",
    price: 1200,
    type: "Appartement",
    rooms: 3,
    surface: 65,
    description: "Magnifique appartement de 3 pièces situé au cœur du 11ème arrondissement de Paris. Entièrement rénové avec des matériaux de qualité, il dispose d'une cuisine équipée moderne, d'un salon lumineux avec balcon, de deux chambres spacieuses et d'une salle de bain avec douche italienne. Proche de tous les transports et commerces.",
    features: [
      "Cuisine équipée",
      "Balcon",
      "Parquet",
      "Double vitrage",
      "Chauffage individuel",
      "Ascenseur",
      "Digicode",
      "Proche métro"
    ],
    images: [
      "Vue d'ensemble de l'appartement moderne avec salon lumineux",
      "Cuisine équipée moderne avec îlot central",
      "Chambre principale avec dressing intégré",
      "Salle de bain moderne avec douche italienne",
      "Balcon avec vue sur la ville"
    ],
    owner: {
      name: "Marie Dubois",
      phone: "06 12 34 56 78",
      email: "marie.dubois@email.com",
      avatar: "Portrait professionnel de Marie Dubois, propriétaire"
    },
    availableFrom: "01/03/2024"
  };

  const handleContact = () => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀"
    });
  };

  const handleFavorite = () => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀"
    });
  };

  const handleShare = () => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀"
    });
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Button 
            variant="outline" 
            className="border-border text-foreground hover:bg-muted/40"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  className="w-full h-96 object-cover"
                  alt={`Image ${currentImageIndex + 1} de ${property.title}`}
                 src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white text-foreground"
                    onClick={handleFavorite}
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white text-foreground"
                    onClick={handleShare}
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Image Thumbnails */}
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img 
                      className="w-full h-full object-cover"
                      alt={`Miniature ${index + 1}`}
                     src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="property-card rounded-2xl p-8 mb-8 border border-border bg-card"
            >
              <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{property.title}</h1>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-primary">{property.price}€</div>
                  <div className="text-muted-foreground">/mois</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/20 rounded-lg">
                  <Home className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold text-foreground">{property.rooms}</div>
                  <div className="text-sm text-muted-foreground">Pièces</div>
                </div>
                <div className="text-center p-4 bg-muted/20 rounded-lg">
                  <Maximize className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold text-foreground">{property.surface}m²</div>
                  <div className="text-sm text-muted-foreground">Surface</div>
                </div>
                <div className="text-center p-4 bg-muted/20 rounded-lg">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold text-foreground">{property.availableFrom}</div>
                  <div className="text-sm text-muted-foreground">Disponible</div>
                </div>
                <div className="text-center p-4 bg-muted/20 rounded-lg">
                  <div className="font-semibold text-primary">{property.type}</div>
                  <div className="text-sm text-muted-foreground">Type</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Équipements et services</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center p-2 bg-muted/20 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="property-card rounded-2xl p-6 mb-6 border border-border bg-card"
            >
              <h3 className="text-xl font-semibold mb-4 text-foreground">Contacter le propriétaire</h3>
              
              <div className="flex items-center mb-4">
                <img 
                  className="w-12 h-12 rounded-full mr-3 border border-border"
                  alt={`Photo de ${property.owner.name}`}
                 src="https://images.unsplash.com/photo-1643101447193-9c59d5db2771" />
                <div>
                  <div className="font-semibold text-foreground">{property.owner.name}</div>
                  <div className="text-sm text-muted-foreground">Propriétaire</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span className="text-sm text-foreground">{property.owner.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span className="text-sm text-foreground">{property.owner.email}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full"
                  onClick={handleContact}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Appeler
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleContact}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer un message
                </Button>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="property-card rounded-2xl p-6 border border-border bg-card"
            >
              <h3 className="text-xl font-semibold mb-4 text-foreground">Actions rapides</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleContact}
                >
                  Planifier une visite
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleContact}
                >
                  Poser une question
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleContact}
                >
                  Signaler cette annonce
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
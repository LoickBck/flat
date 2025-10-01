import React from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { MapPin, Home, Maximize, Heart } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';

    const PropertyCard = ({ property }) => {
      const { toast } = useToast();

      const handleFavorite = (e) => {
        e.preventDefault();
        toast({
          title: "🚧 Bientôt disponible !",
          description: "La fonctionnalité de favoris sera bientôt active.",
        });
      };

      return (
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border h-full flex flex-col"
        >
          <div className="relative">
            <Link to={`/bien/${property.id}`} className="block">
              <img className="w-full h-48 object-cover" alt={`Image de ${property.title}`} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700 rounded-full"
              onClick={handleFavorite}
            >
              <Heart className="w-5 h-5" />
            </Button>
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
              <span className="text-sm font-semibold text-foreground">{property.type}</span>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="flex-grow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-foreground line-clamp-2">{property.title}</h3>
                <div className="text-right flex-shrink-0 pl-2">
                  <div className="text-2xl font-bold text-primary">{property.price}€</div>
                  <div className="text-sm text-muted-foreground">/mois</div>
                </div>
              </div>

              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{property.location}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
                <div className="flex items-center">
                  <Home className="w-4 h-4 mr-2 text-primary" />
                  <span>{property.rooms} pièces</span>
                </div>
                <div className="flex items-center">
                  <Maximize className="w-4 h-4 mr-2 text-primary" />
                  <span>{property.surface}m²</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
                <Link to={`/bien/${property.id}`}>
                  <Button className="w-full">
                    Voir les détails
                  </Button>
                </Link>
            </div>
          </div>
        </motion.div>
      );
    };

    export default PropertyCard;
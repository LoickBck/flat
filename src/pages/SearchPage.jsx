import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Filter, Grid, List } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import PropertyCard from '@/components/PropertyCard';
    import { useToast } from '@/components/ui/use-toast';

    const SearchPage = () => {
      const [viewMode, setViewMode] = useState('grid');
      const [showFilters, setShowFilters] = useState(false);
      const { toast } = useToast();

      // Données d'exemple pour les résultats de recherche
      const searchResults = [
        {
          id: 1,
          title: "Appartement moderne centre-ville",
          location: "Paris 11ème",
          price: 1200,
          type: "Appartement",
          rooms: 3,
          surface: 65,
          image: "Appartement moderne avec cuisine équipée et balcon"
        },
        {
          id: 2,
          title: "Maison avec jardin",
          location: "Boulogne-Billancourt",
          price: 2500,
          type: "Maison",
          rooms: 5,
          surface: 120,
          image: "Belle maison familiale avec jardin et terrasse"
        },
        {
          id: 3,
          title: "Studio lumineux",
          location: "Lyon 2ème",
          price: 650,
          type: "Studio",
          rooms: 1,
          surface: 25,
          image: "Studio moderne et lumineux proche métro"
        },
        {
          id: 4,
          title: "Loft industriel",
          location: "Marseille 1er",
          price: 1800,
          type: "Loft",
          rooms: 4,
          surface: 95,
          image: "Loft industriel avec poutres apparentes"
        },
        {
          id: 5,
          title: "Duplex avec terrasse",
          location: "Nice Centre",
          price: 2200,
          type: "Appartement",
          rooms: 4,
          surface: 85,
          image: "Duplex moderne avec grande terrasse"
        },
        {
          id: 6,
          title: "Maison de ville",
          location: "Toulouse Capitole",
          price: 1900,
          type: "Maison",
          rooms: 4,
          surface: 110,
          image: "Charmante maison de ville rénovée"
        }
      ];

      return (
        <div className="pt-20 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-card rounded-xl p-6 shadow-sm border border-border"
            >
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Résultats de recherche</h1>
                <p className="text-muted-foreground">{searchResults.length} biens trouvés</p>
              </div>

              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <Button
                  variant={showFilters ? "default" : "outline"}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Filters Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-card rounded-xl p-6 mb-8 shadow-sm border border-border"
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">Filtres avancés</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-foreground mb-2">Prix minimum</label>
                    <input
                      type="number"
                      placeholder="€"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-foreground mb-2">Surface minimum</label>
                    <input
                      type="number"
                      placeholder="m²"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-foreground mb-2">Équipements</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground">
                      <option value="">Tous</option>
                      <option value="balcon">Balcon</option>
                      <option value="parking">Parking</option>
                      <option value="jardin">Jardin</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <Button 
                    onClick={() => toast({
                      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀"
                    })}
                  >
                    Appliquer les filtres
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Results Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}
            >
              {searchResults.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <Button 
                size="lg" 
                onClick={() => toast({
                  title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀"
                })}
              >
                Charger plus de résultats
              </Button>
            </motion.div>
          </div>
        </div>
      );
    };

    export default SearchPage;
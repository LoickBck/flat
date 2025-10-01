import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import { FileText, Search, Eye } from 'lucide-react';
    import RentalApplicationFile from '@/components/tenant/RentalApplicationFile';
    import SearchProfile from '@/components/tenant/SearchProfile';
    import RentalApplicationPreview from '@/components/tenant/RentalApplicationPreview';

    const MyFilePage = () => {
      return (
        <>
          <Helmet>
            <title>Mon Dossier - Flat</title>
            <meta name="description" content="Gérez votre dossier locatif, vos critères de recherche et prévisualisez le résultat final." />
          </Helmet>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4">
              <FileText className="w-10 h-10 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Mon Dossier</h1>
                <p className="text-muted-foreground">Gérez votre profil locataire, vos critères de recherche et visualisez votre dossier.</p>
              </div>
            </div>

            <Tabs defaultValue="rental-file" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="rental-file">
                  <FileText className="w-4 h-4 mr-2" />
                  Modifier le dossier
                </TabsTrigger>
                <TabsTrigger value="search-profile">
                  <Search className="w-4 h-4 mr-2" />
                  Fiche de Recherche
                </TabsTrigger>
                <TabsTrigger value="preview-file">
                  <Eye className="w-4 h-4 mr-2" />
                  Afficher mon dossier
                </TabsTrigger>
              </TabsList>
              <TabsContent value="rental-file" className="mt-6">
                <RentalApplicationFile />
              </TabsContent>
              <TabsContent value="search-profile" className="mt-6">
                <SearchProfile />
              </TabsContent>
               <TabsContent value="preview-file" className="mt-6">
                <RentalApplicationPreview />
              </TabsContent>
            </Tabs>
          </motion.div>
        </>
      );
    };

    export default MyFilePage;
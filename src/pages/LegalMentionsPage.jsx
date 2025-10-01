import React from 'react';
    import { motion } from 'framer-motion';

    const LegalMentionsPage = () => {
      return (
        <div className="py-12 md:py-24">
          <div className="container px-4 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tighter mb-4">Mentions Légales</h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="prose prose-lg max-w-none text-foreground/80"
            >
              <h2>1. Éditeur du site</h2>
              <p><strong>Nom de la société :</strong> ImmoConnect (Nom fictif)</p>
              <p><strong>Forme juridique :</strong> SRL</p>
              <p><strong>Adresse du siège social :</strong> 100 Rue de l'Exemple, 1000 Bruxelles, Belgique</p>
              <p><strong>Numéro d'entreprise (BCE) :</strong> 0123.456.789</p>
              <p><strong>Email :</strong> <a href="mailto:contact@immoconnect.be">contact@immoconnect.be</a></p>
              <p><strong>Directeur de la publication :</strong> Jean Dupont</p>
              
              <h2>2. Hébergement</h2>
              <p><strong>Hébergeur :</strong> Hostinger International Ltd.</p>
              <p><strong>Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Chypre</p>
              <p><strong>Contact :</strong> <a href="https://www.hostinger.fr/contact" target="_blank" rel="noopener noreferrer">https://www.hostinger.fr/contact</a></p>
              
              <h2>3. Propriété intellectuelle</h2>
              <p>L'ensemble de ce site (contenu, textes, images, vidéos et tout autre élément) relève de la législation belge et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.</p>
              
              <h2>4. Limitation de responsabilité</h2>
              <p>ImmoConnect s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, ImmoConnect ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à la disposition sur ce site. En conséquence, ImmoConnect décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.</p>
            </motion.div>
          </div>
        </div>
      );
    };

    export default LegalMentionsPage;
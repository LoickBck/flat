import React from 'react';
    import { motion } from 'framer-motion';

    const PrivacyPolicyPage = () => {
      return (
        <div className="py-12 md:py-24">
          <div className="container px-4 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tighter mb-4">Politique de Confidentialité</h1>
              <p className="text-muted-foreground">Dernière mise à jour : 6 septembre 2025</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="prose prose-lg max-w-none text-foreground/80"
            >
              <h2>1. Introduction</h2>
              <p>ImmoConnect s'engage à protéger la vie privée de ses utilisateurs. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre site web. Nous nous conformons au Règlement Général sur la Protection des Données (RGPD).</p>
              
              <h2>2. Collecte de vos informations</h2>
              <p>Nous collectons des informations vous concernant de plusieurs manières :</p>
              <ul>
                <li><strong>Informations personnelles identifiables :</strong> Nom, adresse e-mail, numéro de téléphone, que vous nous fournissez volontairement lors de votre inscription.</li>
                <li><strong>Informations financières et professionnelles :</strong> Revenus, statut professionnel, documents justificatifs (fiches de paie, etc.) que vous téléchargez pour constituer votre dossier locataire.</li>
                <li><strong>Données de navigation :</strong> Adresse IP, type de navigateur, pages visitées, collectées automatiquement via des cookies.</li>
              </ul>
              
              <h2>3. Utilisation de vos informations</h2>
              <p>Nous utilisons les informations collectées pour :</p>
              <ul>
                <li>Créer et gérer votre compte.</li>
                <li>Faciliter la mise en relation entre locataires et propriétaires.</li>
                <li>Vous envoyer des notifications et des alertes personnalisées.</li>
                <li>Améliorer notre site web et nos services.</li>
                <li>Respecter nos obligations légales.</li>
              </ul>

              <h2>4. Partage de vos informations</h2>
              <p>Vos informations ne sont partagées qu'avec votre consentement explicite. Lorsque vous postulez à une annonce, votre dossier est transmis au propriétaire concerné. Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers à des fins de marketing.</p>
              
              <h2>5. Sécurité de vos informations</h2>
              <p>Nous utilisons des mesures de sécurité administratives, techniques et physiques pour protéger vos informations personnelles. Toutes les données sensibles sont chiffrées lors de leur transmission et de leur stockage.</p>
              
              <h2>6. Vos droits</h2>
              <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression, de limitation du traitement, et de portabilité de vos données. Pour exercer ces droits, veuillez nous contacter à l'adresse <a href="mailto:contact@immoconnect.be">contact@immoconnect.be</a>.</p>
            </motion.div>
          </div>
        </div>
      );
    };

    export default PrivacyPolicyPage;
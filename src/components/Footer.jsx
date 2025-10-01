import React from 'react';
    import { Link } from 'react-router-dom';
    import { Building2 } from 'lucide-react';

    const Footer = () => {
      const footerSections = [
        {
          title: "Navigation",
          links: [
            { label: "Accueil", to: "/" },
            { label: "Espace Locataire", to: "/inscription" },
            { label: "Espace Propriétaire", to: "/connexion" },
          ]
        },
        {
          title: "Ressources",
          links: [
            { label: "Créer un dossier locataire", to: "/inscription" },
            { label: "Centre d'aide", to: "/tableau-de-bord/support" },
          ]
        },
        {
          title: "Légal",
          links: [
            { label: "Politique de confidentialité", to: "/politique-de-confidentialite" },
            { label: "Mentions légales", to: "/mentions-legales" },
          ]
        }
      ];

      return (
        <footer className="bg-muted/50 border-t">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              <div className="flex flex-col">
                <Link to="/" className="flex items-center space-x-2 mb-4">
                   <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-bold">Flat</span>
                </Link>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Simplifier, digitaliser et sécuriser la location longue durée en Belgique.
                </p>
              </div>

              {footerSections.map(section => (
                <div key={section.title} className="flex flex-col gap-3">
                  <p className="font-semibold text-foreground mb-1">{section.title}</p>
                  <ul className="space-y-2">
                    {section.links.map(link => (
                      <li key={link.to}>
                        <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Flat. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;
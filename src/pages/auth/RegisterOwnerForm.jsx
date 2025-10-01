import React, { useState, useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Link, useNavigate } from 'react-router-dom';
    import { Helmet } from 'react-helmet';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Checkbox } from '@/components/ui/checkbox';
    import { AuthContext } from '@/contexts/AuthContext';
    import { useToast } from '@/components/ui/use-toast';

    const RegisterOwnerForm = () => {
      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        propertyCount: '',
        profession: '',
        isProfessional: false,
        cgu: false,
      });
      const { register } = useContext(AuthContext);
      const navigate = useNavigate();
      const { toast } = useToast();

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.cgu) {
          toast({
            title: "Conditions Générales d'Utilisation",
            description: "Vous devez accepter les CGU pour vous inscrire.",
            variant: "destructive",
          });
          return;
        }
        register({ ...formData, role: 'owner' });
        navigate('/tableau-de-bord');
      };

      return (
        <>
          <Helmet>
            <title>Inscription Propriétaire - Flat</title>
          </Helmet>
          <div className="container mx-auto px-4 py-16 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg"
            >
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-foreground">Créer un compte Propriétaire</h1>
                  <p className="text-muted-foreground">Trouvez le locataire idéal pour votre bien.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Numéro de téléphone</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="propertyCount">Nombre de biens (optionnel)</Label>
                      <Input id="propertyCount" name="propertyCount" type="number" value={formData.propertyCount} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profession">Profession (optionnel)</Label>
                      <Input id="profession" name="profession" value={formData.profession} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="isProfessional" name="isProfessional" checked={formData.isProfessional} onCheckedChange={(checked) => setFormData(p => ({...p, isProfessional: checked}))} />
                      <Label htmlFor="isProfessional" className="text-sm font-normal">Je suis un professionnel de l'immobilier.</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cgu" name="cgu" checked={formData.cgu} onCheckedChange={(checked) => setFormData(p => ({...p, cgu: checked}))} />
                      <Label htmlFor="cgu" className="text-sm font-normal">
                        J'accepte les <Link to="/mentions-legales" className="underline hover:text-primary">Conditions Générales d'Utilisation</Link>.
                      </Label>
                    </div>
                    <div className="p-4 bg-muted rounded-md text-center text-sm text-muted-foreground">
                      [Espace réservé pour le CAPTCHA]
                    </div>
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Créer mon compte
                  </Button>
                </form>
                 <div className="text-center mt-6">
                  <p className="text-muted-foreground">
                    Déjà un compte ?{' '}
                    <Link to="/connexion" className="font-semibold text-primary hover:underline">
                        Connectez-vous
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      );
    };

    export default RegisterOwnerForm;
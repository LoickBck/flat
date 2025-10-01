import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Link, useNavigate } from 'react-router-dom';
    import { Helmet } from 'react-helmet';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Checkbox } from '@/components/ui/checkbox';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import { useToast } from '@/components/ui/use-toast';
    
    const RegisterPage = () => {
      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        cgu: false,
      });
      const [loading, setLoading] = useState(false);
      const { signUp } = useAuth();
      const navigate = useNavigate();
      const { toast } = useToast();

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.cgu) {
          toast({
            title: "Conditions Générales d'Utilisation",
            description: "Vous devez accepter les CGU pour vous inscrire.",
            variant: "destructive",
          });
          return;
        }
        
        setLoading(true);
        const { error } = await signUp(formData.email, formData.password, { 
            data: {
              first_name: formData.firstName, 
              last_name: formData.lastName,
              role: 'tenant',
            }
        });

        if (error) {
             toast({
                variant: "destructive",
                title: "Échec de l'inscription",
                description: "Un compte avec cet email existe déjà ou une erreur est survenue.",
            });
        } else {
            toast({
                title: "Compte créé avec succès !",
                description: "Veuillez vérifier vos e-mails pour confirmer votre compte.",
            });
            navigate('/connexion');
        }
        setLoading(false);
      };

      return (
        <>
          <Helmet>
            <title>Créer un compte locataire - Flat</title>
          </Helmet>
          <div className="container mx-auto px-4 py-16 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg"
            >
              <div className="bg-card p-8 rounded-xl border shadow-sm">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-foreground">Créez votre dossier locataire</h1>
                  <p className="text-muted-foreground">Numérisez, fluidifiez et sécurisez votre recherche de logement.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required disabled={loading} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required disabled={loading} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required disabled={loading} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required disabled={loading} />
                  </div>
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cgu" name="cgu" checked={formData.cgu} onCheckedChange={(checked) => setFormData(p => ({...p, cgu: checked}))} disabled={loading} />
                      <Label htmlFor="cgu" className="text-sm font-normal">
                        J'accepte les <Link to="/mentions-legales" className="underline hover:text-primary">Conditions Générales d'Utilisation</Link>.
                      </Label>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? 'Création en cours...' : 'Créer mon compte'}
                  </Button>
                </form>
                 <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground">
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

    export default RegisterPage;
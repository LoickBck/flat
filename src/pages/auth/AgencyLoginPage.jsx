import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthContext } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Building } from 'lucide-react';
const AgencyLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    login
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleSubmit = e => {
    e.preventDefault();
    if (email && password) {
      login({
        email,
        role: 'agency',
        name: 'Agence Test'
      });
      navigate('/tableau-de-bord');
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Veuillez entrer un email et un mot de passe.",
        variant: "destructive"
      });
    }
  };
  return <>
          <Helmet>
            <title>Connexion Agence - Flat</title>
          </Helmet>
          <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="w-full max-w-sm">
              <div className="bg-card p-8 rounded-xl border shadow-sm">
                <div className="text-center mb-8">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Building className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">Professionnel de l'immobilier
            </h1>
                  <p className="text-muted-foreground">Connectez-vous à votre tableau de bord professionnel.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email </Label>
                    <Input id="email" type="email" placeholder="contact@agence.immo" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Link to="/mot-de-passe-oublie" className="text-sm font-medium text-primary hover:underline">
                        Mot de passe oublié ?
                      </Link>
                    </div>
                    <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Se connecter
                  </Button>
                </form>
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground">
                    Vous n'êtes pas une agence ?{' '}
                    <Link to="/" className="font-semibold text-primary hover:underline">
                      Retour à l'accueil
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>;
};
export default AgencyLoginPage;
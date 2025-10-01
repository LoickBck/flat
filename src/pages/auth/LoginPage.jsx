import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Link, useNavigate } from 'react-router-dom';
    import { Helmet } from 'react-helmet';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import { useToast } from '@/components/ui/use-toast';

    const LoginPage = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [loading, setLoading] = useState(false);
      const { signIn } = useAuth();
      const navigate = useNavigate();
      const { toast } = useToast();

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await signIn(email, password);
        
        if (error) {
          toast({
            variant: "destructive",
            title: "Échec de la connexion",
            description: "Email ou mot de passe incorrect.",
          });
        } else {
          toast({
            title: "Connexion réussie !",
            description: "Bienvenue sur votre tableau de bord.",
          });
          navigate('/tableau-de-bord');
        }
        setLoading(false);
      };

      return (
        <>
          <Helmet>
            <title>Connexion - Flat</title>
          </Helmet>
          <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-sm"
            >
              <div className="bg-card p-8 rounded-xl border shadow-sm">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-foreground">Connexion</h1>
                  <p className="text-muted-foreground">Accédez à votre tableau de bord.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jean.dupont@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Link
                        to="/mot-de-passe-oublie"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Mot de passe oublié ?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? 'Connexion en cours...' : 'Se connecter'}
                  </Button>
                </form>
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground">
                    Pas encore de compte ?{' '}
                    <Link to="/inscription" className="font-semibold text-primary hover:underline">
                      Inscrivez-vous
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      );
    };

    export default LoginPage;
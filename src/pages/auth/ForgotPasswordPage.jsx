import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { Helmet } from 'react-helmet';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/components/ui/use-toast';

    const ForgotPasswordPage = () => {
      const { toast } = useToast();
      const [email, setEmail] = useState('');
      const [loading, setLoading] = useState(false);
      const [sent, setSent] = useState(false);

      const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate sending email
        setTimeout(() => {
            setLoading(false);
            setSent(true);
            toast({
                title: "Fonctionnalité en cours de développement",
                description: "Cette fonctionnalité de réinitialisation de mot de passe n'est pas encore implémentée.",
            });
        }, 1000);
      };

      return (
        <>
          <Helmet>
            <title>Mot de passe oublié - Flat</title>
          </Helmet>
          <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[80vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-foreground">Mot de passe oublié</h1>
                  <p className="text-muted-foreground">
                    {sent 
                      ? "Si un compte existe pour cet email, un lien aurait été envoyé."
                      : "Entrez votre email pour recevoir un lien de réinitialisation."
                    }
                  </p>
                </div>
                {!sent ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Adresse email</Label>
                        <Input
                        id="email"
                        type="email"
                        placeholder="jean.dupont@email.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        />
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={loading}>
                        {loading ? "Envoi en cours..." : "Envoyer le lien"}
                    </Button>
                    </form>
                ) : (
                    <div className="text-center">
                        <p className="text-muted-foreground">Cette fonctionnalité est en cours de construction.</p>
                    </div>
                )}
                <div className="text-center mt-6">
                  <p className="text-muted-foreground">
                    Vous vous souvenez de votre mot de passe ?{' '}
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

    export default ForgotPasswordPage;
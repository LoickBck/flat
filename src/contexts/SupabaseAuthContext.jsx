import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const fetchProfile = useCallback(async (userId) => {
    if (!userId) return null;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        // ✅ Ne pas bloquer si la table profiles n'existe pas
        console.warn(
          "Profile fetch failed (normal si pas de table profiles):",
          error.message
        );
        setProfile(null);
        return null;
      }

      setProfile(data);
      return data;
    } catch (error) {
      console.warn("Profile fetch error:", error.message);
      setProfile(null);
      return null;
    }
  }, []);

  const handleAuthChange = useCallback(
    async (session) => {
      console.log("🔄 Auth change:", session?.user?.email || "No user");

      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setSession(session);

      if (currentUser) {
        // ✅ Ne pas attendre fetchProfile - ça peut échouer
        fetchProfile(currentUser.id).catch(() => {
          // Ignore les erreurs de profil
          setProfile(null);
        });
      } else {
        setProfile(null);
      }

      // ✅ TOUJOURS mettre loading à false
      console.log("✅ Setting loadingInitial to false");
      setLoadingInitial(false);
    },
    [fetchProfile]
  );

  useEffect(() => {
    let mounted = true;

    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
          if (mounted) {
            setLoadingInitial(false);
          }
          return;
        }

        if (mounted) {
          await handleAuthChange(session);
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error);
        if (mounted) {
          setLoadingInitial(false);
        }
      }
    };

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 Auth state change event:", event);
      if (mounted) {
        await handleAuthChange(session);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [handleAuthChange]);

  const signUp = useCallback(
    async (email, password, options) => {
      setLoadingAuth(true);
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: options?.data || {},
          },
        });

        if (error) {
          toast({
            variant: "destructive",
            title: "Inscription échouée",
            description: error.message || "Une erreur est survenue",
          });
        }

        setLoadingAuth(false);
        return { user: data.user, error };
      } catch (error) {
        setLoadingAuth(false);
        toast({
          variant: "destructive",
          title: "Inscription échouée",
          description: "Une erreur inattendue est survenue",
        });
        return { user: null, error };
      }
    },
    [toast]
  );

  const signIn = useCallback(
    async (email, password) => {
      setLoadingAuth(true);
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast({
            variant: "destructive",
            title: "Connexion échouée",
            description: error.message || "Identifiants incorrects",
          });
        }

        setLoadingAuth(false);
        return { error };
      } catch (error) {
        setLoadingAuth(false);
        toast({
          variant: "destructive",
          title: "Connexion échouée",
          description: "Une erreur inattendue est survenue",
        });
        return { error };
      }
    },
    [toast]
  );

  const signOut = useCallback(async () => {
    setLoadingAuth(true);
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast({
          variant: "destructive",
          title: "Déconnexion échouée",
          description: error.message || "Une erreur est survenue",
        });
      } else {
        toast({
          title: "Déconnexion réussie",
          description: "Vous avez été déconnecté avec succès",
        });
      }

      setLoadingAuth(false);
      return { error };
    } catch (error) {
      setLoadingAuth(false);
      toast({
        variant: "destructive",
        title: "Déconnexion échouée",
        description: "Une erreur inattendue est survenue",
      });
      return { error };
    }
  }, [toast]);

  const value = useMemo(
    () => ({
      user,
      profile,
      session,
      loading: loadingInitial,
      loadingAuth,
      signUp,
      signIn,
      signOut,
    }),
    [
      user,
      profile,
      session,
      loadingInitial,
      loadingAuth,
      signUp,
      signIn,
      signOut,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

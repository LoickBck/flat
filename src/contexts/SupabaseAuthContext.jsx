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
      if (error) throw error;
      setProfile(data);
      return data;
    } catch (error) {
      console.error("Error fetching profile:", error.message);
      setProfile(null);
      return null;
    }
  }, []);

  const handleAuthChange = useCallback(
    async (session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setSession(session);

      if (currentUser) {
        await fetchProfile(currentUser.id);
      } else {
        setProfile(null);
      }
      setLoadingInitial(false);
    },
    [fetchProfile]
  );

  useEffect(() => {
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      await handleAuthChange(session);
    };

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      await handleAuthChange(session);
    });

    return () => subscription.unsubscribe();
  }, [handleAuthChange]);

  const signUp = useCallback(
    async (email, password, options) => {
      setLoadingAuth(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: options.data,
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Sign up Failed",
          description: error.message || "Something went wrong",
        });
      }
      setLoadingAuth(false);
      return { user: data.user, error };
    },
    [toast]
  );

  const signIn = useCallback(
    async (email, password) => {
      setLoadingAuth(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Sign in Failed",
          description: error.message || "Something went wrong",
        });
      }
      setLoadingAuth(false);
      return { error };
    },
    [toast]
  );

  const signOut = useCallback(async () => {
    setLoadingAuth(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign out Failed",
        description: error.message || "Something went wrong",
      });
    }
    setLoadingAuth(false);
    return { error };
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

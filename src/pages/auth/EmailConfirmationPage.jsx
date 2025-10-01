import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

export default function EmailConfirmationPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      const token_hash = searchParams.get("token_hash");
      const type = searchParams.get("type");

      if (token_hash && type === "signup") {
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: "signup",
          });

          if (error) {
            setStatus("error");
            console.error("Erreur confirmation:", error);
          } else {
            setStatus("success");
            setTimeout(() => navigate("/tableau-de-bord"), 2000);
          }
        } catch (err) {
          setStatus("error");
        }
      } else {
        setStatus("error");
      }
    };

    confirmEmail();
  }, [searchParams, navigate]);

  if (status === "loading") {
    return <div>Confirmation en cours...</div>;
  }

  if (status === "success") {
    return <div>Email confirmé ! Redirection...</div>;
  }

  return <div>Erreur de confirmation</div>;
}

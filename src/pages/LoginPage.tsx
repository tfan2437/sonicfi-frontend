import type { User } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useUserStore } from "@/stores/useAuthStore";

import LoginHeader from "@/components/auth/LoginHeader";
import LoginBody from "@/components/auth/LoginBody";
import LoginFooter from "@/components/auth/LoginFooter";

const LoginPage = () => {
  const navigate = useNavigate();

  const { fetchUser } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        fetchUser(user.uid);
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate, fetchUser]);

  return (
    <div className="flex flex-row w-full h-screen bg-gradient-to-b from-black to-[#0000bb]">
      <div className="flex-1 h-full flex flex-col">
        <LoginHeader />
        <LoginBody />
        <LoginFooter />
      </div>
    </div>
  );
};

export default LoginPage;

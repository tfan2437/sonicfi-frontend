import type { User } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";

import LoginHeader from "@/components/auth/LoginHeader";
import LoginBody from "@/components/auth/LoginBody";
import LoginFooter from "@/components/auth/LoginFooter";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="flex flex-row w-full h-screen bg-black">
      <div className="w-full md:w-1/2 h-full bg-white flex flex-col">
        <LoginHeader />
        <LoginBody />
        <LoginFooter />
      </div>
    </div>
  );
};

export default LoginPage;

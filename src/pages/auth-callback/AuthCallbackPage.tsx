import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { axiosInstance } from "@/lib/axios";

import { LoaderIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();
  const syncAttempted = useRef(false);
  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user || syncAttempted.current) return;

      try {
        syncAttempted.current = true;

        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
      } catch (error) {
        console.error("Error in auth callback", error);
      } finally {
        navigate("/");
      }
    };

    syncUser();
  }, [isLoaded, user, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <Card className="w-[90%] max-w-md border-zinc-800 bg-zinc-900">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <LoaderIcon className="size-6 animate-spin text-emerald-500" />
          <h3 className="text-xl font-bold text-zinc-400">Loggin you in</h3>
          <p className="text-sm text-zinc-400">Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;

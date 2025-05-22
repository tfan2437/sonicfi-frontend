import { Link } from "react-router-dom";
import { LayoutDashboardIcon } from "lucide-react";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import SignInOAuthButton from "@/components/SignInOAuthButton";
import useAuthStore from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
const Topbar = () => {
  const { isAdmin } = useAuthStore();
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between rounded bg-zinc-900/75 p-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <img src="/spotify.png" alt="Sonicfi" className="size-8" />
        <span>Sonicfi</span>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to="/admin" className={cn(buttonVariants({ variant: "outline" }))}>
            <LayoutDashboardIcon className="size-4" />
            <span>Admin Dashboard</span>
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;

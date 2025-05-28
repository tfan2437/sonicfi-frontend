import type { User } from "firebase/auth";

import { auth } from "@/services/firebase";
import { Outlet } from "react-router-dom";
import LeftSidebar from "@/components/layout/LeftSidebar";
import AudioPlayer from "@/components/playback/AudioPlayer";
import TrackControl from "@/components/playback/TrackControl";
import { useEffect } from "react";
import Navbar from "@/components/nav/Navbar";

import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "@/stores/useAuthStore";

const MainLayout = () => {
  const { fetchUser } = useUserStore();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        fetchUser(user.uid);
      }
    });
    return () => unsubscribe();
  }, [fetchUser]);

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <Navbar />

      <div className="flex h-full flex-1 gap-2 overflow-hidden p-2">
        <LeftSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <TrackControl />
      <AudioPlayer />
    </div>
  );
};

export default MainLayout;

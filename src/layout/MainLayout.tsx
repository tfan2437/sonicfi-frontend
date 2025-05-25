import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "@/components/layout/LeftSidebar";
import FriendsActivity from "@/components/layout/FriendsActivity";
import AudioPlayer from "@/components/layout/AudioPlayer";
import TrackControl from "@/components/layout/TrackControl";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

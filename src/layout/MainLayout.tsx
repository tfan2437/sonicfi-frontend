import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
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
      <ResizablePanelGroup
        direction="horizontal"
        className="flex h-full flex-1 overflow-hidden p-2"
      >
        {/* Left Sidebar */}
        <ResizablePanel defaultSize={16} minSize={isMobile ? 0 : 10} maxSize={16}>
          <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle className="w-2 rounded-lg bg-black transition-colors" />
        {/* Main Content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>
        {/* {!isMobile && (
          <>
            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
            <ResizablePanel
              defaultSize={20}
              minSize={0}
              maxSize={25}
              collapsedSize={0}
            >
              <FriendsActivity />
            </ResizablePanel>
          </>
        )} */}
      </ResizablePanelGroup>
      <TrackControl />
      <AudioPlayer />
    </div>
  );
};

export default MainLayout;

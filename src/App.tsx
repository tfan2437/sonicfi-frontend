import { Routes, Route } from "react-router-dom";
// pages
import HomePage from "@/pages/HomePage";
import AuthCallbackPage from "@/pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "@/layout/MainLayout";
import ChatPage from "@/pages/chat/ChatPage";
import AlbumPage from "@/pages/AlbumPage";
import AdminPage from "@/pages/admin/AdminPage";
import { Toaster } from "react-hot-toast";
import ArtistPage from "@/pages/ArtistPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signInForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;

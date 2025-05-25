import { Routes, Route } from "react-router-dom";
// pages
import MainLayout from "@/components/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import ArtistPage from "@/pages/ArtistPage";
import AlbumPage from "@/pages/AlbumPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
          <Route path="/album/:id" element={<AlbumPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

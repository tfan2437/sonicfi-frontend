import { Routes, Route } from "react-router-dom";
// import { axiosInstance } from "./lib/axios";
// pages
import HomePage from "@/pages/HomePage";
import AuthCallbackPage from "@/pages/AuthCallbackPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
      </Routes>
    </>
  );
};

export default App;

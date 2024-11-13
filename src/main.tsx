import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.tsx";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./components/theme-provider.tsx";
import Header from "./components/header.tsx";
import SideBar from "./components/sideBar.tsx";
import SingleVideoPage from "./pages/Video.tsx";
import Search from "./pages/Search.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative h-screen">
          <Header />
          <div className="flex h-full pt-20">
            <div className="lg:block hidden">
              <SideBar />
            </div>
            <main className="bg-[#F9F9F9] dark:bg-background w-full lg:pl-[300px]">
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/video/:id" element={<SingleVideoPage />} />
                <Route path="/search/:value" element={<Search />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);

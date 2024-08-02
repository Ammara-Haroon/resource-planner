import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobsDashboardPage from "./pages/JobsDashboardPage/JobsDashboardPage";
import ResourcesDashboardPage from "./pages/ResourcesDashboardPage/ResourcesDashboardPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ResourcePage from "./pages/ReosurcePage/ResourcePage";
import SideMenu from "./components/SideMenu/SideMenu";

function App() {
  return (
    <BrowserRouter>
      <div
        className="md:grid flex flex-col font-mono min-h-screen max-w-screen "
        style={{ gridTemplateColumns: "1fr 6fr" }}
      >
        <SideMenu />
        <div className="max-w-full overflow-hidden w-full h-full bg-gradient-to-b from-slate-900 to-sky-700 md:my-1">
          <Routes>
            <Route path="/" element={<JobsDashboardPage />} />
            <Route path="/resources" element={<ResourcesDashboardPage />} />
            <Route path="/resources/:id" element={<ResourcePage />} />
            <Route path="/error/:msg" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

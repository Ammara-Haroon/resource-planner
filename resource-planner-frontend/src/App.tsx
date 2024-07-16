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
      {/* <SideMenu /> */}
      <Routes>
        <Route path="/jobs" element={<JobsDashboardPage />} />
        <Route path="/resources" element={<ResourcesDashboardPage />} />
        <Route path="/resources/:id" element={<ResourcePage />} />
        <Route path="/error/:msg" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

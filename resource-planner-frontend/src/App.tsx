import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobsDashboardPage from "./pages/JobsDashboardPage/JobsDashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/jobs" element={<JobsDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

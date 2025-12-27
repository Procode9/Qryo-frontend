import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root */}
        <Route
          path="/"
          element={
            isAuthenticated()
              ? <Navigate to="/jobs" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Jobs */}
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:jobId" element={<JobDetail />} />

        {/* Fallback */}
        <Route path="*" element={<div style={{ padding: 24 }}>404 – Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

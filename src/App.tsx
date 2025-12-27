import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";

export default function App() {
  return (
    <div style={{ padding: 40, color: "black" }}>
      <h1>Qryo Frontend is running ✅</h1>
    </div>
  );
}

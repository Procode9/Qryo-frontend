import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "./auth/auth.guard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/jobs"
          element={
            <RequireAuth>
              <Jobs />
            </RequireAuth>
          }
        />

        <Route
          path="/jobs/:id"
          element={
            <RequireAuth>
              <JobDetail />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

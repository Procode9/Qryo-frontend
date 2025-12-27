import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <div className="container">
      <NavBar />

      <div style={{ height: 16 }} />

      <Outlet />

      <div className="footer-note">
        QRYO is building a signal-first deeptech platform. No noise. No vanity metrics.
      </div>
    </div>
  );
}

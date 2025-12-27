import { Link, useLocation } from "react-router-dom";
import { Badge, Button } from "./UI";

function NavLink({ to, label }: { to: string; label: string }) {
  const loc = useLocation();
  const active = loc.pathname === to || (to !== "/" && loc.pathname.startsWith(to));
  return (
    <Link
      to={to}
      style={{
        padding: "10px 10px",
        borderRadius: 12,
        border: active ? "1px solid rgba(110,231,255,.45)" : "1px solid rgba(255,255,255,.10)",
        background: active ? "rgba(110,231,255,.08)" : "rgba(255,255,255,.04)",
        color: active ? "rgba(255,255,255,.92)" : "rgba(255,255,255,.72)",
        fontSize: 13,
      }}
    >
      {label}
    </Link>
  );
}

export default function NavBar() {
  return (
    <div className="glass" style={{ padding: 14, borderRadius: 22 }}>
      <div className="space" style={{ alignItems: "center" }}>
        <div className="row">
          <Link to="/" className="row" style={{ gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 12,
                background: "linear-gradient(90deg, rgba(110,231,255,.9), rgba(167,139,250,.9))",
              }}
            />
            <div className="stack" style={{ gap: 2 }}>
              <div style={{ fontWeight: 900, letterSpacing: "-0.02em" }}>QRYO</div>
              <div className="mono">Deeptech Talent & Signal Platform</div>
            </div>
          </Link>

          <Badge>Phase-1 • Frontend</Badge>
        </div>

        <div className="row" style={{ flexWrap: "wrap" }}>
          <NavLink to="/" label="Jobs" />
          <NavLink to="/login" label="Login" />
          <NavLink to="/register" label="Register" />
          <Button onClick={() => window.open("/docs", "_blank")}>API Docs</Button>
        </div>
      </div>
    </div>
  );
}

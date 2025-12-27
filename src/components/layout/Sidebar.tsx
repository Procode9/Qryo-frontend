import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.logo}>QRYO</h2>

      <nav style={styles.nav}>
        <NavLink to="/dashboard" style={styles.link}>Dashboard</NavLink>
        <NavLink to="/jobs" style={styles.link}>Jobs</NavLink>
        <NavLink to="/analytics" style={styles.link}>Analytics</NavLink>
        <NavLink to="/settings" style={styles.link}>Settings</NavLink>
      </nav>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: 220,
    background: "#0b0f1a",
    color: "#fff",
    padding: "24px",
    minHeight: "100vh",
  },
  logo: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 32,
  },
  nav: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 14,
  },
  link: {
    color: "#9aa4bf",
    textDecoration: "none",
    fontSize: 15,
  },
};

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">QRYO</h2>

      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/new">New Experiment</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
      </nav>
    </aside>
  );
}

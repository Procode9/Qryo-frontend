import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { StatCard } from "../components/ui/StatCard";

export default function Dashboard() {
  return (
    <div style={styles.layout}>
      <Sidebar />

      <div style={styles.main}>
        <Topbar />

        <section style={styles.content}>
          <h1 style={styles.heading}>System Status</h1>

          <div style={styles.grid}>
            <StatCard label="Active Jobs" value="128" />
            <StatCard label="AI Matches" value="2,431" />
            <StatCard label="Avg. Match Score" value="87%" />
            <StatCard label="Latency" value="120ms" />
          </div>
        </section>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    background: "#080b14",
    minHeight: "100vh",
  },
  main: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  heading: {
    color: "#fff",
    marginBottom: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16,
  },
};

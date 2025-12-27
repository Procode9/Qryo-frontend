export default function Topbar() {
  return (
    <header style={styles.topbar}>
      <span style={styles.title}>Platform Overview</span>
      <div style={styles.user}>admin@qryo.ai</div>
    </header>
  );
}

const styles = {
  topbar: {
    height: 56,
    background: "#0f1424",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    color: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
  },
  user: {
    fontSize: 14,
    opacity: 0.8,
  },
};

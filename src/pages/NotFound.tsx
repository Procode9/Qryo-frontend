export default function NotFound() {
  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      color: "#fff"
    }}>
      <h1 style={{ fontSize: "48px", marginBottom: "12px" }}>404</h1>
      <p style={{ opacity: 0.7 }}>Page not found</p>
    </div>
  );
}

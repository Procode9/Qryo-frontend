export function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div style={styles.card}>
      <span style={styles.label}>{label}</span>
      <strong style={styles.value}>{value}</strong>
    </div>
  );
}

const styles = {
  card: {
    background: "#121830",
    borderRadius: 12,
    padding: 20,
    color: "#fff",
  },
  label: {
    fontSize: 13,
    opacity: 0.7,
  },
  value: {
    fontSize: 26,
    marginTop: 8,
    display: "block",
  },
};

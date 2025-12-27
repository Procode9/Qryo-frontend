export default function Dashboard() {
  return (
    <div>
      <h1>System Overview</h1>

      <div className="cards">
        <div className="card">
          <h3>Active Jobs</h3>
          <p>128</p>
        </div>

        <div className="card">
          <h3>AI Matches</h3>
          <p>2,431</p>
        </div>

        <div className="card">
          <h3>Avg. Match Score</h3>
          <p>87%</p>
        </div>
      </div>
    </div>
  );
}

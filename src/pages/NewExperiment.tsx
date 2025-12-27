export default function NewExperiment() {
  return (
    <div>
      <h1>New Experiment</h1>

      <div className="form">
        <label>Input (QASM / JSON)</label>
        <input type="file" />

        <label>Provider</label>
        <select>
          <option value="auto">Auto</option>
          <option value="dwave">D-Wave</option>
          <option value="ibm">IBM</option>
        </select>

        <label>Shots</label>
        <input type="number" defaultValue={1024} />

        <button className="primary">Run Experiment</button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

export default function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    apiFetch("/jobs").then(setJobs);
  }, []);

  return (
    <div>
      <h1>Jobs</h1>
      <ul>
        {jobs.map(j => (
          <li key={j.id}>
            {j.status} – {j.provider}
          </li>
        ))}
      </ul>
    </div>
  );
}

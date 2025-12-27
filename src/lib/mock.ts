import { Job } from "./types";

export const jobs: Job[] = [
  {
    id: "1",
    title: "Founding ML Engineer (BioTech)",
    domain: "BioTech",
    company: "HelixWorks",
    location: "Remote (EU)",
    level: "Founding",
    summary: "Build research-to-product pipelines for frontier bioinformatics.",
    signals: [
      { label: "Research Depth", score: 92 },
      { label: "Open Source", score: 78 },
      { label: "Systems", score: 84 },
    ],
  },
  {
    id: "2",
    title: "AI Research Engineer (Robotics)",
    domain: "Robotics",
    company: "Atlas Motion",
    location: "Berlin",
    level: "Senior",
    summary: "Deploy real-time perception + planning for humanoid manipulation.",
    signals: [
      { label: "Robotics", score: 90 },
      { label: "Real-time", score: 82 },
      { label: "Publications", score: 76 },
    ],
  },
  {
    id: "3",
    title: "Quantum Software Engineer",
    domain: "Quantum",
    company: "QubitForge",
    location: "London",
    level: "Mid",
    summary: "Simulation + compiler tooling for hybrid quantum workflows.",
    signals: [
      { label: "Math", score: 86 },
      { label: "Systems", score: 80 },
      { label: "Tooling", score: 88 },
    ],
  },
];

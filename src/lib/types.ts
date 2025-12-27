export type Job = {
  id: string;
  title: string;
  domain: "AI" | "Robotics" | "BioTech" | "Space" | "Quantum";
  company: string;
  location: string;
  level: "Junior" | "Mid" | "Senior" | "Founding";
  summary: string;
  signals: { label: string; score: number }[];
};

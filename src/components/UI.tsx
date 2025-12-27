import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return <div className="card card-pad">{children}</div>;
}

export function Button({
  children,
  variant = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary";
}) {
  const cls = variant === "primary" ? "btn btn-primary" : "btn";
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="input" {...props} />;
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="badge">{children}</span>;
}

export function Hr() {
  return <hr className="hr" />;
}

import { ReactNode } from "react";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionWrapper({ children, className = "" }: SectionWrapperProps) {
  return (
    <section className={`w-full px-6 py-6 ${className}`}>
      <div className="max-w-4xl mx-auto">{children}</div>
    </section>
  );
}

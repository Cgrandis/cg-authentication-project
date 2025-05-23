import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md border border-gray-200 ${className}`}
    >
      {children}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
}

export const CardContent = ({ children }: CardContentProps) => {
  return <div className="space-y-2">{children}</div>;
};

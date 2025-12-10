import { ReactNode } from 'react';

interface DashboardContentProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showHeading: boolean;
}

export default function DashboardContent({ title, subtitle, showHeading, children }: DashboardContentProps) {
  return (
    <>
      { showHeading && 
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      }
      {children}
    </>
  );
}
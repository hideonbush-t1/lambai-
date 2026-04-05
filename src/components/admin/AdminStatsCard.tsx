import React from 'react';

interface StatsProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

export const AdminStatsCard = ({ label, value, icon, color = "text-primary" }: StatsProps) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-xl bg-gray-50 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);
import React from 'react';

export const StatCard = ({ title, value, icon, trend }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      {trend && <p className="text-xs text-secondary font-bold mt-2">{trend}</p>}
    </div>
    <div className="p-3 bg-primary/10 text-primary rounded-lg">{icon}</div>
  </div>
);
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  detail?: string;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, icon, detail, color = 'from-blue-500 to-blue-600' }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all hover:scale-105 hover:shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <div className={`p-2 bg-gradient-to-r ${color} rounded-lg`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className={`text-sm ${trend.startsWith('+') ? 'text-green-600' : trend.startsWith('-') ? 'text-red-600' : 'text-gray-500'}`}>
            {trend}
          </p>
        </div>
        {detail && (
          <p className="text-sm text-gray-500">{detail}</p>
        )}
      </div>
    </div>
  );
}

export default MetricCard;
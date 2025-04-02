import React from 'react';
import { Alert } from '../types';

const AlertsList: React.FC = () => {
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'warning',
      message: 'High temperature detected in Zone A',
      timestamp: '2024-03-15T10:30:00Z'
    },
    {
      id: '2',
      type: 'danger',
      message: 'Critical air quality levels in Zone B',
      timestamp: '2024-03-15T09:45:00Z'
    },
    {
      id: '3',
      type: 'info',
      message: 'Weather pattern change predicted',
      timestamp: '2024-03-15T08:15:00Z'
    }
  ];

  return (
    <div className="space-y-4">
      {alerts.map(alert => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg ${
            alert.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-400' :
            alert.type === 'danger' ? 'bg-red-50 border-l-4 border-red-400' :
            'bg-blue-50 border-l-4 border-blue-400'
          }`}
        >
          <p className="text-sm font-medium text-gray-800">{alert.message}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(alert.timestamp).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AlertsList;
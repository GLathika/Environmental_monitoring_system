import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface ChartProps {
  type: 'temperature' | 'airQuality';
}

const Chart: React.FC<ChartProps> = ({ type }) => {
  // Generate sample data for the last 24 hours
  const generateData = () => {
    const data = [];
    for (let i = 0; i < 24; i++) {
      const date = new Date();
      date.setHours(date.getHours() - i);
      
      if (type === 'temperature') {
        data.unshift({
          time: date,
          value: 20 + Math.random() * 10,
          feel: 19 + Math.random() * 10,
        });
      } else {
        data.unshift({
          time: date,
          aqi: 30 + Math.random() * 50,
          particles: 20 + Math.random() * 40,
        });
      }
    }
    return data;
  };

  const data = generateData();

  if (type === 'temperature') {
    return (
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="time"
              tickFormatter={(time) => format(time, 'HH:mm')}
              stroke="#6b7280"
            />
            <YAxis stroke="#6b7280" />
            <Tooltip
              labelFormatter={(label) => format(label, 'HH:mm')}
              contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="Temperature"
            />
            <Line
              type="monotone"
              dataKey="feel"
              stroke="#93c5fd"
              strokeWidth={2}
              dot={false}
              name="Feels Like"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="time"
            tickFormatter={(time) => format(time, 'HH:mm')}
            stroke="#6b7280"
          />
          <YAxis stroke="#6b7280" />
          <Tooltip
            labelFormatter={(label) => format(label, 'HH:mm')}
            contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          />
          <Area
            type="monotone"
            dataKey="aqi"
            stackId="1"
            stroke="#10b981"
            fill="#d1fae5"
            name="Air Quality Index"
          />
          <Area
            type="monotone"
            dataKey="particles"
            stackId="1"
            stroke="#6ee7b7"
            fill="#ecfdf5"
            name="Particle Concentration"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
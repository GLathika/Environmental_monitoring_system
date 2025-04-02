import React from 'react';
import { Prediction } from '../types';
import { TrendingUp, TrendingDown, Minus, Brain } from 'lucide-react';

const PredictionPanel: React.FC = () => {
  const predictions: Prediction[] = [
    {
      metric: 'Temperature',
      value: 26,
      confidence: 85,
      trend: 'increasing'
    },
    {
      metric: 'Air Quality',
      value: 45,
      confidence: 92,
      trend: 'decreasing'
    },
    {
      metric: 'Humidity',
      value: 60,
      confidence: 78,
      trend: 'stable'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-5 h-5 text-purple-500" />
        <h2 className="text-xl font-semibold">AI Predictions</h2>
      </div>
      <div className="space-y-6">
        {predictions.map(prediction => (
          <div key={prediction.metric} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-800">{prediction.metric}</h3>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{prediction.value}</span>
                {prediction.trend === 'increasing' && <TrendingUp className="w-5 h-5 text-red-500" />}
                {prediction.trend === 'decreasing' && <TrendingDown className="w-5 h-5 text-green-500" />}
                {prediction.trend === 'stable' && <Minus className="w-5 h-5 text-gray-500" />}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${prediction.confidence}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">Confidence: {prediction.confidence}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PredictionPanel;
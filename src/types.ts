export interface EnvironmentalData {
  temperature: number;
  humidity: number;
  airQuality: number;
  uvIndex: number;
  windSpeed: number;
  rainfall: number;
  timestamp: string;
}

export interface Prediction {
  metric: string;
  value: number;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'info';
  message: string;
  timestamp: string;
}
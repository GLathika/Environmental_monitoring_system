import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, Activity, Wind, Droplets, Sun, AlertTriangle, MapPin, Cloud, Thermometer, Search, ChevronDown } from 'lucide-react';
import MetricCard from './MetricCard';
import Chart from './Chart';
import AlertsList from './AlertsList';
import PredictionPanel from './PredictionPanel';
import WeatherMap from './WeatherMap';

interface Location {
  id: string;
  name: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const Dashboard: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<Location>({
    id: 'sf',
    name: 'San Francisco',
    country: 'USA',
    coordinates: { lat: 37.7749, lng: -122.4194 }
  });
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const locations: Location[] = [
    {
      id: 'sf',
      name: 'San Francisco',
      country: 'USA',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    {
      id: 'ny',
      name: 'New York',
      country: 'USA',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 'ld',
      name: 'London',
      country: 'UK',
      coordinates: { lat: 51.5074, lng: -0.1278 }
    },
    {
      id: 'tk',
      name: 'Tokyo',
      country: 'Japan',
      coordinates: { lat: 35.6762, lng: 139.6503 }
    },
    {
      id: 'sg',
      name: 'Singapore',
      country: 'Singapore',
      coordinates: { lat: 1.3521, lng: 103.8198 }
    }
  ];

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
                <Cloud className="w-8 h-8 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Environmental Monitor
                </h1>
                <div className="relative">
                  <button
                    onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                    className="flex items-center text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    {currentLocation.name}, {currentLocation.country}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  
                  {isLocationDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                      <div className="px-3 pb-2">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search locations..."
                            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {filteredLocations.map((location) => (
                          <button
                            key={location.id}
                            className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${
                              currentLocation.id === location.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                            }`}
                            onClick={() => {
                              setCurrentLocation(location);
                              setIsLocationDropdownOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <div className="font-medium">{location.name}</div>
                            <div className="text-xs text-gray-500">{location.country}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Last Updated</p>
                <p className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Temperature"
            value="24°C"
            trend="+2°C"
            icon={<Thermometer className="w-6 h-6 text-orange-500" />}
            detail="Feels like 26°C"
            color="from-orange-500 to-red-500"
          />
          <MetricCard
            title="Humidity"
            value="65%"
            trend="-5%"
            icon={<Droplets className="w-6 h-6 text-blue-500" />}
            detail="Optimal range"
            color="from-blue-500 to-cyan-500"
          />
          <MetricCard
            title="Air Quality"
            value="Good"
            trend="Stable"
            icon={<Activity className="w-6 h-6 text-green-500" />}
            detail="AQI: 45"
            color="from-green-500 to-emerald-500"
          />
          <MetricCard
            title="Wind Speed"
            value="12 km/h"
            trend="+3 km/h"
            icon={<Wind className="w-6 h-6 text-purple-500" />}
            detail="NW Direction"
            color="from-purple-500 to-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <LineChart className="w-5 h-5 text-blue-500" />
                Temperature Trends
              </h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full">24h</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-full">7d</button>
              </div>
            </div>
            <Chart type="temperature" />
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Recent Alerts
            </h2>
            <AlertsList />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BarChart className="w-5 h-5 text-green-500" />
                Air Quality Index
              </h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full">Real-time</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-full">History</button>
              </div>
            </div>
            <Chart type="airQuality" />
          </div>
          <div>
            <PredictionPanel />
          </div>
        </div>

        <div className="mt-8">
          <WeatherMap currentLocation={currentLocation} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
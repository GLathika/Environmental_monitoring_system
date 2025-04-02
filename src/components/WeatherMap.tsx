import React, { useState } from 'react';
import { MapPin, AlertTriangle, Leaf, Factory, Droplets, Wind } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface Zone {
  id: string;
  name: string;
  status: 'good' | 'warning' | 'critical';
  coordinates: { x: number; y: number };
  type: 'industrial' | 'residential' | 'forest' | 'water';
  metrics: {
    aqi: number;
    temperature: number;
    humidity: number;
  };
}

interface WeatherMapProps {
  currentLocation: Location;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ currentLocation }) => {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  
  // Generate zones based on the current location
  const zones: Zone[] = [
    {
      id: `${currentLocation.id}-1`,
      name: `${currentLocation.name} Industrial District`,
      status: 'warning',
      coordinates: { x: 30, y: 30 },
      type: 'industrial',
      metrics: { aqi: 125, temperature: 27, humidity: 45 }
    },
    {
      id: `${currentLocation.id}-2`,
      name: `${currentLocation.name} Central Park`,
      status: 'good',
      coordinates: { x: 60, y: 40 },
      type: 'forest',
      metrics: { aqi: 42, temperature: 24, humidity: 65 }
    },
    {
      id: `${currentLocation.id}-3`,
      name: `${currentLocation.name} Residential Area`,
      status: 'good',
      coordinates: { x: 70, y: 70 },
      type: 'residential',
      metrics: { aqi: 55, temperature: 25, humidity: 58 }
    },
    {
      id: `${currentLocation.id}-4`,
      name: `${currentLocation.name} Waterfront`,
      status: 'critical',
      coordinates: { x: 20, y: 60 },
      type: 'water',
      metrics: { aqi: 155, temperature: 23, humidity: 75 }
    }
  ];

  const getZoneIcon = (type: Zone['type']) => {
    switch (type) {
      case 'industrial':
        return <Factory className="w-6 h-6" />;
      case 'forest':
        return <Leaf className="w-6 h-6" />;
      case 'water':
        return <Droplets className="w-6 h-6" />;
      case 'residential':
        return <MapPin className="w-6 h-6" />;
      default:
        return <MapPin className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: Zone['status']) => {
    switch (status) {
      case 'good':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleZoneClick = (zone: Zone) => {
    setSelectedZone(prev => prev?.id === zone.id ? null : zone);
  };

  // Reset selected zone when location changes
  React.useEffect(() => {
    setSelectedZone(null);
  }, [currentLocation]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          {currentLocation.name} Environmental Monitoring Zones
        </h2>
        <div className="flex gap-2 text-sm">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            Good
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            Warning
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            Critical
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden border-2 border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80"
              alt="City Map"
              className="w-full h-full object-cover opacity-30"
            />
            {zones.map((zone) => (
              <button
                key={zone.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full 
                  ${getStatusColor(zone.status)} text-white hover:scale-110 transition-transform cursor-pointer
                  ${selectedZone?.id === zone.id ? 'ring-4 ring-blue-300 scale-110' : ''}`}
                style={{ left: `${zone.coordinates.x}%`, top: `${zone.coordinates.y}%` }}
                onClick={() => handleZoneClick(zone)}
                title={zone.name}
              >
                {getZoneIcon(zone.type)}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          {selectedZone ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{selectedZone.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedZone.status === 'good' ? 'bg-green-100 text-green-700' :
                  selectedZone.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {selectedZone.status.charAt(0).toUpperCase() + selectedZone.status.slice(1)}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <span className="text-gray-600">Air Quality Index</span>
                  <span className="font-semibold">{selectedZone.metrics.aqi}</span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <span className="text-gray-600">Temperature</span>
                  <span className="font-semibold">{selectedZone.metrics.temperature}°C</span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <span className="text-gray-600">Humidity</span>
                  <span className="font-semibold">{selectedZone.metrics.humidity}%</span>
                </div>
              </div>
              {selectedZone.status !== 'good' && (
                <div className="flex items-start gap-2 bg-orange-50 p-3 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-orange-700">
                    This zone requires attention. Consider implementing mitigation measures to improve environmental conditions.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 min-h-[200px]">
              <p>Click on any zone marker to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;
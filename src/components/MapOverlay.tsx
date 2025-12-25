import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Terminal } from '../types';
import { useBusStore } from '../store/useBusStore';
import { X, Navigation } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet markers in React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Bus Icon
const busIcon = new L.DivIcon({
    className: 'bus-marker-icon',
    html: `<div style="background-color: #EF4444; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
});

interface MapOverlayProps {
    terminal: Terminal;
    onClose: () => void;
}

// Component to recurse map view when selected terminal changes
const MapUpdater: React.FC<{ terminal: Terminal }> = ({ terminal }) => {
    const map = useMap();
    useEffect(() => {
        map.setView([terminal.centerLat, terminal.centerLng], 14);
    }, [terminal, map]);
    return null;
};

export const MapOverlay: React.FC<MapOverlayProps> = ({ terminal, onClose }) => {
    const { buses, fetchBuses, clearSelection } = useBusStore();

    useEffect(() => {
        fetchBuses(terminal.id);
        const interval = setInterval(() => fetchBuses(terminal.id), 3000); // Polling fallback if simulation needs trigger
        return () => {
            clearInterval(interval);
            clearSelection();
        }
    }, [terminal]);

    // Generate Mock Route
    const getMockRoute = (index: number) => {
        const angle = (index * 60) * (Math.PI / 180);
        const endLat = terminal.centerLat + Math.sin(angle) * 0.03;
        const endLng = terminal.centerLng + Math.cos(angle) * 0.03;
        return [
            [terminal.centerLat, terminal.centerLng],
            [terminal.centerLat + (endLat - terminal.centerLat) * 0.5 + 0.005, terminal.centerLng + (endLng - terminal.centerLng) * 0.5 - 0.005],
            [endLat, endLng]
        ] as [number, number][];
    };

    return (
        <div className="map-overlay">
            <button className="close-btn" onClick={onClose}>
                <X size={24} />
            </button>

            <div className="map-info-card">
                <h3>{terminal.nameAr}</h3>
                <span className="bus-count">{buses.length} حافلات نشطة</span>
            </div>

            <MapContainer
                center={[terminal.centerLat, terminal.centerLng]}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapUpdater terminal={terminal} />

                {/* Terminal Marker */}
                <Marker position={[terminal.centerLat, terminal.centerLng]}>
                    <Popup>{terminal.nameAr}</Popup>
                </Marker>

                {/* Bus Markers */}
                {buses.map(bus => (
                    <Marker
                        key={bus.id}
                        position={[bus.lat, bus.lng]}
                        icon={busIcon}
                    >
                        <Popup>
                            Bus: {bus.plateNumber}<br />
                            Speed: {bus.speed} km/h
                        </Popup>
                    </Marker>
                ))}

                {/* Routes */}
                {terminal.routes.map((r, i) => (
                    <Polyline
                        key={r}
                        positions={getMockRoute(i)}
                        pathOptions={{ color: i % 2 === 0 ? '#3B82F6' : '#10B981', weight: 4 }}
                    />
                ))}

            </MapContainer>
        </div>
    );
};

import { Bus } from '../types';

const SIMULATION_INTERVAL = 3000;

// Mock Data Configuration & Simulation Logic
class BusService {
    private subscribers: Record<string, ((buses: Bus[]) => void)[]> = {};
    private intervals: Record<string, NodeJS.Timeout> = {};
    private mockBuses: Record<string, Bus[]> = {};

    constructor() {
        this.initMockBuses();
    }

    private initMockBuses() {
        const baseCoords: Record<string, { lat: number; lng: number }> = {
            amman_terminal: { lat: 31.927, lng: 35.924 },
            raghadan_terminal: { lat: 31.954, lng: 35.946 },
            sareeh: { lat: 32.535, lng: 35.867 },
            shamali_terminal: { lat: 32.556, lng: 35.850 },
            irbid: { lat: 32.550, lng: 35.850 },
            zarqa: { lat: 32.060, lng: 36.080 },
            salt: { lat: 32.039, lng: 35.727 },
            ghour: { lat: 31.800, lng: 35.600 },
        };

        const TERMINAL_IDS = Object.keys(baseCoords);

        TERMINAL_IDS.forEach(id => {
            const center = baseCoords[id] || { lat: 31.95, lng: 35.93 };
            this.mockBuses[id] = Array.from({ length: 4 }).map((_, i) => ({
                id: `${id}-bus-${i}`,
                plateNumber: `${10 + i}-${1000 + i}`,
                terminalId: id,
                lat: center.lat + (Math.random() * 0.01 - 0.005),
                lng: center.lng + (Math.random() * 0.01 - 0.005),
                speed: 0,
                heading: 0,
                updatedAt: new Date().toISOString(),
                online: Math.random() > 0.2,
            }));
        });
    }

    async getBuses(terminalId: string): Promise<Bus[]> {
        await new Promise(resolve => setTimeout(resolve, 500));
        return this.mockBuses[terminalId] || [];
    }

    subscribeToBusUpdates(terminalId: string, callback: (buses: Bus[]) => void): () => void {
        if (!this.subscribers[terminalId]) {
            this.subscribers[terminalId] = [];
        }
        this.subscribers[terminalId].push(callback);

        callback(this.mockBuses[terminalId] || []);

        if (!this.intervals[terminalId]) {
            this.startSimulation(terminalId);
        }

        return () => {
            this.subscribers[terminalId] = this.subscribers[terminalId].filter(cb => cb !== callback);
            if (this.subscribers[terminalId].length === 0) {
                clearInterval(this.intervals[terminalId]);
                delete this.intervals[terminalId];
            }
        };
    }

    private startSimulation(terminalId: string) {
        this.intervals[terminalId] = setInterval(() => {
            if (!this.mockBuses[terminalId]) return;

            const updatedBuses = this.mockBuses[terminalId].map(bus => {
                if (!bus.online) return bus;

                const moveStep = 0.001;
                const newLat = bus.lat + (Math.random() - 0.5) * moveStep;
                const newLng = bus.lng + (Math.random() - 0.5) * moveStep;

                return {
                    ...bus,
                    lat: newLat,
                    lng: newLng,
                    speed: Math.floor(Math.random() * 60),
                    heading: Math.floor(Math.random() * 360),
                    updatedAt: new Date().toISOString(),
                };
            });

            this.mockBuses[terminalId] = updatedBuses;

            const handlers = this.subscribers[terminalId];
            if (handlers) {
                handlers.forEach(cb => cb(updatedBuses));
            }
        }, SIMULATION_INTERVAL);
    }
}

export const busService = new BusService();

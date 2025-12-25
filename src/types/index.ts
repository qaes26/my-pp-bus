export interface Terminal {
    id: string;
    nameAr: string;
    routes: number[]; // e.g., [15, 22, 51]
    centerLat: number;
    centerLng: number;
}

export interface Bus {
    id: string;
    plateNumber: string;
    terminalId: string;
    lat: number;
    lng: number;
    speed: number;
    heading: number; // 0-360
    updatedAt: string; // ISO date string
    online: boolean;
}

export interface BusLocationUpdate {
    busId: string;
    lat: number;
    lng: number;
    speed: number;
    heading: number;
}

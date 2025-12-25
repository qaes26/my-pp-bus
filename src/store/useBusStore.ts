import { create } from 'zustand';
import { Bus, Terminal } from '../types';
import { busService } from '../services/BusService';

interface BusState {
    selectedTerminal: Terminal | null;
    buses: Bus[];
    isLoading: boolean;
    error: string | null;

    setSelectedTerminal: (terminal: Terminal | null) => void;
    fetchBuses: (terminalId: string) => Promise<void>;
    updateBuses: (buses: Bus[]) => void;
}

export const useBusStore = create<BusState>((set, get) => ({
    selectedTerminal: null,
    buses: [],
    isLoading: false,
    error: null,

    setSelectedTerminal: (terminal) => {
        set({ selectedTerminal: terminal, buses: [] });
        if (terminal) {
            get().fetchBuses(terminal.id);
        }
    },

    fetchBuses: async (terminalId) => {
        set({ isLoading: true, error: null });
        try {
            const buses = await busService.getBuses(terminalId);
            set({ buses, isLoading: false });
        } catch (err) {
            set({ error: 'Failed to fetch buses', isLoading: false });
        }
    },

    updateBuses: (newBuses) => {
        set({ buses: newBuses });
    }
}));

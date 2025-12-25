import type { Terminal } from '../types';
import { Bus, MapPin } from 'lucide-react';

interface TerminalCardProps {
    terminal: Terminal;
    onViewMap: (terminal: Terminal) => void;
}

export const TerminalCard: React.FC<TerminalCardProps> = ({ terminal, onViewMap }) => {
    return (
        <div className="terminal-card">
            <div className="card-header">
                <div className="icon-container">
                    <Bus color="#fff" size={20} />
                </div>
                <h3>{terminal.nameAr}</h3>
            </div>

            <div className="card-body">
                <span className="label">الخطوط المتوفرة:</span>
                <div className="routes">
                    {terminal.routes.join(' - ')}
                </div>

                <div className="status-badge">
                    <span className="status-dot"></span>
                    <span>Live</span>
                </div>
            </div>

            <button className="view-map-btn" onClick={() => onViewMap(terminal)}>
                <MapPin size={16} />
                <span>الخريطة</span>
            </button>
        </div>
    );
};

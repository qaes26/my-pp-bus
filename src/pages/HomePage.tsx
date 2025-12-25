import { TerminalCard } from '../components/TerminalCard';
import { TERMINALS } from '../constants/Terminals';
import { useBusStore } from '../store/useBusStore';

export const HomePage: React.FC = () => {
    const setSelectedTerminal = useBusStore(state => state.setSelectedTerminal);

    return (
        <div className="home-page">
            <header className="app-header">
                <h1 className="app-title">BusTracker JO</h1>
            </header>

            <main className="terminal-grid">
                {TERMINALS.map(terminal => (
                    <TerminalCard
                        key={terminal.id}
                        terminal={terminal}
                        onViewMap={setSelectedTerminal}
                    />
                ))}
            </main>
        </div>
    );
};

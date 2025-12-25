import { TerminalCard } from '../components/TerminalCard';
import { TERMINALS } from '../constants/Terminals';
import { useBusStore } from '../store/useBusStore';

export const HomePage: React.FC = () => {
    const setSelectedTerminal = useBusStore(state => state.setSelectedTerminal);

    return (
        <div className="home-page">
            <header className="app-header">
                <div className="header-content">
                    <img src="./assets/logo.png" alt="University Logo" className="app-logo" />
                    <div className="title-container">
                        <h1 className="app-title">BUS TRACKER INU</h1>
                        <p className="developer-credit">من تطوير الطالب : قيس طلال الجازي</p>
                    </div>
                </div>
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

import { HomePage } from './pages/HomePage';
import { MapOverlay } from './components/MapOverlay';
import { useBusStore } from './store/useBusStore';
import './index.css';

function App() {
  const { selectedTerminal, setSelectedTerminal } = useBusStore();

  return (
    <div className="app-container">
      <HomePage />

      {selectedTerminal && (
        <MapOverlay
          terminal={selectedTerminal}
          onClose={() => setSelectedTerminal(null)}
        />
      )}
    </div>
  );
}

export default App;

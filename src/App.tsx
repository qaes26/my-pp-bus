import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { MapOverlay } from './components/MapOverlay';
import { useBusStore } from './store/useBusStore';
import { useAuthStore } from './store/useAuthStore';
import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Main App Content (Dashboard)
const Dashboard = () => {
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
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

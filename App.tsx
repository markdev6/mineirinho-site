import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { EmptySite } from './components/EmptySite';
import { APP_CONFIG } from './constants';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Timer para a tela de splash
    const timer = setTimeout(() => {
      setLoading(false);
    }, APP_CONFIG.LOADING_DURATION_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-500/30">
      {loading ? (
        <LoadingScreen key="loading-screen" />
      ) : (
        <EmptySite key="main-site" />
      )}
    </div>
  );
};

export default App;
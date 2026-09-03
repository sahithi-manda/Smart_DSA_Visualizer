import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { SearchModal } from './components/layout/SearchModal';
import { Dashboard } from './pages/Dashboard';
import { VisualizerPage } from './pages/VisualizerPage';
import { ComparisonPage } from './pages/ComparisonPage';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'visualizer' | 'compare'>('dashboard');
  const [activeAlgorithmId, setActiveAlgorithmId] = useState<string>('bubble-sort');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSelectAlgorithm = (algorithmId: string) => {
    setActiveAlgorithmId(algorithmId);
    setCurrentView('visualizer');
  };

  const handleNavigate = (view: string) => {
    if (view === 'dashboard') {
      setCurrentView('dashboard');
    } else if (view === 'compare') {
      setCurrentView('compare');
    } else if (view === 'quick-start') {
      handleSelectAlgorithm('bubble-sort');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Main App Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeAlgorithmId={currentView === 'visualizer' ? activeAlgorithmId : null}
          onSelectAlgorithm={handleSelectAlgorithm}
        />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {currentView === 'dashboard' && (
              <Dashboard
                onSelectAlgorithm={handleSelectAlgorithm}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'visualizer' && (
              <VisualizerPage
                algorithmId={activeAlgorithmId}
                onSelectAlgorithm={handleSelectAlgorithm}
              />
            )}

            {currentView === 'compare' && <ComparisonPage />}
          </div>
        </main>
      </div>

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAlgorithm={handleSelectAlgorithm}
      />
    </div>
  );
}

export default App;

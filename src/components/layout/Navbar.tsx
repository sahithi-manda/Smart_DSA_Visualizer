import React from 'react';
import { Cpu, GitCompare, LayoutDashboard, Sparkles, Search } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onSearchClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur-md px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Brand */}
        <div
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight group-hover:text-blue-400 transition-colors">
                Smart DSA Visualizer
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                PRO
              </span>
            </div>
            <p className="text-xs text-gray-400 hidden sm:block">Step-by-step algorithm engine</p>
          </div>
        </div>

        {/* Quick Search */}
        <button
          onClick={onSearchClick}
          className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 text-xs hover:border-gray-700 hover:text-gray-200 transition-all w-64"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Quick search algorithms...</span>
          <kbd className="ml-auto px-1.5 py-0.5 rounded bg-gray-800 text-[10px] text-gray-400 border border-gray-700">
            Ctrl+K
          </kbd>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant={currentView === 'dashboard' ? 'primary' : 'ghost'}
            size="sm"
            icon={<LayoutDashboard className="w-4 h-4" />}
            onClick={() => onNavigate('dashboard')}
          >
            Dashboard
          </Button>

          <Button
            variant={currentView === 'compare' ? 'primary' : 'ghost'}
            size="sm"
            icon={<GitCompare className="w-4 h-4" />}
            onClick={() => onNavigate('compare')}
          >
            Compare
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={<Sparkles className="w-4 h-4 text-cyan-400" />}
            onClick={() => onNavigate('quick-start')}
          >
            Quick Start
          </Button>
        </div>
      </div>
    </header>
  );
};

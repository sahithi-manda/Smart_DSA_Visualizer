import React, { useState } from 'react';
import {
  ArrowDownUp,
  Search,
  Layers,
  Network,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ALGORITHMS, CATEGORIES } from '../../data/algorithmsData';
import type { CategoryId } from '../../types/algorithm';

interface SidebarProps {
  activeAlgorithmId: string | null;
  onSelectAlgorithm: (algorithmId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeAlgorithmId, onSelectAlgorithm }) => {
  const [collapsedCategories, setCollapsedCategories] = useState<Record<CategoryId, boolean>>({
    sorting: false,
    searching: false,
    dataStructures: false,
    graphs: false,
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'ArrowDownUp':
        return <ArrowDownUp className="w-4 h-4 text-blue-400" />;
      case 'Search':
        return <Search className="w-4 h-4 text-cyan-400" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-emerald-400" />;
      case 'Network':
        return <Network className="w-4 h-4 text-purple-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-gray-400" />;
    }
  };

  const toggleCategory = (catId: CategoryId) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  return (
    <aside className="w-64 shrink-0 bg-gray-950/60 border-r border-gray-800 p-4 flex flex-col gap-6 overflow-y-auto h-[calc(100vh-61px)]">
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 px-2">
          Categories
        </h3>

        {CATEGORIES.map((category) => {
          const isCollapsed = collapsedCategories[category.id];
          const categoryAlgorithms = ALGORITHMS.filter((a) => a.category === category.id);

          return (
            <div key={category.id} className="space-y-1">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-gray-900 text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  {getCategoryIcon(category.iconName)}
                  <span className="text-sm font-semibold text-gray-200 group-hover:text-white">
                    {category.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-900 px-1.5 py-0.5 rounded border border-gray-800">
                    {categoryAlgorithms.length}
                  </span>
                  {isCollapsed ? (
                    <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  )}
                </div>
              </button>

              {!isCollapsed && (
                <div className="pl-4 space-y-0.5 border-l border-gray-800/80 ml-4 my-1">
                  {categoryAlgorithms.map((algo) => {
                    const isActive = activeAlgorithmId === algo.id;
                    return (
                      <button
                        key={algo.id}
                        onClick={() => onSelectAlgorithm(algo.id)}
                        className={`w-full text-left px-3 py-1.5 text-xs rounded-md font-medium transition-all flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold shadow-sm'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900/60'
                        }`}
                      >
                        <span className="truncate">{algo.name}</span>
                        <span
                          className={`text-[9px] px-1 py-0.2 rounded border ${
                            algo.difficulty === 'Easy'
                              ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
                              : algo.difficulty === 'Medium'
                              ? 'text-amber-400 border-amber-500/20 bg-amber-500/10'
                              : 'text-rose-400 border-rose-500/20 bg-rose-500/10'
                          }`}
                        >
                          {algo.difficulty}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-800/80">
        <div className="rounded-lg p-3 bg-gradient-to-br from-blue-950/40 to-cyan-950/20 border border-blue-900/30 text-xs text-gray-400 space-y-1.5">
          <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Engine</span>
          </div>
          <p className="text-[11px] leading-relaxed text-gray-400">
            Step through code lines, watch animated states, and inspect complexity metrics in real time.
          </p>
        </div>
      </div>
    </aside>
  );
};

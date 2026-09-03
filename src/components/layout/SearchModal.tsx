import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { ALGORITHMS } from '../../data/algorithmsData';
import { Badge } from '../ui/Badge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAlgorithm: (algorithmId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectAlgorithm }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by parent if handled, or toggle state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredAlgorithms = ALGORITHMS.filter(
    (algo) =>
      algo.name.toLowerCase().includes(query.toLowerCase()) ||
      algo.category.toLowerCase().includes(query.toLowerCase()) ||
      algo.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search input header */}
        <div className="flex items-center px-4 py-3 border-b border-gray-800 gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search algorithms, data structures..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-gray-800/40">
          {filteredAlgorithms.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              No matching algorithms found for "{query}"
            </div>
          ) : (
            filteredAlgorithms.map((algo) => (
              <button
                key={algo.id}
                onClick={() => {
                  onSelectAlgorithm(algo.id);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-gray-800/60 flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {algo.name}
                    </span>
                    <Badge variant="gray">{algo.category}</Badge>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1">{algo.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

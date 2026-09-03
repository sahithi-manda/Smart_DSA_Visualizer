import React from 'react';
import { Activity, ArrowLeftRight, Eye, Gauge } from 'lucide-react';
import type { StepStats } from '../../types/algorithm';

interface StatsPanelProps {
  stats?: StepStats;
  currentStepIndex: number;
  totalSteps: number;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats, currentStepIndex, totalSteps }) => {
  const comparisons = stats?.comparisons ?? 0;
  const swaps = stats?.swaps ?? 0;
  const accesses = stats?.accesses ?? 0;
  const progressPercent = totalSteps > 1 ? Math.round((currentStepIndex / (totalSteps - 1)) * 100) : 0;

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-4 space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400" />
          <span>Execution Stats</span>
        </h3>
        <span className="text-xs font-mono font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
          {progressPercent}% Complete
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-950 h-2 rounded-full overflow-hidden border border-gray-800">
        <div
          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-200"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        {/* Comparisons */}
        <div className="p-3 rounded-xl bg-gray-950/80 border border-gray-800 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-medium">
            <Gauge className="w-3.5 h-3.5" />
            <span>Comparisons</span>
          </div>
          <p className="text-lg font-mono font-bold text-white">{comparisons}</p>
        </div>

        {/* Swaps */}
        <div className="p-3 rounded-xl bg-gray-950/80 border border-gray-800 space-y-1">
          <div className="flex items-center gap-1.5 text-rose-400 text-xs font-medium">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Swaps</span>
          </div>
          <p className="text-lg font-mono font-bold text-white">{swaps}</p>
        </div>

        {/* Array Accesses */}
        <div className="p-3 rounded-xl bg-gray-950/80 border border-gray-800 space-y-1">
          <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-medium">
            <Eye className="w-3.5 h-3.5" />
            <span>Accesses</span>
          </div>
          <p className="text-lg font-mono font-bold text-white">{accesses}</p>
        </div>
      </div>
    </div>
  );
};

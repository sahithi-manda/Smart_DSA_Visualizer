import React from 'react';
import { motion } from 'framer-motion';
import type { AlgorithmStep } from '../../types/algorithm';

interface ArrayVisualizerProps {
  currentStep: AlgorithmStep<number[]> | null;
  inputArray: number[];
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ currentStep, inputArray }) => {
  const array = currentStep?.snapshot || inputArray;
  const maxValue = Math.max(...array, 100);

  const isHighlighted = (index: number) => currentStep?.highlightIndices?.includes(index);
  const isSecondary = (index: number) => currentStep?.secondaryIndices?.includes(index);
  const isPivot = (index: number) => currentStep?.pivotIndex === index;
  const isSorted = (index: number) => currentStep?.sortedIndices?.includes(index);

  const getBarColor = (index: number) => {
    if (isPivot(index)) return 'bg-purple-500 border-purple-400 text-purple-200 shadow-purple-500/30';
    if (currentStep?.type === 'SWAP' && isHighlighted(index)) return 'bg-rose-500 border-rose-400 text-rose-200 shadow-rose-500/30';
    if (currentStep?.type === 'COMPARE' && (isHighlighted(index) || isSecondary(index))) return 'bg-amber-500 border-amber-400 text-amber-200 shadow-amber-500/30';
    if (isHighlighted(index)) return 'bg-cyan-500 border-cyan-400 text-cyan-200 shadow-cyan-500/30';
    if (isSorted(index)) return 'bg-emerald-500 border-emerald-400 text-emerald-200 shadow-emerald-500/30';
    return 'bg-blue-600/90 border-blue-500/60 text-blue-100 shadow-blue-600/10';
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 flex flex-col justify-end min-h-[360px] relative overflow-hidden shadow-2xl">
      {/* Legend Header */}
      <div className="absolute top-4 left-6 right-6 flex flex-wrap items-center justify-between gap-4 text-[11px] font-semibold text-gray-400 border-b border-gray-900 pb-3">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>Unsorted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Swapping</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span>Pivot</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Sorted</span>
          </div>
        </div>
        <span className="font-mono text-gray-500">{array.length} bars</span>
      </div>

      {/* Array Bars Container */}
      <div className="flex items-end justify-center gap-1.5 sm:gap-2 h-64 pt-12 pb-6 w-full">
        {array.map((value, idx) => {
          const heightPercent = Math.max(12, (value / maxValue) * 100);
          const colorClass = getBarColor(idx);

          return (
            <div key={idx} className="flex-1 flex flex-col items-center max-w-[48px] h-full justify-end group">
              {/* Top value indicator */}
              <span className={`text-[10px] font-mono font-bold mb-1 transition-colors ${
                isHighlighted(idx) || isPivot(idx) ? 'text-white' : 'text-gray-400'
              }`}>
                {value}
              </span>

              {/* Animated Bar */}
              <motion.div
                layout
                initial={{ height: 0 }}
                animate={{ height: `${heightPercent}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`w-full rounded-t-lg border-t border-x shadow-lg transition-colors duration-200 relative flex items-center justify-center ${colorClass}`}
              >
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-t-lg pointer-events-none" />
              </motion.div>

              {/* Index label */}
              <span className="text-[9px] font-mono text-gray-600 mt-1">
                [{idx}]
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AlgorithmStep } from '../../types/algorithm';
import type { StackState } from '../../algorithms/dataStructures/stack';

interface StackVisualizerProps {
  currentStep: AlgorithmStep<StackState> | null;
}

export const StackVisualizer: React.FC<StackVisualizerProps> = ({ currentStep }) => {
  const stackState = currentStep?.snapshot || { items: [10, 20, 30], topPointer: 2 };
  const items = stackState.items;

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden shadow-2xl">
      <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">
        Stack Container (LIFO)
      </h4>

      <div className="w-56 border-x-4 border-b-4 border-gray-700 bg-gray-900/50 rounded-b-2xl p-3 flex flex-col-reverse items-center min-h-[220px] gap-2 shadow-inner">
        <AnimatePresence initial={false}>
          {items.map((val, idx) => {
            const isTop = idx === items.length - 1;
            const isHighlighted = currentStep?.highlightIndices?.includes(idx);

            return (
              <motion.div
                key={`${idx}-${val}`}
                initial={{ opacity: 0, y: -40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`w-full py-3 px-4 rounded-xl border flex items-center justify-between font-mono font-bold text-sm shadow-md transition-colors ${
                  isTop
                    ? 'bg-blue-600 border-blue-400 text-white shadow-blue-500/30'
                    : isHighlighted
                    ? 'bg-amber-500 border-amber-400 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-200'
                }`}
              >
                <span>{val}</span>
                {isTop && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-900/80 text-blue-200 border border-blue-400/40">
                    ← TOP
                  </span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="text-xs text-gray-600 font-mono py-12">Stack is Empty</div>
        )}
      </div>
    </div>
  );
};

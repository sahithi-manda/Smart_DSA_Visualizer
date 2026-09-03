import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AlgorithmStep } from '../../types/algorithm';
import type { QueueState } from '../../algorithms/dataStructures/queue';

interface QueueVisualizerProps {
  currentStep: AlgorithmStep<QueueState> | null;
}

export const QueueVisualizer: React.FC<QueueVisualizerProps> = ({ currentStep }) => {
  const queueState = currentStep?.snapshot || { items: [10, 20, 30], frontPointer: 0, rearPointer: 2 };
  const items = queueState.items;

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden shadow-2xl">
      <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">
        Queue Container (FIFO)
      </h4>

      <div className="flex items-center justify-center gap-3 border-y-4 border-gray-700 bg-gray-900/50 rounded-2xl p-4 min-w-[320px] max-w-full overflow-x-auto shadow-inner">
        <span className="text-xs font-mono font-bold text-cyan-400 shrink-0">FRONT →</span>

        <AnimatePresence initial={false}>
          {items.map((val, idx) => {
            const isFront = idx === 0;
            const isRear = idx === items.length - 1;

            return (
              <motion.div
                key={`${idx}-${val}`}
                initial={{ opacity: 0, scale: 0.5, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: -30 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`flex flex-col items-center p-3 rounded-xl border font-mono font-bold text-sm min-w-[64px] shadow-md transition-colors ${
                  isFront
                    ? 'bg-cyan-600 border-cyan-400 text-white shadow-cyan-500/30'
                    : isRear
                    ? 'bg-purple-600 border-purple-400 text-white shadow-purple-500/30'
                    : 'bg-gray-800 border-gray-700 text-gray-200'
                }`}
              >
                <span>{val}</span>
                <span className="text-[9px] font-normal text-gray-400 mt-1">
                  {isFront && isRear ? 'F/R' : isFront ? 'FRONT' : isRear ? 'REAR' : `[${idx}]`}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="text-xs text-gray-600 font-mono py-4">Queue is Empty</div>
        )}

        <span className="text-xs font-mono font-bold text-purple-400 shrink-0">← REAR</span>
      </div>
    </div>
  );
};

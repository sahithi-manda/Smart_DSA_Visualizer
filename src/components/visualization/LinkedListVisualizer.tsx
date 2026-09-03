import { motion } from 'framer-motion';
import React from 'react';
import type { LinkedListState } from '../../algorithms/dataStructures/linkedList';
import type { AlgorithmStep } from '../../types/algorithm';

interface LinkedListVisualizerProps {
  currentStep: AlgorithmStep<LinkedListState> | null;
}

export const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({ currentStep }) => {
  const state = currentStep?.snapshot || {
    nodes: [
      { id: 'node-0', val: 10, nextId: 'node-1' },
      { id: 'node-1', val: 20, nextId: 'node-2' },
      { id: 'node-2', val: 30, nextId: null },
    ],
    headId: 'node-0',
  };

  const isHighlighted = (idx: number) => currentStep?.highlightIndices?.includes(idx);

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden shadow-2xl">
      <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">
        Singly Linked List Nodes
      </h4>

      <div className="flex flex-wrap items-center justify-center gap-2 max-w-full overflow-x-auto p-4">
        {state.nodes.map((node, idx) => {
          const isHead = idx === 0;
          const isTail = idx === state.nodes.length - 1;
          const active = isHighlighted(idx);

          return (
            <React.Fragment key={node.id}>
              {/* Node Card */}
              <motion.div
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`flex rounded-xl border font-mono shadow-md overflow-hidden transition-colors ${
                  active
                    ? 'bg-amber-500/20 border-amber-400 text-white shadow-amber-500/20'
                    : isHead
                    ? 'bg-blue-600/20 border-blue-500 text-blue-200'
                    : 'bg-gray-900 border-gray-800 text-gray-200'
                }`}
              >
                {/* Data compartment */}
                <div className="px-4 py-3 font-bold text-sm border-r border-gray-800 flex flex-col items-center">
                  <span>{node.val}</span>
                  <span className="text-[9px] font-normal text-gray-400 mt-0.5">
                    {isHead ? 'HEAD' : isTail ? 'TAIL' : `node[${idx}]`}
                  </span>
                </div>

                {/* Pointer compartment */}
                <div className="px-3 py-3 text-xs text-gray-500 bg-gray-950/60 flex items-center justify-center">
                  {node.nextId ? '•next' : 'NULL'}
                </div>
              </motion.div>

              {/* Arrow */}
              {node.nextId && (
                <div className="flex items-center text-blue-400 font-bold text-lg px-1 animate-pulse">
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

import { motion } from 'framer-motion';
import React from 'react';
import type { BSTNode, BSTState } from '../../algorithms/dataStructures/binarySearchTree';
import type { AlgorithmStep } from '../../types/algorithm';

interface BSTVisualizerProps {
  currentStep: AlgorithmStep<BSTState> | null;
}

export const BSTVisualizer: React.FC<BSTVisualizerProps> = ({ currentStep }) => {
  const bstState = currentStep?.snapshot || {
    nodes: {
      'root-1': { id: 'root-1', val: 50, leftId: 'left-1', rightId: 'right-1' },
      'left-1': { id: 'left-1', val: 30, leftId: null, rightId: null },
      'right-1': { id: 'right-1', val: 70, leftId: null, rightId: null },
    },
    rootId: 'root-1',
  };

  const { nodes, rootId, traversalResult } = bstState;

  // Simple tree positioning algorithm
  const getLayout = (
    nodeId: string | null,
    x: number = 320,
    y: number = 50,
    offset: number = 120,
    depth: number = 0
  ): Array<{ node: BSTNode; x: number; y: number; px?: number; py?: number }> => {
    if (!nodeId || !nodes[nodeId]) return [];
    const curr = nodes[nodeId];

    const currentLayout = [{ node: curr, x, y }];
    const leftLayout = getLayout(curr.leftId, x - offset, y + 65, offset / 1.8, depth + 1).map(
      (item) => (item.node.id === curr.leftId ? { ...item, px: x, py: y } : item)
    );
    const rightLayout = getLayout(curr.rightId, x + offset, y + 65, offset / 1.8, depth + 1).map(
      (item) => (item.node.id === curr.rightId ? { ...item, px: x, py: y } : item)
    );

    return [...currentLayout, ...leftLayout, ...rightLayout];
  };

  const layout = rootId ? getLayout(rootId) : [];

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden shadow-2xl">
      <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">
        Binary Search Tree Layout
      </h4>

      {traversalResult && (
        <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-4">
          Inorder Traversal: [{traversalResult.join(', ')}]
        </div>
      )}

      <div className="w-full h-[280px] relative flex items-center justify-center overflow-auto">
        <svg className="w-full h-full absolute inset-0 pointer-events-none">
          {layout.map((item) => {
            if (item.px !== undefined && item.py !== undefined) {
              return (
                <line
                  key={`line-${item.node.id}`}
                  x1={item.px}
                  y1={item.py}
                  x2={item.x}
                  y2={item.y}
                  stroke="#374151"
                  strokeWidth="2"
                />
              );
            }
            return null;
          })}
        </svg>

        {layout.map((item) => (
          <motion.div
            key={item.node.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ left: `${item.x - 20}px`, top: `${item.y - 20}px` }}
            className="absolute w-10 h-10 rounded-full bg-blue-600 border-2 border-blue-400 text-white font-mono font-bold text-xs flex items-center justify-center shadow-lg shadow-blue-500/30 z-10"
          >
            {item.node.val}
          </motion.div>
        ))}

        {layout.length === 0 && (
          <div className="text-xs text-gray-600 font-mono">Tree is Empty</div>
        )}
      </div>
    </div>
  );
};

import { motion } from 'framer-motion';
import React from 'react';
import type { GraphStepState } from '../../algorithms/graphs/bfs';
import type { AlgorithmStep } from '../../types/algorithm';

interface GraphVisualizerProps {
  currentStep: AlgorithmStep<GraphStepState> | null;
}

export const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ currentStep }) => {
  const defaultGraph = {
    nodes: [
      { id: 'A', label: 'A', x: 80, y: 80 },
      { id: 'B', label: 'B', x: 220, y: 60 },
      { id: 'C', label: 'C', x: 360, y: 90 },
      { id: 'D', label: 'D', x: 120, y: 220 },
      { id: 'E', label: 'E', x: 280, y: 230 },
      { id: 'F', label: 'F', x: 420, y: 220 },
    ],
    edges: [
      { id: 'e1', source: 'A', target: 'B', weight: 4 },
      { id: 'e2', source: 'A', target: 'D', weight: 2 },
      { id: 'e3', source: 'B', target: 'C', weight: 5 },
      { id: 'e4', source: 'B', target: 'E', weight: 1 },
      { id: 'e5', source: 'C', target: 'F', weight: 3 },
      { id: 'e6', source: 'D', target: 'E', weight: 8 },
      { id: 'e7', source: 'E', target: 'F', weight: 2 },
    ],
  };

  const snapshot = currentStep?.snapshot || {
    graph: defaultGraph,
    startNodeId: 'A',
    targetNodeId: 'F',
    visitedNodeIds: ['A'],
    currentNodeId: 'A',
    frontierNodeIds: ['B', 'D'],
  };

  const { graph, visitedNodeIds, currentNodeId, frontierNodeIds, finalPathNodeIds, distances } =
    snapshot;

  const isCurrent = (id: string) => currentNodeId === id;
  const isVisited = (id: string) => visitedNodeIds?.includes(id);
  const isFrontier = (id: string) => frontierNodeIds?.includes(id);
  const isPathNode = (id: string) => finalPathNodeIds?.includes(id);

  const isPathEdge = (source: string, target: string) => {
    if (!finalPathNodeIds || finalPathNodeIds.length < 2) return false;
    for (let i = 0; i < finalPathNodeIds.length - 1; i++) {
      if (
        (finalPathNodeIds[i] === source && finalPathNodeIds[i + 1] === target) ||
        (finalPathNodeIds[i] === target && finalPathNodeIds[i + 1] === source)
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden shadow-2xl">
      {/* Legend */}
      <div className="absolute top-4 left-6 right-6 flex flex-wrap items-center justify-between gap-4 text-[11px] font-semibold text-gray-400 border-b border-gray-900 pb-3">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
            <span>Current Node</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span>Frontier / Queue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Shortest Path</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[300px] relative flex items-center justify-center overflow-auto mt-6">
        <svg className="w-full h-full absolute inset-0">
          {graph.edges.map((edge) => {
            const sourceNode = graph.nodes.find((n) => n.id === edge.source);
            const targetNode = graph.nodes.find((n) => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            const isHighlightedEdge = isPathEdge(edge.source, edge.target);
            const midX = (sourceNode.x + targetNode.x) / 2;
            const midY = (sourceNode.y + targetNode.y) / 2;

            return (
              <g key={edge.id}>
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isHighlightedEdge ? '#F59E0B' : '#374151'}
                  strokeWidth={isHighlightedEdge ? '4' : '2'}
                  className={isHighlightedEdge ? 'drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]' : ''}
                />
                <rect
                  x={midX - 10}
                  y={midY - 9}
                  width="20"
                  height="16"
                  rx="4"
                  fill="#111827"
                  stroke="#1F2937"
                />
                <text
                  x={midX}
                  y={midY + 3}
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {edge.weight}
                </text>
              </g>
            );
          })}
        </svg>

        {graph.nodes.map((node) => {
          const activeCurrent = isCurrent(node.id);
          const activePath = isPathNode(node.id);
          const activeFrontier = isFrontier(node.id);
          const activeVisited = isVisited(node.id);

          const colorClass = activeCurrent
            ? 'bg-cyan-500 border-cyan-300 text-black font-extrabold shadow-cyan-500/50 scale-110'
            : activePath
            ? 'bg-amber-500 border-amber-300 text-black font-extrabold shadow-amber-500/50 scale-105'
            : activeFrontier
            ? 'bg-purple-600 border-purple-400 text-white shadow-purple-500/30'
            : activeVisited
            ? 'bg-emerald-600 border-emerald-400 text-white shadow-emerald-500/30'
            : 'bg-gray-800 border-gray-700 text-gray-300';

          const distVal = distances?.[node.id];

          return (
            <motion.div
              key={node.id}
              style={{ left: `${node.x - 22}px`, top: `${node.y - 22}px` }}
              className={`absolute w-11 h-11 rounded-full border-2 font-mono text-sm flex flex-col items-center justify-center shadow-lg transition-all z-10 ${colorClass}`}
            >
              <span>{node.label}</span>
              {distVal !== undefined && distVal !== Infinity && (
                <span className="text-[8px] opacity-80">{distVal}</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

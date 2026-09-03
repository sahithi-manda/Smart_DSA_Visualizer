import type { AlgorithmStep } from '../../types/algorithm';
import type { GraphData, GraphStepState } from './bfs';

export function generateDijkstraSteps(
  graph: GraphData,
  startNodeId: string,
  targetNodeId?: string
): AlgorithmStep<GraphStepState>[] {
  const steps: AlgorithmStep<GraphStepState>[] = [];
  const distances: Record<string, number> = {};
  const prevNode: Record<string, string | null> = {};
  const visited = new Set<string>();

  graph.nodes.forEach((node) => {
    distances[node.id] = node.id === startNodeId ? 0 : Infinity;
    prevNode[node.id] = null;
  });

  const unvisitedNodes = new Set<string>(graph.nodes.map((n) => n.id));

  steps.push({
    id: `step-0`,
    type: 'VISIT',
    snapshot: {
      graph,
      startNodeId,
      targetNodeId,
      visitedNodeIds: [],
      currentNodeId: startNodeId,
      frontierNodeIds: Array.from(unvisitedNodes),
      distances: { ...distances },
    },
    codeLine: 1,
    description: `Initialized Dijkstra with start Node ${startNodeId} (dist: 0), all others set to ∞.`,
    stats: { comparisons: 0, swaps: 0, accesses: 1 },
  });

  while (unvisitedNodes.size > 0) {
    let currNodeId: string | null = null;
    let minDistance = Infinity;

    for (const node of unvisitedNodes) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        currNodeId = node;
      }
    }

    if (!currNodeId || minDistance === Infinity) break;

    unvisitedNodes.delete(currNodeId);
    visited.add(currNodeId);

    steps.push({
      id: `step-${steps.length}`,
      type: 'VISIT',
      snapshot: {
        graph,
        startNodeId,
        targetNodeId,
        visitedNodeIds: Array.from(visited),
        currentNodeId: currNodeId,
        frontierNodeIds: Array.from(unvisitedNodes),
        distances: { ...distances },
      },
      codeLine: 4,
      description: `Extracted Node ${currNodeId} with minimum tentative distance ${minDistance}.`,
      stats: { comparisons: unvisitedNodes.size, swaps: 0, accesses: visited.size },
    });

    if (targetNodeId && currNodeId === targetNodeId) {
      // Reconstruct path
      const path: string[] = [];
      let temp: string | null = targetNodeId;
      while (temp) {
        path.unshift(temp);
        temp = prevNode[temp];
      }

      steps.push({
        id: `step-${steps.length}`,
        type: 'FOUND',
        snapshot: {
          graph,
          startNodeId,
          targetNodeId,
          visitedNodeIds: Array.from(visited),
          currentNodeId: currNodeId,
          frontierNodeIds: [],
          distances: { ...distances },
          finalPathNodeIds: path,
        },
        codeLine: 5,
        description: `Target Node ${targetNodeId} reached! Shortest path: [${path.join(' → ')}] (Total Weight: ${distances[targetNodeId]}).`,
        stats: { comparisons: unvisitedNodes.size, swaps: 0, accesses: visited.size },
      });
      break;
    }

    const neighborEdges = graph.edges.filter(
      (e) => e.source === currNodeId || e.target === currNodeId
    );

    for (const edge of neighborEdges) {
      const neighbor = edge.source === currNodeId ? edge.target : edge.source;
      if (unvisitedNodes.has(neighbor)) {
        const alt = distances[currNodeId] + edge.weight;
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          prevNode[neighbor] = currNodeId;

          steps.push({
            id: `step-${steps.length}`,
            type: 'SET_DISTANCE',
            snapshot: {
              graph,
              startNodeId,
              targetNodeId,
              visitedNodeIds: Array.from(visited),
              currentNodeId: currNodeId,
              frontierNodeIds: Array.from(unvisitedNodes),
              distances: { ...distances },
            },
            codeLine: 8,
            description: `Relaxed edge (${currNodeId} → ${neighbor}): updated shortest distance to ${alt}.`,
            stats: { comparisons: 1, swaps: 0, accesses: visited.size },
          });
        }
      }
    }
  }

  return steps;
}

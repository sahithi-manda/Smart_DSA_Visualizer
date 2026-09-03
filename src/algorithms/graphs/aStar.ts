import type { AlgorithmStep } from '../../types/algorithm';
import type { GraphData, GraphStepState } from './bfs';

export function generateAStarSteps(
  graph: GraphData,
  startNodeId: string,
  targetNodeId: string
): AlgorithmStep<GraphStepState>[] {
  const steps: AlgorithmStep<GraphStepState>[] = [];
  const gScore: Record<string, number> = {};
  const fScore: Record<string, number> = {};
  const prevNode: Record<string, string | null> = {};
  const visited = new Set<string>();

  const getNode = (id: string) => graph.nodes.find((n) => n.id === id);

  // Euclidean distance heuristic
  const heuristic = (id1: string, id2: string) => {
    const n1 = getNode(id1);
    const n2 = getNode(id2);
    if (!n1 || !n2) return 0;
    return Math.hypot(n1.x - n2.x, n1.y - n2.y);
  };

  graph.nodes.forEach((n) => {
    gScore[n.id] = n.id === startNodeId ? 0 : Infinity;
    fScore[n.id] = n.id === startNodeId ? heuristic(startNodeId, targetNodeId) : Infinity;
    prevNode[n.id] = null;
  });

  const openSet = new Set<string>([startNodeId]);

  steps.push({
    id: `step-0`,
    type: 'VISIT',
    snapshot: {
      graph,
      startNodeId,
      targetNodeId,
      visitedNodeIds: [],
      currentNodeId: startNodeId,
      frontierNodeIds: Array.from(openSet),
      distances: { ...gScore },
    },
    codeLine: 1,
    description: `Initialized A* Search: g(${startNodeId})=0, f(${startNodeId})=${fScore[startNodeId].toFixed(1)}.`,
    stats: { comparisons: 0, swaps: 0, accesses: 1 },
  });

  while (openSet.size > 0) {
    let currentId: string | null = null;
    let minF = Infinity;

    for (const node of openSet) {
      if (fScore[node] < minF) {
        minF = fScore[node];
        currentId = node;
      }
    }

    if (!currentId) break;

    if (currentId === targetNodeId) {
      visited.add(currentId);
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
          currentNodeId: currentId,
          frontierNodeIds: [],
          distances: { ...gScore },
          finalPathNodeIds: path,
        },
        codeLine: 4,
        description: `Target Node ${targetNodeId} reached by A*! Optimal Path: [${path.join(' → ')}].`,
        stats: { comparisons: openSet.size, swaps: 0, accesses: visited.size },
      });
      break;
    }

    openSet.delete(currentId);
    visited.add(currentId);

    steps.push({
      id: `step-${steps.length}`,
      type: 'VISIT',
      snapshot: {
        graph,
        startNodeId,
        targetNodeId,
        visitedNodeIds: Array.from(visited),
        currentNodeId: currentId,
        frontierNodeIds: Array.from(openSet),
        distances: { ...gScore },
      },
      codeLine: 6,
      description: `Exploring Node ${currentId} with lowest f(n) = ${fScore[currentId].toFixed(1)}.`,
      stats: { comparisons: openSet.size, swaps: 0, accesses: visited.size },
    });

    const neighborEdges = graph.edges.filter(
      (e) => e.source === currentId || e.target === currentId
    );

    for (const edge of neighborEdges) {
      const neighbor = edge.source === currentId ? edge.target : edge.source;
      if (visited.has(neighbor)) continue;

      const tentativeG = gScore[currentId] + edge.weight;
      if (tentativeG < gScore[neighbor]) {
        prevNode[neighbor] = currentId;
        gScore[neighbor] = tentativeG;
        fScore[neighbor] = tentativeG + heuristic(neighbor, targetNodeId);

        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
        }

        steps.push({
          id: `step-${steps.length}`,
          type: 'SET_DISTANCE',
          snapshot: {
            graph,
            startNodeId,
            targetNodeId,
            visitedNodeIds: Array.from(visited),
            currentNodeId: currentId,
            frontierNodeIds: Array.from(openSet),
            distances: { ...gScore },
          },
          codeLine: 10,
          description: `Updated neighbor ${neighbor}: g=${tentativeG}, h=${heuristic(neighbor, targetNodeId).toFixed(1)}, f=${fScore[neighbor].toFixed(1)}.`,
          stats: { comparisons: 1, swaps: 0, accesses: visited.size },
        });
      }
    }
  }

  return steps;
}

import type { AlgorithmStep } from '../../types/algorithm';

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  weight: number;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface GraphStepState {
  graph: GraphData;
  startNodeId: string;
  targetNodeId?: string;
  visitedNodeIds: string[];
  currentNodeId?: string;
  frontierNodeIds: string[];
  distances?: Record<string, number>;
  finalPathNodeIds?: string[];
}

export function generateBFSSteps(
  graph: GraphData,
  startNodeId: string,
  targetNodeId?: string
): AlgorithmStep<GraphStepState>[] {
  const steps: AlgorithmStep<GraphStepState>[] = [];
  const visited = new Set<string>();
  const queue: string[] = [startNodeId];
  visited.add(startNodeId);

  steps.push({
    id: `step-0`,
    type: 'VISIT',
    snapshot: {
      graph,
      startNodeId,
      targetNodeId,
      visitedNodeIds: Array.from(visited),
      currentNodeId: startNodeId,
      frontierNodeIds: [...queue],
    },
    codeLine: 1,
    description: `Initialized BFS starting from Node ${startNodeId}. Added to FIFO queue.`,
    stats: { comparisons: 0, swaps: 0, accesses: 1 },
  });

  while (queue.length > 0) {
    const current = queue.shift()!;

    steps.push({
      id: `step-${steps.length}`,
      type: 'VISIT',
      snapshot: {
        graph,
        startNodeId,
        targetNodeId,
        visitedNodeIds: Array.from(visited),
        currentNodeId: current,
        frontierNodeIds: [...queue],
      },
      codeLine: 4,
      description: `Dequeued Node ${current}. Exploring neighbors...`,
      stats: { comparisons: 0, swaps: 0, accesses: visited.size },
    });

    if (targetNodeId && current === targetNodeId) {
      steps.push({
        id: `step-${steps.length}`,
        type: 'FOUND',
        snapshot: {
          graph,
          startNodeId,
          targetNodeId,
          visitedNodeIds: Array.from(visited),
          currentNodeId: current,
          frontierNodeIds: [...queue],
          finalPathNodeIds: [startNodeId, targetNodeId],
        },
        codeLine: 5,
        description: `Target Node ${targetNodeId} reached via BFS traversal!`,
        stats: { comparisons: 0, swaps: 0, accesses: visited.size },
      });
      break;
    }

    const neighborEdges = graph.edges.filter((e) => e.source === current || e.target === current);

    for (const edge of neighborEdges) {
      const neighbor = edge.source === current ? edge.target : edge.source;
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);

        steps.push({
          id: `step-${steps.length}`,
          type: 'ENQUEUE',
          snapshot: {
            graph,
            startNodeId,
            targetNodeId,
            visitedNodeIds: Array.from(visited),
            currentNodeId: current,
            frontierNodeIds: [...queue],
          },
          codeLine: 7,
          description: `Discovered unvisited neighbor Node ${neighbor}. Enqueued to frontier.`,
          stats: { comparisons: 0, swaps: 0, accesses: visited.size },
        });
      }
    }
  }

  return steps;
}

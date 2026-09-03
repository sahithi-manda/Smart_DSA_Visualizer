import type { AlgorithmStep } from '../../types/algorithm';
import type { GraphData, GraphStepState } from './bfs';

export function generateDFSSteps(
  graph: GraphData,
  startNodeId: string,
  targetNodeId?: string
): AlgorithmStep<GraphStepState>[] {
  const steps: AlgorithmStep<GraphStepState>[] = [];
  const visited = new Set<string>();
  const stack: string[] = [startNodeId];

  steps.push({
    id: `step-0`,
    type: 'VISIT',
    snapshot: {
      graph,
      startNodeId,
      targetNodeId,
      visitedNodeIds: Array.from(visited),
      currentNodeId: startNodeId,
      frontierNodeIds: [...stack],
    },
    codeLine: 1,
    description: `Initialized DFS starting from Node ${startNodeId}. Pushed to call stack.`,
    stats: { comparisons: 0, swaps: 0, accesses: 1 },
  });

  while (stack.length > 0) {
    const current = stack.pop()!;
    if (!visited.has(current)) {
      visited.add(current);

      steps.push({
        id: `step-${steps.length}`,
        type: 'VISIT',
        snapshot: {
          graph,
          startNodeId,
          targetNodeId,
          visitedNodeIds: Array.from(visited),
          currentNodeId: current,
          frontierNodeIds: [...stack],
        },
        codeLine: 2,
        description: `Popped Node ${current} from stack. Marking as visited...`,
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
            frontierNodeIds: [...stack],
          },
          codeLine: 3,
          description: `Target Node ${targetNodeId} reached via DFS path!`,
          stats: { comparisons: 0, swaps: 0, accesses: visited.size },
        });
        break;
      }

      const neighborEdges = graph.edges.filter((e) => e.source === current || e.target === current);
      for (const edge of neighborEdges) {
        const neighbor = edge.source === current ? edge.target : edge.source;
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
          steps.push({
            id: `step-${steps.length}`,
            type: 'PUSH',
            snapshot: {
              graph,
              startNodeId,
              targetNodeId,
              visitedNodeIds: Array.from(visited),
              currentNodeId: current,
              frontierNodeIds: [...stack],
            },
            codeLine: 5,
            description: `Pushed unvisited neighbor Node ${neighbor} onto DFS stack.`,
            stats: { comparisons: 0, swaps: 0, accesses: visited.size },
          });
        }
      }
    }
  }

  return steps;
}

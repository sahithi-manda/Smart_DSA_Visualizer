import { describe, it, expect } from 'vitest';
import { getAlgorithmSteps, SAMPLE_GRAPH } from '../engine/visualizationEngine';

describe('Visualization engine: graph algorithms', () => {
  // The visualizer hook passes a random number array to every algorithm.
  // Graph algorithms must fall back to the sample graph instead of crashing.
  it.each(['bfs', 'dfs', 'dijkstra', 'a-star'])('%s handles array input', (id) => {
    const steps = getAlgorithmSteps(id, [42, 17, 88]);
    expect(steps.length).toBeGreaterThan(0);
    const snapshot = steps[0].snapshot as { graph: typeof SAMPLE_GRAPH };
    expect(snapshot.graph).toBe(SAMPLE_GRAPH);
  });
});

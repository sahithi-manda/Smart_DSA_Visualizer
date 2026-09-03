import type { AlgorithmStep } from '../../types/algorithm';

export interface HeapState {
  heap: number[];
  type: 'min' | 'max';
}

export function generateHeapSteps(
  values: number[]
): AlgorithmStep<HeapState>[] {
  const steps: AlgorithmStep<HeapState>[] = [];
  const heap: number[] = [];

  steps.push({
    id: `step-0`,
    type: 'VISIT',
    snapshot: { heap: [...heap], type: 'min' },
    codeLine: 1,
    description: 'Initialized empty Min-Heap structure.',
    stats: { comparisons: 0, swaps: 0, accesses: 0 },
  });

  for (const val of values) {
    heap.push(val);
    let idx = heap.length - 1;

    steps.push({
      id: `step-${steps.length}`,
      type: 'PUSH',
      snapshot: { heap: [...heap], type: 'min' },
      highlightIndices: [idx],
      codeLine: 3,
      description: `Pushed value ${val} to end of Heap array at index ${idx}.`,
      stats: { comparisons: 0, swaps: 0, accesses: heap.length },
    });

    // Bubble up
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      steps.push({
        id: `step-${steps.length}`,
        type: 'COMPARE',
        snapshot: { heap: [...heap], type: 'min' },
        highlightIndices: [idx, parentIdx],
        codeLine: 4,
        description: `Comparing Heap child element ${heap[idx]} at index ${idx} with parent ${heap[parentIdx]} at ${parentIdx}.`,
        stats: { comparisons: 1, swaps: 0, accesses: 2 },
      });

      if (heap[idx] < heap[parentIdx]) {
        [heap[idx], heap[parentIdx]] = [heap[parentIdx], heap[idx]];
        steps.push({
          id: `step-${steps.length}`,
          type: 'SWAP',
          snapshot: { heap: [...heap], type: 'min' },
          highlightIndices: [idx, parentIdx],
          codeLine: 5,
          description: `Bubbled up ${heap[parentIdx]} to restore Min-Heap invariant.`,
          stats: { comparisons: 1, swaps: 1, accesses: 2 },
        });
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  return steps;
}

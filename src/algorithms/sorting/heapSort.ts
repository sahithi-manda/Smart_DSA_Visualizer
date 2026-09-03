import type { AlgorithmStep } from '../../types/algorithm';

export function generateHeapSortSteps(initialArray: number[]): AlgorithmStep<number[]>[] {
  const steps: AlgorithmStep<number[]>[] = [];
  const arr = [...initialArray];
  const n = arr.length;

  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;
  const sortedIndices: number[] = [];

  steps.push({
    id: `step-0`,
    type: 'VISIT',
    snapshot: [...arr],
    codeLine: 1,
    description: `Initialized Heap Sort with ${n} elements. Building Max-Heap...`,
    stats: { comparisons, swaps, accesses },
  });

  function heapify(length: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    steps.push({
      id: `step-${steps.length}`,
      type: 'HIGHLIGHT',
      snapshot: [...arr],
      highlightIndices: [i, left < length ? left : i, right < length ? right : i],
      sortedIndices: [...sortedIndices],
      codeLine: 4,
      description: `Checking Heap property at root index ${i} with left (${left}) and right (${right}) children.`,
      stats: { comparisons, swaps, accesses },
    });

    if (left < length) {
      comparisons++;
      accesses += 2;
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < length) {
      comparisons++;
      accesses += 2;
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      swaps++;
      accesses += 2;
      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      steps.push({
        id: `step-${steps.length}`,
        type: 'SWAP',
        snapshot: [...arr],
        highlightIndices: [i, largest],
        sortedIndices: [...sortedIndices],
        codeLine: 6,
        description: `Swapped parent A[${i}] (${arr[largest]}) with larger child A[${largest}] (${arr[i]}).`,
        stats: { comparisons, swaps, accesses },
      });

      heapify(length, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  steps.push({
    id: `step-${steps.length}`,
    type: 'VISIT',
    snapshot: [...arr],
    codeLine: 4,
    description: `Max-Heap successfully constructed. Extracting max elements one by one...`,
    stats: { comparisons, swaps, accesses },
  });

  // Extract from heap
  for (let i = n - 1; i > 0; i--) {
    swaps++;
    accesses += 2;
    [arr[0], arr[i]] = [arr[i], arr[0]];

    sortedIndices.push(i);
    steps.push({
      id: `step-${steps.length}`,
      type: 'SWAP',
      snapshot: [...arr],
      highlightIndices: [0, i],
      sortedIndices: [...sortedIndices],
      codeLine: 6,
      description: `Extracted max element ${arr[i]} to sorted index ${i}, moving ${arr[0]} to root.`,
      stats: { comparisons, swaps, accesses },
    });

    heapify(i, 0);
  }

  steps.push({
    id: `step-${steps.length}`,
    type: 'SORTED',
    snapshot: [...arr],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    codeLine: 8,
    description: `Heap Sort complete! Array is fully sorted.`,
    stats: { comparisons, swaps, accesses },
  });

  return steps;
}

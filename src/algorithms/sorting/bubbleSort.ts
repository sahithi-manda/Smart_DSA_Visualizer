import type { AlgorithmStep } from '../../types/algorithm';

export function generateBubbleSortSteps(initialArray: number[]): AlgorithmStep<number[]>[] {
  const steps: AlgorithmStep<number[]>[] = [];
  const arr = [...initialArray];
  const n = arr.length;

  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;
  const sortedIndices: number[] = [];

  // Step 0: Initial state
  steps.push({
    id: `step-0`,
    type: 'VISIT',
    snapshot: [...arr],
    codeLine: 1,
    description: `Initialized Bubble Sort with ${n} elements.`,
    stats: { comparisons, swaps, accesses },
  });

  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      accesses += 2;

      // Compare step
      steps.push({
        id: `step-${steps.length}`,
        type: 'COMPARE',
        snapshot: [...arr],
        highlightIndices: [j, j + 1],
        sortedIndices: [...sortedIndices],
        codeLine: 4,
        description: `Comparing A[${j}] (${arr[j]}) and A[${j + 1}] (${arr[j + 1]}).`,
        stats: { comparisons, swaps, accesses },
      });

      if (arr[j] > arr[j + 1]) {
        swaps++;
        accesses += 2;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        // Swap step
        steps.push({
          id: `step-${steps.length}`,
          type: 'SWAP',
          snapshot: [...arr],
          highlightIndices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          codeLine: 5,
          description: `Swapped A[${j}] and A[${j + 1}] since ${arr[j + 1]} < ${arr[j]}.`,
          stats: { comparisons, swaps, accesses },
        });
      }
    }

    sortedIndices.push(n - 1 - i);
    steps.push({
      id: `step-${steps.length}`,
      type: 'SORTED',
      snapshot: [...arr],
      sortedIndices: [...sortedIndices],
      codeLine: 2,
      description: `Element ${arr[n - 1 - i]} at index ${n - 1 - i} is now in sorted position.`,
      stats: { comparisons, swaps, accesses },
    });

    if (!swapped) {
      // All remaining sorted
      for (let k = 0; k < n - i - 1; k++) {
        if (!sortedIndices.includes(k)) sortedIndices.push(k);
      }
      break;
    }
  }

  // Final sorted state
  steps.push({
    id: `step-${steps.length}`,
    type: 'SORTED',
    snapshot: [...arr],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    codeLine: 6,
    description: `Bubble Sort complete! Array is fully sorted.`,
    stats: { comparisons, swaps, accesses },
  });

  return steps;
}

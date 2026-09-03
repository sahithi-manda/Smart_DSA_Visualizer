import type { AlgorithmStep } from '../../types/algorithm';

export function generateSelectionSortSteps(initialArray: number[]): AlgorithmStep<number[]>[] {
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
    description: `Initialized Selection Sort with ${n} elements.`,
    stats: { comparisons, swaps, accesses },
  });

  for (let i = 0; i < n; i++) {
    let minIdx = i;

    steps.push({
      id: `step-${steps.length}`,
      type: 'SELECT',
      snapshot: [...arr],
      highlightIndices: [i],
      secondaryIndices: [minIdx],
      sortedIndices: [...sortedIndices],
      codeLine: 3,
      description: `Assuming element at index ${i} (${arr[i]}) as minimum.`,
      stats: { comparisons, swaps, accesses },
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      accesses += 2;

      steps.push({
        id: `step-${steps.length}`,
        type: 'COMPARE',
        snapshot: [...arr],
        highlightIndices: [j],
        secondaryIndices: [minIdx],
        sortedIndices: [...sortedIndices],
        codeLine: 5,
        description: `Comparing A[${j}] (${arr[j]}) with current minimum A[${minIdx}] (${arr[minIdx]}).`,
        stats: { comparisons, swaps, accesses },
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          id: `step-${steps.length}`,
          type: 'SELECT',
          snapshot: [...arr],
          highlightIndices: [minIdx],
          sortedIndices: [...sortedIndices],
          codeLine: 6,
          description: `Found new minimum value ${arr[minIdx]} at index ${minIdx}.`,
          stats: { comparisons, swaps, accesses },
        });
      }
    }

    if (minIdx !== i) {
      swaps++;
      accesses += 2;
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

      steps.push({
        id: `step-${steps.length}`,
        type: 'SWAP',
        snapshot: [...arr],
        highlightIndices: [i, minIdx],
        sortedIndices: [...sortedIndices],
        codeLine: 7,
        description: `Swapped A[${i}] (${arr[minIdx]}) with minimum A[${minIdx}] (${arr[i]}).`,
        stats: { comparisons, swaps, accesses },
      });
    }

    sortedIndices.push(i);
    steps.push({
      id: `step-${steps.length}`,
      type: 'SORTED',
      snapshot: [...arr],
      sortedIndices: [...sortedIndices],
      codeLine: 2,
      description: `Element ${arr[i]} at index ${i} is now sorted.`,
      stats: { comparisons, swaps, accesses },
    });
  }

  steps.push({
    id: `step-${steps.length}`,
    type: 'SORTED',
    snapshot: [...arr],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    codeLine: 8,
    description: `Selection Sort complete! Array is fully sorted.`,
    stats: { comparisons, swaps, accesses },
  });

  return steps;
}

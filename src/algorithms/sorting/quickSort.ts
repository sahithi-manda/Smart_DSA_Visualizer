import type { AlgorithmStep } from '../../types/algorithm';

export function generateQuickSortSteps(initialArray: number[]): AlgorithmStep<number[]>[] {
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
    description: `Initialized Quick Sort with ${n} elements.`,
    stats: { comparisons, swaps, accesses },
  });

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    accesses++;
    let i = low - 1;

    steps.push({
      id: `step-${steps.length}`,
      type: 'PIVOT',
      snapshot: [...arr],
      pivotIndex: high,
      highlightIndices: Array.from({ length: high - low + 1 }, (_, idx) => low + idx),
      sortedIndices: [...sortedIndices],
      codeLine: 8,
      description: `Chosen pivot element ${pivot} at index ${high} for subarray [${low}..${high}].`,
      stats: { comparisons, swaps, accesses },
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      accesses++;

      steps.push({
        id: `step-${steps.length}`,
        type: 'COMPARE',
        snapshot: [...arr],
        highlightIndices: [j],
        pivotIndex: high,
        sortedIndices: [...sortedIndices],
        codeLine: 10,
        description: `Comparing element A[${j}] (${arr[j]}) with pivot (${pivot}).`,
        stats: { comparisons, swaps, accesses },
      });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          swaps++;
          accesses += 2;
          [arr[i], arr[j]] = [arr[j], arr[i]];

          steps.push({
            id: `step-${steps.length}`,
            type: 'SWAP',
            snapshot: [...arr],
            highlightIndices: [i, j],
            pivotIndex: high,
            sortedIndices: [...sortedIndices],
            codeLine: 12,
            description: `Swapped A[${i}] (${arr[j]}) and A[${j}] (${arr[i]}) to partition smaller items left.`,
            stats: { comparisons, swaps, accesses },
          });
        }
      }
    }

    if (i + 1 !== high) {
      swaps++;
      accesses += 2;
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

      steps.push({
        id: `step-${steps.length}`,
        type: 'SWAP',
        snapshot: [...arr],
        highlightIndices: [i + 1, high],
        pivotIndex: i + 1,
        sortedIndices: [...sortedIndices],
        codeLine: 14,
        description: `Placed pivot ${pivot} into its correct sorted index ${i + 1}.`,
        stats: { comparisons, swaps, accesses },
      });
    }

    sortedIndices.push(i + 1);
    steps.push({
      id: `step-${steps.length}`,
      type: 'SORTED',
      snapshot: [...arr],
      sortedIndices: [...sortedIndices],
      codeLine: 15,
      description: `Pivot ${pivot} at index ${i + 1} is now fixed in sorted order.`,
      stats: { comparisons, swaps, accesses },
    });

    return i + 1;
  }

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high) {
      if (!sortedIndices.includes(low)) sortedIndices.push(low);
    }
  }

  quickSortHelper(0, n - 1);

  steps.push({
    id: `step-${steps.length}`,
    type: 'SORTED',
    snapshot: [...arr],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    codeLine: 6,
    description: `Quick Sort complete! Array is fully sorted.`,
    stats: { comparisons, swaps, accesses },
  });

  return steps;
}

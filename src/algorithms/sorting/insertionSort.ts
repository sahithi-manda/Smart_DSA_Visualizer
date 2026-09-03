import type { AlgorithmStep } from '../../types/algorithm';

export function generateInsertionSortSteps(initialArray: number[]): AlgorithmStep<number[]>[] {
  const steps: AlgorithmStep<number[]>[] = [];
  const arr = [...initialArray];
  const n = arr.length;

  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;

  steps.push({
    id: `step-0`,
    type: 'VISIT',
    snapshot: [...arr],
    codeLine: 1,
    description: `Initialized Insertion Sort with ${n} elements.`,
    stats: { comparisons, swaps, accesses },
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    accesses++;
    let j = i - 1;

    steps.push({
      id: `step-${steps.length}`,
      type: 'SELECT',
      snapshot: [...arr],
      highlightIndices: [i],
      codeLine: 2,
      description: `Picked key element ${key} at index ${i} for insertion.`,
      stats: { comparisons, swaps, accesses },
    });

    while (j >= 0) {
      comparisons++;
      accesses++;
      steps.push({
        id: `step-${steps.length}`,
        type: 'COMPARE',
        snapshot: [...arr],
        highlightIndices: [j, j + 1],
        codeLine: 4,
        description: `Comparing key (${key}) with A[${j}] (${arr[j]}).`,
        stats: { comparisons, swaps, accesses },
      });

      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        swaps++;
        accesses++;

        steps.push({
          id: `step-${steps.length}`,
          type: 'OVERWRITE',
          snapshot: [...arr],
          highlightIndices: [j, j + 1],
          codeLine: 5,
          description: `Shifted A[${j}] (${arr[j]}) right to index ${j + 1}.`,
          stats: { comparisons, swaps, accesses },
        });
        j--;
      } else {
        break;
      }
    }

    arr[j + 1] = key;
    accesses++;
    steps.push({
      id: `step-${steps.length}`,
      type: 'INSERT',
      snapshot: [...arr],
      highlightIndices: [j + 1],
      codeLine: 7,
      description: `Inserted key ${key} into position ${j + 1}.`,
      stats: { comparisons, swaps, accesses },
    });
  }

  steps.push({
    id: `step-${steps.length}`,
    type: 'SORTED',
    snapshot: [...arr],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    codeLine: 8,
    description: `Insertion Sort complete! Array is fully sorted.`,
    stats: { comparisons, swaps, accesses },
  });

  return steps;
}

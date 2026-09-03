import type { AlgorithmStep } from '../../types/algorithm';

export function generateBinarySearchSteps(
  initialArray: number[],
  target: number
): AlgorithmStep<number[]>[] {
  const steps: AlgorithmStep<number[]>[] = [];
  // Ensure array is sorted for Binary Search
  const arr = [...initialArray].sort((a, b) => a - b);
  const n = arr.length;

  let comparisons = 0;
  let accesses = 0;

  steps.push({
    id: `step-0`,
    type: 'VISIT',
    snapshot: [...arr],
    codeLine: 1,
    description: `Initialized Binary Search for target value ${target} in sorted array of ${n} elements.`,
    stats: { comparisons, swaps: 0, accesses },
  });

  let low = 0;
  let high = n - 1;
  let found = false;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;
    accesses++;

    steps.push({
      id: `step-${steps.length}`,
      type: 'COMPARE',
      snapshot: [...arr],
      pivotIndex: mid,
      highlightIndices: [low, high],
      secondaryIndices: [mid],
      codeLine: 4,
      description: `Range [${low}..${high}]. Comparing mid index ${mid} (${arr[mid]}) with target (${target}).`,
      stats: { comparisons, swaps: 0, accesses },
    });

    if (arr[mid] === target) {
      found = true;
      steps.push({
        id: `step-${steps.length}`,
        type: 'FOUND',
        snapshot: [...arr],
        highlightIndices: [mid],
        codeLine: 5,
        description: `Target ${target} successfully found at index ${mid}!`,
        stats: { comparisons, swaps: 0, accesses },
      });
      break;
    } else if (arr[mid] < target) {
      steps.push({
        id: `step-${steps.length}`,
        type: 'HIGHLIGHT',
        snapshot: [...arr],
        highlightIndices: [mid],
        codeLine: 6,
        description: `A[${mid}] (${arr[mid]}) < ${target}. Search space moves right: new low = ${mid + 1}.`,
        stats: { comparisons, swaps: 0, accesses },
      });
      low = mid + 1;
    } else {
      steps.push({
        id: `step-${steps.length}`,
        type: 'HIGHLIGHT',
        snapshot: [...arr],
        highlightIndices: [mid],
        codeLine: 7,
        description: `A[${mid}] (${arr[mid]}) > ${target}. Search space moves left: new high = ${mid - 1}.`,
        stats: { comparisons, swaps: 0, accesses },
      });
      high = mid - 1;
    }
  }

  if (!found) {
    steps.push({
      id: `step-${steps.length}`,
      type: 'NOT_FOUND',
      snapshot: [...arr],
      codeLine: 8,
      description: `Search space exhausted. Target ${target} was not found in array.`,
      stats: { comparisons, swaps: 0, accesses },
    });
  }

  return steps;
}

import type { AlgorithmStep } from '../../types/algorithm';

export function generateMergeSortSteps(initialArray: number[]): AlgorithmStep<number[]>[] {
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
    description: `Initialized Merge Sort with ${n} elements.`,
    stats: { comparisons, swaps, accesses },
  });

  function merge(left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    accesses += leftArr.length + rightArr.length;

    let i = 0;
    let j = 0;
    let k = left;

    steps.push({
      id: `step-${steps.length}`,
      type: 'HIGHLIGHT',
      snapshot: [...arr],
      highlightIndices: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      codeLine: 7,
      description: `Merging subarray [${left}..${mid}] and [${mid + 1}..${right}].`,
      stats: { comparisons, swaps, accesses },
    });

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      accesses += 2;

      steps.push({
        id: `step-${steps.length}`,
        type: 'COMPARE',
        snapshot: [...arr],
        highlightIndices: [left + i, mid + 1 + j],
        codeLine: 8,
        description: `Comparing left element ${leftArr[i]} and right element ${rightArr[j]}.`,
        stats: { comparisons, swaps, accesses },
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
        swaps++;
      }

      accesses++;
      steps.push({
        id: `step-${steps.length}`,
        type: 'OVERWRITE',
        snapshot: [...arr],
        highlightIndices: [k],
        codeLine: 9,
        description: `Placed element ${arr[k]} into position ${k}.`,
        stats: { comparisons, swaps, accesses },
      });
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      accesses += 2;
      steps.push({
        id: `step-${steps.length}`,
        type: 'OVERWRITE',
        snapshot: [...arr],
        highlightIndices: [k],
        codeLine: 9,
        description: `Flushed remaining left element ${arr[k]} to position ${k}.`,
        stats: { comparisons, swaps, accesses },
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      accesses += 2;
      steps.push({
        id: `step-${steps.length}`,
        type: 'OVERWRITE',
        snapshot: [...arr],
        highlightIndices: [k],
        codeLine: 9,
        description: `Flushed remaining right element ${arr[k]} to position ${k}.`,
        stats: { comparisons, swaps, accesses },
      });
      j++;
      k++;
    }
  }

  function mergeSortHelper(left: number, right: number) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    steps.push({
      id: `step-${steps.length}`,
      type: 'SELECT',
      snapshot: [...arr],
      highlightIndices: [left, mid, right],
      codeLine: 3,
      description: `Splitting subarray [${left}..${right}] at mid index ${mid}.`,
      stats: { comparisons, swaps, accesses },
    });

    mergeSortHelper(left, mid);
    mergeSortHelper(mid + 1, right);
    merge(left, mid, right);
  }

  mergeSortHelper(0, n - 1);

  steps.push({
    id: `step-${steps.length}`,
    type: 'SORTED',
    snapshot: [...arr],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    codeLine: 10,
    description: `Merge Sort complete! Array is fully sorted.`,
    stats: { comparisons, swaps, accesses },
  });

  return steps;
}

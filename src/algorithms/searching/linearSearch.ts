import type { AlgorithmStep } from '../../types/algorithm';

export function generateLinearSearchSteps(
  initialArray: number[],
  target: number
): AlgorithmStep<number[]>[] {
  const steps: AlgorithmStep<number[]>[] = [];
  const arr = [...initialArray];
  const n = arr.length;

  let comparisons = 0;
  let accesses = 0;

  steps.push({
    id: `step-0`,
    type: 'VISIT',
    snapshot: [...arr],
    codeLine: 1,
    description: `Initialized Linear Search searching for target value ${target} in ${n} elements.`,
    stats: { comparisons, swaps: 0, accesses },
  });

  let found = false;
  for (let i = 0; i < n; i++) {
    comparisons++;
    accesses++;

    steps.push({
      id: `step-${steps.length}`,
      type: 'COMPARE',
      snapshot: [...arr],
      highlightIndices: [i],
      codeLine: 3,
      description: `Checking index ${i}: Is A[${i}] (${arr[i]}) equal to target (${target})?`,
      stats: { comparisons, swaps: 0, accesses },
    });

    if (arr[i] === target) {
      found = true;
      steps.push({
        id: `step-${steps.length}`,
        type: 'FOUND',
        snapshot: [...arr],
        highlightIndices: [i],
        codeLine: 4,
        description: `Target ${target} successfully found at index ${i}!`,
        stats: { comparisons, swaps: 0, accesses },
      });
      break;
    }
  }

  if (!found) {
    steps.push({
      id: `step-${steps.length}`,
      type: 'NOT_FOUND',
      snapshot: [...arr],
      codeLine: 5,
      description: `Target ${target} was not found in the array.`,
      stats: { comparisons, swaps: 0, accesses },
    });
  }

  return steps;
}

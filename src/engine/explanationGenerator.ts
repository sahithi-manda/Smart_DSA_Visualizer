import type { AlgorithmStep } from '../types/algorithm';

export function generateHumanExplanation(step: AlgorithmStep): string {
  if (step.description && step.description.trim().length > 0) {
    return step.description;
  }

  const snapshot = step.snapshot;
  const h1 = step.highlightIndices?.[0];
  const h2 = step.highlightIndices?.[1];

  switch (step.type) {
    case 'COMPARE':
      if (Array.isArray(snapshot) && h1 !== undefined && h2 !== undefined) {
        const val1 = snapshot[h1];
        const val2 = snapshot[h2];
        return `Comparing A[${h1}] (${val1}) and A[${h2}] (${val2}). ${
          val1 > val2
            ? `${val1} > ${val2}, so a swap will be needed.`
            : `${val1} ≤ ${val2}, elements are already in order.`
        }`;
      }
      return 'Comparing adjacent elements.';

    case 'SWAP':
      if (Array.isArray(snapshot) && h1 !== undefined && h2 !== undefined) {
        return `Swapping A[${h1}] and A[${h2}] to place smaller element first.`;
      }
      return 'Swapping values.';

    case 'SORTED':
      if (step.sortedIndices && step.sortedIndices.length > 0) {
        return `Element at index ${step.sortedIndices.join(', ')} is now in its final sorted position.`;
      }
      return 'Marking element as sorted.';

    case 'PIVOT':
      if (step.pivotIndex !== undefined && Array.isArray(snapshot)) {
        return `Selected pivot element ${snapshot[step.pivotIndex]} at index ${step.pivotIndex}.`;
      }
      return 'Selecting pivot element.';

    case 'OVERWRITE':
      if (Array.isArray(snapshot) && h1 !== undefined) {
        return `Overwriting element at index ${h1} with value ${snapshot[h1]}.`;
      }
      return 'Writing element back to array.';

    case 'VISIT':
      if (h1 !== undefined) {
        return `Visiting node / index ${h1}.`;
      }
      return 'Visiting element.';

    case 'FOUND':
      if (h1 !== undefined) {
        return `Target match found at index ${h1}!`;
      }
      return 'Target value successfully found!';

    case 'NOT_FOUND':
      return 'Search space exhausted. Target element does not exist in the collection.';

    case 'PUSH':
      return `Pushed new value onto the top of the stack.`;

    case 'POP':
      return `Popped top value from the stack.`;

    case 'ENQUEUE':
      return `Enqueued element at the rear of the queue.`;

    case 'DEQUEUE':
      return `Dequeued element from the front of the queue.`;

    default:
      return 'Executing algorithm operation...';
  }
}

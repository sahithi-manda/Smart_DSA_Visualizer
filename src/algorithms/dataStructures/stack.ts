import type { AlgorithmStep } from '../../types/algorithm';

export interface StackState {
  items: number[];
  topPointer?: number;
}

export function generateStackSteps(operations: { type: 'push' | 'pop' | 'peek'; val?: number }[]): AlgorithmStep<StackState>[] {
  const steps: AlgorithmStep<StackState>[] = [];
  const items: number[] = [];

  steps.push({
    id: `step-0`,
    type: 'VISIT',
    snapshot: { items: [...items], topPointer: -1 },
    codeLine: 1,
    description: 'Initialized empty LIFO Stack structure.',
    stats: { comparisons: 0, swaps: 0, accesses: 0 },
  });

  for (const op of operations) {
    if (op.type === 'push' && op.val !== undefined) {
      items.push(op.val);
      steps.push({
        id: `step-${steps.length}`,
        type: 'PUSH',
        snapshot: { items: [...items], topPointer: items.length - 1 },
        highlightIndices: [items.length - 1],
        codeLine: 3,
        description: `Pushed element ${op.val} onto top of Stack.`,
        stats: { comparisons: 0, swaps: 0, accesses: items.length },
      });
    } else if (op.type === 'pop') {
      if (items.length === 0) {
        steps.push({
          id: `step-${steps.length}`,
          type: 'NOT_FOUND',
          snapshot: { items: [...items], topPointer: -1 },
          codeLine: 4,
          description: 'Stack Underflow! Cannot pop from empty stack.',
          stats: { comparisons: 0, swaps: 0, accesses: 0 },
        });
      } else {
        const popped = items.pop();
        steps.push({
          id: `step-${steps.length}`,
          type: 'POP',
          snapshot: { items: [...items], topPointer: items.length - 1 },
          codeLine: 4,
          description: `Popped top element ${popped} from Stack.`,
          stats: { comparisons: 0, swaps: 0, accesses: items.length },
        });
      }
    } else if (op.type === 'peek') {
      const topVal = items[items.length - 1];
      steps.push({
        id: `step-${steps.length}`,
        type: 'HIGHLIGHT',
        snapshot: { items: [...items], topPointer: items.length - 1 },
        highlightIndices: items.length > 0 ? [items.length - 1] : [],
        codeLine: 5,
        description: items.length > 0 ? `Peeked top element: ${topVal}.` : 'Stack is empty.',
        stats: { comparisons: 0, swaps: 0, accesses: 1 },
      });
    }
  }

  return steps;
}

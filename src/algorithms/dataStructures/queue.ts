import type { AlgorithmStep } from '../../types/algorithm';

export interface QueueState {
  items: number[];
  frontPointer: number;
  rearPointer: number;
}

export function generateQueueSteps(operations: { type: 'enqueue' | 'dequeue' | 'peek'; val?: number }[]): AlgorithmStep<QueueState>[] {
  const steps: AlgorithmStep<QueueState>[] = [];
  const items: number[] = [];

  steps.push({
    id: `step-0`,
    type: 'VISIT',
    snapshot: { items: [...items], frontPointer: -1, rearPointer: -1 },
    codeLine: 1,
    description: 'Initialized empty FIFO Queue structure.',
    stats: { comparisons: 0, swaps: 0, accesses: 0 },
  });

  for (const op of operations) {
    if (op.type === 'enqueue' && op.val !== undefined) {
      items.push(op.val);
      steps.push({
        id: `step-${steps.length}`,
        type: 'ENQUEUE',
        snapshot: { items: [...items], frontPointer: 0, rearPointer: items.length - 1 },
        highlightIndices: [items.length - 1],
        codeLine: 3,
        description: `Enqueued element ${op.val} at rear of Queue.`,
        stats: { comparisons: 0, swaps: 0, accesses: items.length },
      });
    } else if (op.type === 'dequeue') {
      if (items.length === 0) {
        steps.push({
          id: `step-${steps.length}`,
          type: 'NOT_FOUND',
          snapshot: { items: [...items], frontPointer: -1, rearPointer: -1 },
          codeLine: 4,
          description: 'Queue Underflow! Cannot dequeue from empty queue.',
          stats: { comparisons: 0, swaps: 0, accesses: 0 },
        });
      } else {
        const dequeued = items.shift();
        steps.push({
          id: `step-${steps.length}`,
          type: 'DEQUEUE',
          snapshot: {
            items: [...items],
            frontPointer: items.length > 0 ? 0 : -1,
            rearPointer: items.length > 0 ? items.length - 1 : -1,
          },
          codeLine: 4,
          description: `Dequeued element ${dequeued} from front of Queue.`,
          stats: { comparisons: 0, swaps: 0, accesses: items.length },
        });
      }
    } else if (op.type === 'peek') {
      steps.push({
        id: `step-${steps.length}`,
        type: 'HIGHLIGHT',
        snapshot: {
          items: [...items],
          frontPointer: items.length > 0 ? 0 : -1,
          rearPointer: items.length > 0 ? items.length - 1 : -1,
        },
        highlightIndices: items.length > 0 ? [0] : [],
        codeLine: 5,
        description: items.length > 0 ? `Peeked front element: ${items[0]}.` : 'Queue is empty.',
        stats: { comparisons: 0, swaps: 0, accesses: 1 },
      });
    }
  }

  return steps;
}

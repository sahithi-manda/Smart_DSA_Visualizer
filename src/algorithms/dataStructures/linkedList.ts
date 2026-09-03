import type { AlgorithmStep } from '../../types/algorithm';

export interface LinkedListNode {
  id: string;
  val: number;
  nextId: string | null;
}

export interface LinkedListState {
  nodes: LinkedListNode[];
  headId: string | null;
}

export function generateLinkedListSteps(
  initialValues: number[]
): AlgorithmStep<LinkedListState>[] {
  const steps: AlgorithmStep<LinkedListState>[] = [];
  const nodes: LinkedListNode[] = [];

  initialValues.forEach((val, idx) => {
    nodes.push({
      id: `node-${idx}`,
      val,
      nextId: idx < initialValues.length - 1 ? `node-${idx + 1}` : null,
    });
  });

  steps.push({
    id: `step-0`,
    type: 'VISIT',
    snapshot: { nodes: JSON.parse(JSON.stringify(nodes)), headId: nodes.length > 0 ? nodes[0].id : null },
    codeLine: 1,
    description: `Constructed Singly Linked List with ${nodes.length} nodes.`,
    stats: { comparisons: 0, swaps: 0, accesses: nodes.length },
  });

  // Example traversal step
  for (let i = 0; i < nodes.length; i++) {
    steps.push({
      id: `step-${steps.length}`,
      type: 'VISIT',
      snapshot: { nodes: JSON.parse(JSON.stringify(nodes)), headId: nodes[0].id },
      highlightIndices: [i],
      codeLine: 3,
      description: `Traversing node ${i + 1}/${nodes.length} with value ${nodes[i].val} (next -> ${nodes[i].nextId ? nodes[i + 1].val : 'NULL'}).`,
      stats: { comparisons: 0, swaps: 0, accesses: i + 1 },
    });
  }

  return steps;
}

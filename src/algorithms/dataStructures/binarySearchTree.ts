import type { AlgorithmStep } from '../../types/algorithm';

export interface BSTNode {
  id: string;
  val: number;
  leftId: string | null;
  rightId: string | null;
  x?: number;
  y?: number;
}

export interface BSTState {
  nodes: Record<string, BSTNode>;
  rootId: string | null;
  traversalResult?: number[];
}

export function generateBSTSteps(
  insertValues: number[]
): AlgorithmStep<BSTState>[] {
  const steps: AlgorithmStep<BSTState>[] = [];
  const nodes: Record<string, BSTNode> = {};
  let rootId: string | null = null;
  let counter = 0;

  steps.push({
    id: `step-0`,
    type: 'VISIT',
    snapshot: { nodes: {}, rootId: null },
    codeLine: 1,
    description: 'Initialized empty Binary Search Tree.',
    stats: { comparisons: 0, swaps: 0, accesses: 0 },
  });

  for (const val of insertValues) {
    const newId = `node-${++counter}`;
    const newNode: BSTNode = { id: newId, val, leftId: null, rightId: null };

    if (!rootId) {
      rootId = newId;
      nodes[newId] = newNode;
      steps.push({
        id: `step-${steps.length}`,
        type: 'PUSH',
        snapshot: { nodes: JSON.parse(JSON.stringify(nodes)), rootId },
        highlightIndices: [],
        codeLine: 3,
        description: `Inserted root node with value ${val}.`,
        stats: { comparisons: 0, swaps: 0, accesses: 1 },
      });
    } else {
      let currId: string | null = rootId;
      while (currId) {
        const currNode: BSTNode = nodes[currId];
        steps.push({
          id: `step-${steps.length}`,
          type: 'COMPARE',
          snapshot: { nodes: JSON.parse(JSON.stringify(nodes)), rootId },
          codeLine: 4,
          description: `Comparing insert value ${val} with current node ${currNode.val}.`,
          stats: { comparisons: 1, swaps: 0, accesses: 1 },
        });

        if (val < currNode.val) {
          if (!currNode.leftId) {
            currNode.leftId = newId;
            nodes[newId] = newNode;
            steps.push({
              id: `step-${steps.length}`,
              type: 'PUSH',
              snapshot: { nodes: JSON.parse(JSON.stringify(nodes)), rootId },
              codeLine: 5,
              description: `Inserted node ${val} to left of ${currNode.val}.`,
              stats: { comparisons: 1, swaps: 0, accesses: 2 },
            });
            break;
          }
          currId = currNode.leftId;
        } else {
          if (!currNode.rightId) {
            currNode.rightId = newId;
            nodes[newId] = newNode;
            steps.push({
              id: `step-${steps.length}`,
              type: 'PUSH',
              snapshot: { nodes: JSON.parse(JSON.stringify(nodes)), rootId },
              codeLine: 6,
              description: `Inserted node ${val} to right of ${currNode.val}.`,
              stats: { comparisons: 1, swaps: 0, accesses: 2 },
            });
            break;
          }
          currId = currNode.rightId;
        }
      }
    }
  }

  // Traversal Step (Inorder)
  const inorder: number[] = [];
  function inorderTraverse(nodeId: string | null) {
    if (!nodeId) return;
    inorderTraverse(nodes[nodeId].leftId);
    inorder.push(nodes[nodeId].val);
    inorderTraverse(nodes[nodeId].rightId);
  }
  if (rootId) inorderTraverse(rootId);

  steps.push({
    id: `step-${steps.length}`,
    type: 'SORTED',
    snapshot: { nodes: JSON.parse(JSON.stringify(nodes)), rootId, traversalResult: inorder },
    codeLine: 8,
    description: `Inorder traversal of BST yields sorted values: [${inorder.join(', ')}].`,
    stats: { comparisons: Object.keys(nodes).length, swaps: 0, accesses: Object.keys(nodes).length },
  });

  return steps;
}

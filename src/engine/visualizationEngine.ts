import type { AlgorithmStep } from '../types/algorithm';
import { generateBubbleSortSteps } from '../algorithms/sorting/bubbleSort';
import { generateSelectionSortSteps } from '../algorithms/sorting/selectionSort';
import { generateInsertionSortSteps } from '../algorithms/sorting/insertionSort';
import { generateMergeSortSteps } from '../algorithms/sorting/mergeSort';
import { generateQuickSortSteps } from '../algorithms/sorting/quickSort';
import { generateHeapSortSteps } from '../algorithms/sorting/heapSort';
import { generateLinearSearchSteps } from '../algorithms/searching/linearSearch';
import { generateBinarySearchSteps } from '../algorithms/searching/binarySearch';
import { generateStackSteps } from '../algorithms/dataStructures/stack';
import { generateQueueSteps } from '../algorithms/dataStructures/queue';
import { generateLinkedListSteps } from '../algorithms/dataStructures/linkedList';
import { generateBSTSteps } from '../algorithms/dataStructures/binarySearchTree';
import { generateHeapSteps } from '../algorithms/dataStructures/binaryHeap';
import { generateBFSSteps } from '../algorithms/graphs/bfs';
import type { GraphData } from '../algorithms/graphs/bfs';
import { generateDFSSteps } from '../algorithms/graphs/dfs';
import { generateDijkstraSteps } from '../algorithms/graphs/dijkstra';
import { generateAStarSteps } from '../algorithms/graphs/aStar';

export const SAMPLE_GRAPH: GraphData = {
  nodes: [
    { id: 'A', label: 'A', x: 80, y: 80 },
    { id: 'B', label: 'B', x: 220, y: 60 },
    { id: 'C', label: 'C', x: 360, y: 90 },
    { id: 'D', label: 'D', x: 120, y: 220 },
    { id: 'E', label: 'E', x: 280, y: 230 },
    { id: 'F', label: 'F', x: 420, y: 220 },
  ],
  edges: [
    { id: 'e1', source: 'A', target: 'B', weight: 4 },
    { id: 'e2', source: 'A', target: 'D', weight: 2 },
    { id: 'e3', source: 'B', target: 'C', weight: 5 },
    { id: 'e4', source: 'B', target: 'E', weight: 1 },
    { id: 'e5', source: 'C', target: 'F', weight: 3 },
    { id: 'e6', source: 'D', target: 'E', weight: 8 },
    { id: 'e7', source: 'E', target: 'F', weight: 2 },
  ],
};

// The visualizer hook always passes a random number array as input. Graph
// algorithms need a graph, so fall back to the sample graph for anything else.
function toGraph(inputData: unknown): GraphData {
  const candidate = inputData as Partial<GraphData> | undefined;
  return candidate && Array.isArray(candidate.nodes) && Array.isArray(candidate.edges)
    ? (candidate as GraphData)
    : SAMPLE_GRAPH;
}

export function getAlgorithmSteps(
  algorithmId: string,
  inputData: any,
  options?: { target?: number; searchTarget?: number }
): AlgorithmStep[] {
  switch (algorithmId) {
    case 'bubble-sort':
      return generateBubbleSortSteps(inputData || [45, 12, 89, 34, 67, 23, 90, 11]);
    case 'selection-sort':
      return generateSelectionSortSteps(inputData || [45, 12, 89, 34, 67, 23, 90, 11]);
    case 'insertion-sort':
      return generateInsertionSortSteps(inputData || [45, 12, 89, 34, 67, 23, 90, 11]);
    case 'merge-sort':
      return generateMergeSortSteps(inputData || [45, 12, 89, 34, 67, 23, 90, 11]);
    case 'quick-sort':
      return generateQuickSortSteps(inputData || [45, 12, 89, 34, 67, 23, 90, 11]);
    case 'heap-sort':
      return generateHeapSortSteps(inputData || [45, 12, 89, 34, 67, 23, 90, 11]);
    case 'linear-search':
      return generateLinearSearchSteps(
        inputData || [12, 23, 34, 45, 67, 89, 90],
        options?.searchTarget ?? 34
      );
    case 'binary-search':
      return generateBinarySearchSteps(
        inputData || [12, 23, 34, 45, 67, 89, 90],
        options?.searchTarget ?? 67
      );
    case 'stack':
      return generateStackSteps(
        inputData || [
          { type: 'push', val: 10 },
          { type: 'push', val: 20 },
          { type: 'push', val: 30 },
          { type: 'pop' },
          { type: 'peek' },
          { type: 'push', val: 40 },
        ]
      );
    case 'queue':
      return generateQueueSteps(
        inputData || [
          { type: 'enqueue', val: 10 },
          { type: 'enqueue', val: 20 },
          { type: 'enqueue', val: 30 },
          { type: 'dequeue' },
          { type: 'peek' },
        ]
      );
    case 'linked-list':
      return generateLinkedListSteps(inputData || [10, 20, 30, 40, 50]);
    case 'binary-search-tree':
      return generateBSTSteps(inputData || [50, 30, 70, 20, 40, 60, 80]);
    case 'binary-heap':
      return generateHeapSteps(inputData || [40, 10, 30, 50, 20]);
    case 'bfs':
      return generateBFSSteps(toGraph(inputData), 'A', 'F');
    case 'dfs':
      return generateDFSSteps(toGraph(inputData), 'A', 'F');
    case 'dijkstra':
      return generateDijkstraSteps(toGraph(inputData), 'A', 'F');
    case 'a-star':
      return generateAStarSteps(toGraph(inputData), 'A', 'F');
    default:
      return generateBubbleSortSteps(inputData || [45, 12, 89, 34, 67]);
  }
}

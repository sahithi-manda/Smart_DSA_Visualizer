import { describe, it, expect } from 'vitest';
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
import { generateBSTSteps } from '../algorithms/dataStructures/binarySearchTree';

describe('Sorting Algorithms Step Generator Correctness', () => {
  const testCases = [
    { name: 'random numbers', input: [45, 12, 89, 34, 67, 23, 90, 11] },
    { name: 'already sorted array', input: [1, 2, 3, 4, 5] },
    { name: 'reverse sorted array', input: [5, 4, 3, 2, 1] },
    { name: 'duplicates and negative numbers', input: [-5, 10, -5, 0, 3, 3] },
    { name: 'single element', input: [42] },
  ];

  testCases.forEach(({ name, input }) => {
    it(`Bubble Sort sorts ${name} correctly`, () => {
      const steps = generateBubbleSortSteps(input);
      const finalSnapshot = steps[steps.length - 1].snapshot;
      const expected = [...input].sort((a, b) => a - b);
      expect(finalSnapshot).toEqual(expected);
    });

    it(`Selection Sort sorts ${name} correctly`, () => {
      const steps = generateSelectionSortSteps(input);
      const finalSnapshot = steps[steps.length - 1].snapshot;
      const expected = [...input].sort((a, b) => a - b);
      expect(finalSnapshot).toEqual(expected);
    });

    it(`Insertion Sort sorts ${name} correctly`, () => {
      const steps = generateInsertionSortSteps(input);
      const finalSnapshot = steps[steps.length - 1].snapshot;
      const expected = [...input].sort((a, b) => a - b);
      expect(finalSnapshot).toEqual(expected);
    });

    it(`Merge Sort sorts ${name} correctly`, () => {
      const steps = generateMergeSortSteps(input);
      const finalSnapshot = steps[steps.length - 1].snapshot;
      const expected = [...input].sort((a, b) => a - b);
      expect(finalSnapshot).toEqual(expected);
    });

    it(`Quick Sort sorts ${name} correctly`, () => {
      const steps = generateQuickSortSteps(input);
      const finalSnapshot = steps[steps.length - 1].snapshot;
      const expected = [...input].sort((a, b) => a - b);
      expect(finalSnapshot).toEqual(expected);
    });

    it(`Heap Sort sorts ${name} correctly`, () => {
      const steps = generateHeapSortSteps(input);
      const finalSnapshot = steps[steps.length - 1].snapshot;
      const expected = [...input].sort((a, b) => a - b);
      expect(finalSnapshot).toEqual(expected);
    });
  });
});

describe('Searching Algorithms Correctness', () => {
  it('Linear Search finds target element', () => {
    const steps = generateLinearSearchSteps([10, 20, 30, 40], 30);
    const foundStep = steps.find((s) => s.type === 'FOUND');
    expect(foundStep).toBeDefined();
    expect(foundStep?.highlightIndices).toEqual([2]);
  });

  it('Binary Search finds target in sorted array', () => {
    const steps = generateBinarySearchSteps([10, 20, 30, 40, 50], 40);
    const foundStep = steps.find((s) => s.type === 'FOUND');
    expect(foundStep).toBeDefined();
    expect(foundStep?.highlightIndices).toEqual([3]);
  });
});

describe('Data Structure Generators Correctness', () => {
  it('Stack LIFO push/pop operations', () => {
    const steps = generateStackSteps([
      { type: 'push', val: 10 },
      { type: 'push', val: 20 },
      { type: 'pop' },
    ]);
    const finalState = steps[steps.length - 1].snapshot;
    expect(finalState.items).toEqual([10]);
  });

  it('Queue FIFO enqueue/dequeue operations', () => {
    const steps = generateQueueSteps([
      { type: 'enqueue', val: 10 },
      { type: 'enqueue', val: 20 },
      { type: 'dequeue' },
    ]);
    const finalState = steps[steps.length - 1].snapshot;
    expect(finalState.items).toEqual([20]);
  });

  it('BST Inorder traversal produces sorted output', () => {
    const steps = generateBSTSteps([50, 30, 70, 20, 40]);
    const finalState = steps[steps.length - 1].snapshot;
    expect(finalState.traversalResult).toEqual([20, 30, 40, 50, 70]);
  });
});

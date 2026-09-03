export type CategoryId = 'sorting' | 'searching' | 'dataStructures' | 'graphs';

export type StepType =
  | 'COMPARE'
  | 'SWAP'
  | 'SELECT'
  | 'INSERT'
  | 'OVERWRITE'
  | 'SORTED'
  | 'PIVOT'
  | 'VISIT'
  | 'FOUND'
  | 'NOT_FOUND'
  | 'HIGHLIGHT'
  | 'PUSH'
  | 'POP'
  | 'ENQUEUE'
  | 'DEQUEUE'
  | 'LINK'
  | 'EXPLORE_EDGE'
  | 'SET_DISTANCE'
  | 'SET_PATH';

export interface StepStats {
  comparisons?: number;
  swaps?: number;
  accesses?: number;
  extraMemory?: number;
}

export interface AlgorithmStep<T = any> {
  id: string;
  type: StepType;
  snapshot: T;
  highlightIndices?: number[];
  secondaryIndices?: number[];
  pivotIndex?: number;
  sortedIndices?: number[];
  codeLine?: number;
  description: string;
  stats: StepStats;
}

export interface ComplexityInfo {
  best: string;
  average: string;
  worst: string;
  space: string;
}

export interface AlgorithmInfo {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  complexity: ComplexityInfo;
  stable?: boolean;
  inPlace?: boolean;
  useCases: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  algorithmCount: number;
}

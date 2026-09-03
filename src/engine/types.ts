import type { AlgorithmStep } from '../types/algorithm';

export interface VisualizerState<T = any> {
  steps: AlgorithmStep<T>[];
  currentStepIndex: number;
  isPlaying: boolean;
  speed: number; // In milliseconds delay per step (10ms - 1000ms)
  isFinished: boolean;
  arraySize: number;
}

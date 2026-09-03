import { useState, useEffect, useRef, useCallback } from 'react';
import type { AlgorithmStep } from '../types/algorithm';
import { getAlgorithmSteps } from '../engine/visualizationEngine';

export function useVisualizer(algorithmId: string, initialSize: number = 10) {
  const [arraySize, setArraySize] = useState<number>(initialSize);
  const [inputArray, setInputArray] = useState<number[]>([]);
  const [searchTarget, setSearchTarget] = useState<number>(34);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(300); // ms per step
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Generate random array
  const generateRandomData = useCallback(
    (size: number = arraySize) => {
      const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
      setInputArray(arr);
      const generatedSteps = getAlgorithmSteps(algorithmId, arr, { searchTarget });
      setSteps(generatedSteps);
      setCurrentStepIndex(0);
      setIsPlaying(false);
    },
    [algorithmId, arraySize, searchTarget]
  );

  // Custom data setter
  const setCustomData = useCallback(
    (customArr: number[]) => {
      setInputArray(customArr);
      setArraySize(customArr.length);
      const generatedSteps = getAlgorithmSteps(algorithmId, customArr, { searchTarget });
      setSteps(generatedSteps);
      setCurrentStepIndex(0);
      setIsPlaying(false);
    },
    [algorithmId, searchTarget]
  );

  // Initial load
  useEffect(() => {
    generateRandomData(arraySize);
  }, [algorithmId, generateRandomData]);

  // Step ticker effect
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, steps.length]);

  const play = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const nextStep = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const restart = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const currentStep = steps[currentStepIndex] || null;
  const isFinished = currentStepIndex >= steps.length - 1 && steps.length > 0;

  return {
    inputArray,
    arraySize,
    setArraySize,
    searchTarget,
    setSearchTarget,
    steps,
    currentStepIndex,
    currentStep,
    isPlaying,
    isFinished,
    speed,
    setSpeed,
    play,
    pause,
    nextStep,
    prevStep,
    restart,
    generateRandomData,
    setCustomData,
    jumpToStep: (idx: number) => {
      setIsPlaying(false);
      setCurrentStepIndex(Math.max(0, Math.min(idx, steps.length - 1)));
    },
  };
}

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ALGORITHMS } from '../data/algorithmsData';
import { useVisualizer } from '../hooks/useVisualizer';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { ArrayVisualizer } from '../components/visualization/ArrayVisualizer';
import { StackVisualizer } from '../components/visualization/StackVisualizer';
import { QueueVisualizer } from '../components/visualization/QueueVisualizer';
import { LinkedListVisualizer } from '../components/visualization/LinkedListVisualizer';
import { BSTVisualizer } from '../components/visualization/BSTVisualizer';
import { GraphVisualizer } from '../components/visualization/GraphVisualizer';
import { ControlPanel } from '../components/controls/ControlPanel';
import { CodePanel } from '../components/code/CodePanel';
import { StatsPanel } from '../components/stats/StatsPanel';
import { AlgorithmInfoPanel } from '../components/info/AlgorithmInfoPanel';
import { SmartExplanationPanel } from '../components/explanation/SmartExplanationPanel';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface VisualizerPageProps {
  algorithmId: string;
  onSelectAlgorithm: (algorithmId: string) => void;
}

export const VisualizerPage: React.FC<VisualizerPageProps> = ({
  algorithmId,
  onSelectAlgorithm,
}) => {
  const algorithm = ALGORITHMS.find((a) => a.id === algorithmId) || ALGORITHMS[0];
  const currentIndex = ALGORITHMS.findIndex((a) => a.id === algorithm.id);
  const prevAlgo = ALGORITHMS[(currentIndex - 1 + ALGORITHMS.length) % ALGORITHMS.length];
  const nextAlgo = ALGORITHMS[(currentIndex + 1) % ALGORITHMS.length];

  const {
    inputArray,
    arraySize,
    setArraySize,
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
  } = useVisualizer(algorithm.id);

  // Hook keyboard navigation (Space, Arrow keys, R)
  useKeyboardShortcuts({
    onPlayPause: () => (isPlaying ? pause() : play()),
    onNextStep: nextStep,
    onPrevStep: prevStep,
    onRestart: restart,
  });

  const renderVisualizationCanvas = () => {
    switch (algorithm.category) {
      case 'sorting':
      case 'searching':
        return <ArrayVisualizer currentStep={currentStep} inputArray={inputArray} />;
      case 'dataStructures':
        if (algorithm.id === 'stack') return <StackVisualizer currentStep={currentStep} />;
        if (algorithm.id === 'queue') return <QueueVisualizer currentStep={currentStep} />;
        if (algorithm.id === 'linked-list')
          return <LinkedListVisualizer currentStep={currentStep} />;
        if (algorithm.id === 'binary-search-tree' || algorithm.id === 'binary-heap')
          return <BSTVisualizer currentStep={currentStep} />;
        return <ArrayVisualizer currentStep={currentStep} inputArray={inputArray} />;
      case 'graphs':
        return <GraphVisualizer currentStep={currentStep} />;
      default:
        return <ArrayVisualizer currentStep={currentStep} inputArray={inputArray} />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {algorithm.name}
            </h1>
            <Badge variant="blue">{algorithm.category}</Badge>
            <Badge
              variant={
                algorithm.difficulty === 'Easy'
                  ? 'emerald'
                  : algorithm.difficulty === 'Medium'
                  ? 'amber'
                  : 'rose'
              }
            >
              {algorithm.difficulty}
            </Badge>
          </div>
          <p className="text-xs text-gray-400 max-w-2xl">{algorithm.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectAlgorithm(prevAlgo.id)}
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            {prevAlgo.name}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectAlgorithm(nextAlgo.id)}
          >
            <span>{nextAlgo.name}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* Main Grid: Visualizer Canvas + Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Canvas, Smart Explanation, Control Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Animation Stage */}
          {renderVisualizationCanvas()}

          {/* Smart Explanation Banner */}
          <SmartExplanationPanel
            currentStep={currentStep}
            currentStepIndex={currentStepIndex}
          />

          {/* Control Toolbar */}
          <ControlPanel
            isPlaying={isPlaying}
            isFinished={isFinished}
            currentStepIndex={currentStepIndex}
            totalSteps={steps.length}
            speed={speed}
            arraySize={arraySize}
            onPlay={play}
            onPause={pause}
            onNextStep={nextStep}
            onPrevStep={prevStep}
            onRestart={restart}
            onSpeedChange={setSpeed}
            onArraySizeChange={(sz) => {
              setArraySize(sz);
              generateRandomData(sz);
            }}
            onRandomize={() => generateRandomData(arraySize)}
            onCustomInput={setCustomData}
          />
        </div>

        {/* Right Column (1 span): Code Panel, Stats Panel, Info Panel */}
        <div className="space-y-6 flex flex-col justify-between">
          <StatsPanel
            stats={currentStep?.stats}
            currentStepIndex={currentStepIndex}
            totalSteps={steps.length}
          />

          <CodePanel
            algorithmId={algorithm.id}
            activeLine={currentStep?.codeLine}
          />

          <AlgorithmInfoPanel algorithm={algorithm} />
        </div>
      </div>
    </div>
  );
};

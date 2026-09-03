import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Shuffle,
  SlidersHorizontal,
  Edit3,
  X,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../ui/Button';

interface ControlPanelProps {
  isPlaying: boolean;
  isFinished: boolean;
  currentStepIndex: number;
  totalSteps: number;
  speed: number;
  arraySize: number;
  onPlay: () => void;
  onPause: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onRestart: () => void;
  onSpeedChange: (speed: number) => void;
  onArraySizeChange: (size: number) => void;
  onRandomize: () => void;
  onCustomInput: (arr: number[]) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isPlaying,
  currentStepIndex,
  totalSteps,
  speed,
  arraySize,
  onPlay,
  onPause,
  onNextStep,
  onPrevStep,
  onRestart,
  onSpeedChange,
  onArraySizeChange,
  onRandomize,
  onCustomInput,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customInputText, setCustomInputText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customInputText.trim()) {
      setErrorMessage('Please enter comma-separated numbers.');
      return;
    }

    const tokens = customInputText.split(',').map((t) => t.trim());
    const parsedNumbers: number[] = [];

    for (const t of tokens) {
      if (!t) continue;
      const num = Number(t);
      if (isNaN(num)) {
        setErrorMessage(`Invalid input: "${t}" is not a valid number. Please enter numbers separated by commas.`);
        return;
      }
      parsedNumbers.push(num);
    }

    if (parsedNumbers.length === 0) {
      setErrorMessage('Please enter at least one valid number.');
      return;
    }

    if (parsedNumbers.length > 50) {
      setErrorMessage('Maximum array size is 50 elements for clear visualization.');
      return;
    }

    onCustomInput(parsedNumbers);
    setIsModalOpen(false);
    setCustomInputText('');
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-4 space-y-4 shadow-xl">
      {/* Top row: Playback buttons & step counter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRestart}
            title="Restart (R)"
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Restart
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onPrevStep}
            disabled={currentStepIndex === 0 || isPlaying}
            title="Previous Step (Left Arrow)"
            icon={<SkipBack className="w-4 h-4" />}
          >
            Prev
          </Button>

          {isPlaying ? (
            <Button
              variant="danger"
              size="md"
              onClick={onPause}
              title="Pause (Space)"
              icon={<Pause className="w-4 h-4 fill-current" />}
            >
              Pause
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={onPlay}
              title="Play (Space)"
              icon={<Play className="w-4 h-4 fill-current" />}
            >
              Play
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={onNextStep}
            disabled={currentStepIndex >= totalSteps - 1 || isPlaying}
            title="Next Step (Right Arrow)"
            icon={<SkipForward className="w-4 h-4" />}
          >
            Next
          </Button>
        </div>

        {/* Step Scrubber / Counter */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-gray-400">
            Step <strong className="text-white">{totalSteps > 0 ? currentStepIndex + 1 : 0}</strong> / {totalSteps}
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={onRandomize}
            icon={<Shuffle className="w-3.5 h-3.5" />}
          >
            Randomize
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            icon={<Edit3 className="w-3.5 h-3.5" />}
          >
            Custom Array
          </Button>
        </div>
      </div>

      {/* Bottom row: Speed & Size Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-gray-800/60 text-xs">
        {/* Speed Slider */}
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="text-gray-400 font-medium w-16">Speed:</span>
          <input
            type="range"
            min="20"
            max="800"
            step="20"
            value={820 - speed} // Inverse so right is faster
            onChange={(e) => onSpeedChange(820 - Number(e.target.value))}
            className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span className="text-gray-400 font-mono text-[11px] w-12 text-right">{speed}ms</span>
        </div>

        {/* Array Size Slider */}
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-gray-400 font-medium w-16">Size:</span>
          <input
            type="range"
            min="5"
            max="50"
            step="1"
            value={arraySize}
            onChange={(e) => onArraySizeChange(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <span className="text-gray-400 font-mono text-[11px] w-12 text-right">{arraySize} items</span>
        </div>
      </div>

      {/* Custom Array Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Input Custom Array</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Enter numbers separated by commas (e.g. <code className="text-blue-400">45, 12, 89, 34, 67</code>).
            </p>

            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <textarea
                rows={3}
                value={customInputText}
                onChange={(e) => setCustomInputText(e.target.value)}
                placeholder="e.g. 5, 12, 8, 30, 24, 15"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 font-mono"
              />

              {errorMessage && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)} type="button">
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Apply Array
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

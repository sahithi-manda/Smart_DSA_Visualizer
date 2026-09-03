import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import type { AlgorithmStep } from '../../types/algorithm';
import { generateHumanExplanation } from '../../engine/explanationGenerator';
import { Badge } from '../ui/Badge';

interface SmartExplanationPanelProps {
  currentStep: AlgorithmStep | null;
  currentStepIndex: number;
}

export const SmartExplanationPanel: React.FC<SmartExplanationPanelProps> = ({
  currentStep,
  currentStepIndex,
}) => {
  if (!currentStep) return null;

  const explanation = generateHumanExplanation(currentStep);

  const getStepBadgeColor = (type: string) => {
    switch (type) {
      case 'COMPARE':
        return 'amber';
      case 'SWAP':
        return 'rose';
      case 'SORTED':
        return 'emerald';
      case 'PIVOT':
        return 'purple';
      case 'FOUND':
        return 'emerald';
      case 'NOT_FOUND':
        return 'rose';
      default:
        return 'blue';
    }
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-gradient-to-r from-gray-900 via-gray-900 to-blue-950/30 p-4 space-y-2 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Smart Explanation
          </h3>
          <span className="text-[10px] text-gray-500 font-mono">Step #{currentStepIndex + 1}</span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={getStepBadgeColor(currentStep.type)}>{currentStep.type}</Badge>
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
        </div>
      </div>

      <p className="text-sm font-medium text-gray-200 leading-relaxed pt-1">
        {explanation}
      </p>
    </div>
  );
};

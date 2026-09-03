import React from 'react';
import { Info, CheckCircle2, ShieldCheck, Database } from 'lucide-react';
import type { AlgorithmInfo } from '../../types/algorithm';
import { Badge } from '../ui/Badge';

interface AlgorithmInfoPanelProps {
  algorithm: AlgorithmInfo;
}

export const AlgorithmInfoPanel: React.FC<AlgorithmInfoPanelProps> = ({ algorithm }) => {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-5 space-y-5 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {algorithm.name} Overview
          </h3>
        </div>

        <div className="flex gap-2">
          {algorithm.stable !== undefined && (
            <Badge variant={algorithm.stable ? 'emerald' : 'rose'}>
              {algorithm.stable ? 'Stable' : 'Unstable'}
            </Badge>
          )}
          {algorithm.inPlace !== undefined && (
            <Badge variant={algorithm.inPlace ? 'blue' : 'purple'}>
              {algorithm.inPlace ? 'In-Place' : 'Out-of-Place'}
            </Badge>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-300 leading-relaxed">{algorithm.description}</p>

      {/* Complexity Table */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-cyan-400" />
          <span>Complexity Analysis</span>
        </h4>

        <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-950/80">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-900/80 text-gray-400 border-b border-gray-800">
              <tr>
                <th className="px-3 py-2">Case</th>
                <th className="px-3 py-2 text-right">Time Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-mono text-gray-300">
              <tr>
                <td className="px-3 py-2 text-gray-400 font-sans">Best Case</td>
                <td className="px-3 py-2 text-right font-bold text-emerald-400">
                  {algorithm.complexity.best}
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-gray-400 font-sans">Average Case</td>
                <td className="px-3 py-2 text-right font-bold text-amber-400">
                  {algorithm.complexity.average}
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-gray-400 font-sans">Worst Case</td>
                <td className="px-3 py-2 text-right font-bold text-rose-400">
                  {algorithm.complexity.worst}
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-gray-400 font-sans">Auxiliary Space</td>
                <td className="px-3 py-2 text-right font-bold text-cyan-400">
                  {algorithm.complexity.space}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Use cases */}
      <div className="space-y-2 pt-2 border-t border-gray-800">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Recommended Use Cases</span>
        </h4>
        <ul className="space-y-1.5 text-xs text-gray-300">
          {algorithm.useCases.map((useCase, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{useCase}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

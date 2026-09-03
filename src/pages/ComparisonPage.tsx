import React, { useState } from 'react';
import { GitCompare, RefreshCw, BarChart2 } from 'lucide-react';
import { ALGORITHMS } from '../data/algorithmsData';
import { getAlgorithmSteps } from '../engine/visualizationEngine';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const ComparisonPage: React.FC = () => {
  const sortingAlgos = ALGORITHMS.filter((a) => a.category === 'sorting');
  const [selectedAlgoIds, setSelectedAlgoIds] = useState<string[]>([
    'bubble-sort',
    'insertion-sort',
    'merge-sort',
    'quick-sort',
  ]);

  const [testArraySize, setTestArraySize] = useState<number>(20);
  const [benchmarkSeed, setBenchmarkSeed] = useState<number[]>(() =>
    Array.from({ length: 20 }, () => Math.floor(Math.random() * 90) + 10)
  );

  const toggleSelectAlgo = (id: string) => {
    if (selectedAlgoIds.includes(id)) {
      if (selectedAlgoIds.length > 2) {
        setSelectedAlgoIds(selectedAlgoIds.filter((item) => item !== id));
      }
    } else {
      if (selectedAlgoIds.length < 4) {
        setSelectedAlgoIds([...selectedAlgoIds, id]);
      }
    }
  };

  const regenerateSeed = () => {
    const newArr = Array.from({ length: testArraySize }, () =>
      Math.floor(Math.random() * 90) + 10
    );
    setBenchmarkSeed(newArr);
  };

  // Run benchmark step calculations on the exact same array seed
  const benchmarkResults = selectedAlgoIds.map((id) => {
    const algo = ALGORITHMS.find((a) => a.id === id)!;
    const steps = getAlgorithmSteps(id, [...benchmarkSeed]);
    const finalStep = steps[steps.length - 1];
    return {
      algo,
      stepsCount: steps.length,
      comparisons: finalStep?.stats?.comparisons ?? 0,
      swaps: finalStep?.stats?.swaps ?? 0,
      accesses: finalStep?.stats?.accesses ?? 0,
    };
  });

  const maxComparisons = Math.max(...benchmarkResults.map((r) => r.comparisons), 1);
  const maxSwaps = Math.max(...benchmarkResults.map((r) => r.swaps), 1);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs uppercase tracking-wider">
          <GitCompare className="w-4 h-4" />
          <span>Benchmarking Utility</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Algorithm Comparison Mode
        </h1>
        <p className="text-sm text-gray-400">
          Compare head-to-head performance, comparisons, swaps, and execution steps on identical input datasets.
        </p>
      </div>

      {/* Algorithm Selector & Config */}
      <Card className="space-y-5 bg-gray-900/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Select 2 - 4 Algorithms to Compare
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Array Size:</span>
            <input
              type="range"
              min="10"
              max="40"
              value={testArraySize}
              onChange={(e) => {
                const sz = Number(e.target.value);
                setTestArraySize(sz);
                setBenchmarkSeed(
                  Array.from({ length: sz }, () => Math.floor(Math.random() * 90) + 10)
                );
              }}
              className="w-28 accent-blue-500"
            />
            <span className="text-xs font-mono text-gray-300">{testArraySize} items</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={regenerateSeed}
              icon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              New Seed
            </Button>
          </div>
        </div>

        {/* Algorithm Badges */}
        <div className="flex flex-wrap gap-2">
          {sortingAlgos.map((algo) => {
            const isSelected = selectedAlgoIds.includes(algo.id);
            return (
              <button
                key={algo.id}
                onClick={() => toggleSelectAlgo(algo.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600/20 text-blue-400 border-blue-500 shadow-sm'
                    : 'bg-gray-950 text-gray-400 border-gray-800 hover:border-gray-700'
                }`}
              >
                {algo.name} {isSelected && '✓'}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Head to Head Benchmark Table */}
      <Card className="space-y-4 bg-gray-900/90 overflow-hidden">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-cyan-400" />
          <span>Execution Performance Comparison</span>
        </h3>

        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-950 text-gray-400 border-b border-gray-800 font-semibold">
              <tr>
                <th className="p-3">Algorithm</th>
                <th className="p-3">Best</th>
                <th className="p-3">Average</th>
                <th className="p-3">Worst</th>
                <th className="p-3">Space</th>
                <th className="p-3 text-right">Comparisons</th>
                <th className="p-3 text-right">Swaps</th>
                <th className="p-3 text-right">Total Steps</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-mono text-gray-300">
              {benchmarkResults.map(({ algo, stepsCount, comparisons, swaps }) => (
                <tr key={algo.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="p-3 font-sans font-bold text-white flex items-center gap-2">
                    <span>{algo.name}</span>
                    <Badge variant={algo.stable ? 'emerald' : 'rose'}>
                      {algo.stable ? 'Stable' : 'Unstable'}
                    </Badge>
                  </td>
                  <td className="p-3 text-emerald-400 font-bold">{algo.complexity.best}</td>
                  <td className="p-3 text-amber-400 font-bold">{algo.complexity.average}</td>
                  <td className="p-3 text-rose-400 font-bold">{algo.complexity.worst}</td>
                  <td className="p-3 text-cyan-400 font-bold">{algo.complexity.space}</td>
                  <td className="p-3 text-right font-bold text-amber-400">{comparisons}</td>
                  <td className="p-3 text-right font-bold text-rose-400">{swaps}</td>
                  <td className="p-3 text-right font-bold text-blue-400">{stepsCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Visual Chart Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Comparisons Chart */}
        <Card className="space-y-4 bg-gray-900/90">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Comparisons Metric
          </h4>
          <div className="space-y-3 pt-2">
            {benchmarkResults.map(({ algo, comparisons }) => {
              const widthPct = Math.max(8, (comparisons / maxComparisons) * 100);
              return (
                <div key={algo.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-300 font-sans font-semibold">{algo.name}</span>
                    <span className="text-amber-400 font-bold">{comparisons}</span>
                  </div>
                  <div className="w-full bg-gray-950 h-3 rounded-full overflow-hidden border border-gray-800">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Swaps Chart */}
        <Card className="space-y-4 bg-gray-900/90">
          <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
            Swaps / Memory Writes Metric
          </h4>
          <div className="space-y-3 pt-2">
            {benchmarkResults.map(({ algo, swaps }) => {
              const widthPct = Math.max(8, (swaps / maxSwaps) * 100);
              return (
                <div key={algo.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-300 font-sans font-semibold">{algo.name}</span>
                    <span className="text-rose-400 font-bold">{swaps}</span>
                  </div>
                  <div className="w-full bg-gray-950 h-3 rounded-full overflow-hidden border border-gray-800">
                    <div
                      className="bg-rose-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

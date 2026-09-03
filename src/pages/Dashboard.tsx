import React from 'react';
import {
  ArrowDownUp,
  Search,
  Layers,
  Network,
  Play,
  Sparkles,
  GitCompare,
  CheckCircle2,
  Zap,
  BookOpen,
} from 'lucide-react';
import { CATEGORIES, ALGORITHMS } from '../data/algorithmsData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import type { CategoryId } from '../types/algorithm';

interface DashboardProps {
  onSelectAlgorithm: (algorithmId: string) => void;
  onNavigate: (view: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectAlgorithm, onNavigate }) => {
  // Algorithm of the Day: Quick Sort or Dijkstra
  const algorithmOfTheDay = ALGORITHMS.find((a) => a.id === 'quick-sort') || ALGORITHMS[0];

  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'sorting':
        return <ArrowDownUp className="w-6 h-6 text-blue-400" />;
      case 'searching':
        return <Search className="w-6 h-6 text-cyan-400" />;
      case 'dataStructures':
        return <Layers className="w-6 h-6 text-emerald-400" />;
      case 'graphs':
        return <Network className="w-6 h-6 text-purple-400" />;
    }
  };

  const getCategoryColor = (id: CategoryId) => {
    switch (id) {
      case 'sorting':
        return 'from-blue-500/20 to-blue-600/5 border-blue-500/30 text-blue-400';
      case 'searching':
        return 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/30 text-cyan-400';
      case 'dataStructures':
        return 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 text-emerald-400';
      case 'graphs':
        return 'from-purple-500/20 to-purple-600/5 border-purple-500/30 text-purple-400';
    }
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-blue-950/40 p-8 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Data Structures & Algorithms Engine</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Smart DSA Visualizer
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed">
            Understand algorithms by seeing them in action. Step-by-step animations, synchronized code highlighting, dynamic human-readable explanations, and deep execution analytics.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              size="lg"
              icon={<Play className="w-5 h-5 fill-current" />}
              onClick={() => onSelectAlgorithm('bubble-sort')}
            >
              Quick Start Visualizer
            </Button>

            <Button
              variant="outline"
              size="lg"
              icon={<GitCompare className="w-5 h-5" />}
              onClick={() => onNavigate('compare')}
            >
              Compare Algorithms
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-400" />
            <span>Explore Categories</span>
          </h2>
          <span className="text-xs text-gray-400">17 Interactive Algorithms</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => (
            <Card
              key={cat.id}
              interactive
              className={`bg-gradient-to-b ${getCategoryColor(cat.id)} flex flex-col justify-between h-48`}
              onClick={() => {
                const firstAlgo = ALGORITHMS.find((a) => a.category === cat.id);
                if (firstAlgo) onSelectAlgorithm(firstAlgo.id);
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-gray-900/80 border border-gray-800">
                    {getCategoryIcon(cat.id)}
                  </div>
                  <Badge variant="gray">{cat.algorithmCount} Algorithms</Badge>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{cat.name}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">{cat.description}</p>
                </div>
              </div>

              <div className="flex items-center text-xs font-semibold text-gray-300 group-hover:text-white pt-2 border-t border-gray-800/60">
                <span>Start Exploring</span>
                <span className="ml-auto">→</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Section: Algorithm of the Day & Highlights */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Algorithm of the Day */}
        <Card className="lg:col-span-2 space-y-5 bg-gradient-to-br from-gray-900 to-gray-950 border-blue-900/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Algorithm of the Day</span>
            </div>
            <Badge variant="amber">{algorithmOfTheDay.difficulty}</Badge>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">{algorithmOfTheDay.name}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {algorithmOfTheDay.description}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-gray-950/80 p-3 rounded-lg border border-gray-800">
            <div>
              <span className="text-gray-500 block">Best Case</span>
              <span className="font-mono font-bold text-emerald-400">{algorithmOfTheDay.complexity.best}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Average Case</span>
              <span className="font-mono font-bold text-amber-400">{algorithmOfTheDay.complexity.average}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Worst Case</span>
              <span className="font-mono font-bold text-rose-400">{algorithmOfTheDay.complexity.worst}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Space</span>
              <span className="font-mono font-bold text-cyan-400">{algorithmOfTheDay.complexity.space}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              {algorithmOfTheDay.stable !== undefined && (
                <Badge variant={algorithmOfTheDay.stable ? 'emerald' : 'rose'}>
                  {algorithmOfTheDay.stable ? 'Stable' : 'Unstable'}
                </Badge>
              )}
              {algorithmOfTheDay.inPlace !== undefined && (
                <Badge variant={algorithmOfTheDay.inPlace ? 'blue' : 'purple'}>
                  {algorithmOfTheDay.inPlace ? 'In-Place' : 'Out-of-Place'}
                </Badge>
              )}
            </div>

            <Button
              size="sm"
              icon={<Play className="w-3.5 h-3.5 fill-current" />}
              onClick={() => onSelectAlgorithm(algorithmOfTheDay.id)}
            >
              Launch Visualizer
            </Button>
          </div>
        </Card>

        {/* Feature Highlights */}
        <Card className="space-y-4 bg-gray-900/60">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>Core Engine Features</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-950/60 border border-gray-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-gray-200 block">Decoupled Action Engine</span>
                <span className="text-gray-400">Time-travel mechanics with step forward, backward, and variable playback speeds.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-950/60 border border-gray-800">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-gray-200 block">Synced Multi-Language Code</span>
                <span className="text-gray-400">Highlights precise execution lines in Python and TypeScript as animation steps run.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-950/60 border border-gray-800">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-gray-200 block">Smart Human Explanations</span>
                <span className="text-gray-400">Contextual natural-language breakdown of every comparison, swap, and visit.</span>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

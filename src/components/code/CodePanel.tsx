import React, { useState } from 'react';
import { Code2, Check, Copy } from 'lucide-react';
import { CODE_SNIPPETS } from '../../data/codeSnippets';

interface CodePanelProps {
  algorithmId: string;
  activeLine?: number;
}

export const CodePanel: React.FC<CodePanelProps> = ({ algorithmId, activeLine }) => {
  const [activeLang, setActiveLang] = useState<'python' | 'typescript'>('python');
  const [copied, setCopied] = useState(false);

  const snippet = CODE_SNIPPETS[algorithmId] || CODE_SNIPPETS['bubble-sort'];
  const codeLines = snippet[activeLang] || [];

  const handleCopy = () => {
    navigator.clipboard.writeText(codeLines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/90 overflow-hidden flex flex-col h-full shadow-xl">
      {/* Code Header & Tabs */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-950 border-b border-gray-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
          <Code2 className="w-4 h-4 text-blue-400" />
          <span>Source Code</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Tabs */}
          <div className="flex bg-gray-900 p-0.5 rounded-lg border border-gray-800 text-xs">
            <button
              onClick={() => setActiveLang('python')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeLang === 'python'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setActiveLang('typescript')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeLang === 'typescript'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              TypeScript
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-gray-200 transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="p-4 font-mono text-xs overflow-x-auto flex-1 bg-gray-950/60">
        <pre className="space-y-1">
          {codeLines.map((line, idx) => {
            const lineNum = idx + 1;
            const isHighlighted = activeLine === lineNum;

            return (
              <div
                key={idx}
                className={`flex items-center px-2 py-0.5 rounded transition-colors ${
                  isHighlighted
                    ? 'bg-blue-500/20 border-l-2 border-blue-400 font-bold text-white shadow-sm'
                    : 'text-gray-400 hover:bg-gray-900/40'
                }`}
              >
                <span className="w-8 shrink-0 text-gray-600 select-none text-right pr-3 font-mono">
                  {lineNum}
                </span>
                <span className="whitespace-pre">{line}</span>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};

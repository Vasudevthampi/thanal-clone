import React, { useState } from 'react';
import { Terminal, Copy, Check, ExternalLink, X, FolderGit2, Rocket, Image, ShieldCheck } from 'lucide-react';

interface VsCodeDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VsCodeDeployModal: React.FC<VsCodeDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'vscode' | 'photos' | 'deploy'>('vscode');

  if (!isOpen) return null;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="deploy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-stone-100 dark:border-stone-800">
          <div>
            <h2 id="deploy-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-forest-950 dark:text-stone-100">
              VS Code Setup & Deployment Guide
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
              Run the landscape design site locally in Visual Studio Code and deploy it to production.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Guide"
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>



        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 mt-6 bg-stone-100 dark:bg-stone-800/60 rounded-lg">
          <button
            onClick={() => setActiveTab('vscode')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'vscode'
                ? 'bg-white dark:bg-stone-800 text-forest-950 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <FolderGit2 className="w-4 h-4 text-forest-700" />
            <span>1. Run in VS Code</span>
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'photos'
                ? 'bg-white dark:bg-stone-800 text-forest-950 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Image className="w-4 h-4 text-forest-700" />
            <span>2. Add Photos & Logo</span>
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'deploy'
                ? 'bg-white dark:bg-stone-800 text-forest-950 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Rocket className="w-4 h-4 text-forest-700" />
            <span>3. Deploy to Web</span>
          </button>
        </div>

        {/* Content Tab 1: VS Code */}
        {activeTab === 'vscode' && (
          <div className="mt-6 space-y-4 text-sm text-stone-700 dark:text-stone-300">
            <div className="p-4 bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 rounded-xl space-y-3">
              <h3 className="font-semibold text-forest-900 dark:text-stone-200 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-forest-900 text-white text-xs">1</span>
                Open the project in VS Code
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Launch Visual Studio Code, press <kbd className="px-1.5 py-0.5 text-[10px] bg-stone-200 dark:bg-stone-700 rounded font-mono">File &gt; Open Folder</kbd>, and select this project directory.
              </p>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 rounded-xl space-y-3">
              <h3 className="font-semibold text-forest-900 dark:text-stone-200 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-forest-900 text-white text-xs">2</span>
                Install dependencies & start local server
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Open the VS Code integrated terminal (<kbd className="px-1.5 py-0.5 text-[10px] bg-stone-200 dark:bg-stone-700 rounded font-mono">Ctrl + `</kbd> or <kbd className="px-1.5 py-0.5 text-[10px] bg-stone-200 dark:bg-stone-700 rounded font-mono">Cmd + `</kbd>) and run:
              </p>
              
              <div className="space-y-3">
                {/* OS switcher / Windows Callout */}
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg text-xs text-amber-900 dark:text-amber-200">
                  <p className="font-semibold flex items-center gap-1.5">
                    <span>💡 Windows PowerShell Tip:</span>
                  </p>
                  <p className="mt-1 text-amber-800 dark:text-amber-300/90 text-[11px] leading-relaxed">
                    Windows PowerShell 5.1 does not support the <code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded font-mono font-bold text-amber-950 dark:text-amber-100">&&</code> token. Run the commands one at a time, or separate them with a semicolon (<code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded font-mono font-bold text-amber-950 dark:text-amber-100">;</code>).
                  </p>
                </div>

                {/* Windows PowerShell Command */}
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
                    <span className="font-medium text-forest-800 dark:text-emerald-400">Windows (PowerShell / VS Code default on Windows):</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-stone-900 text-emerald-400 font-mono text-xs rounded-lg">
                    <span>npm install; npm run dev</span>
                    <button
                      onClick={() => handleCopy('npm install; npm run dev', 1)}
                      className="p-1.5 text-stone-400 hover:text-white transition-colors"
                      aria-label="Copy PowerShell command"
                    >
                      {copiedIndex === 1 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* macOS / Linux / Bash / CMD */}
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
                    <span>macOS / Linux / Command Prompt / Git Bash:</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-stone-900 text-stone-300 font-mono text-xs rounded-lg">
                    <span>npm install && npm run dev</span>
                    <button
                      onClick={() => handleCopy('npm install && npm run dev', 4)}
                      className="p-1.5 text-stone-400 hover:text-white transition-colors"
                      aria-label="Copy Bash command"
                    >
                      {copiedIndex === 4 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-xs text-stone-500">
                Or simply run <code className="bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded font-mono">npm install</code>, wait for it to complete, and then run <code className="bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded font-mono">npm run dev</code>. The terminal will display <code className="text-forest-700 dark:text-emerald-400 font-mono">Local: http://localhost:3000</code>.
              </p>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 rounded-xl space-y-2">
              <h3 className="font-semibold text-forest-900 dark:text-stone-200 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-forest-900 text-white text-xs">3</span>
                Run automated tests in VS Code
              </h3>
              <div className="flex items-center justify-between p-3 bg-stone-900 text-emerald-400 font-mono text-xs rounded-lg">
                <span>npx tsx --test src/utils/estimator.test.ts</span>
                <button
                  onClick={() => handleCopy('npx tsx --test src/utils/estimator.test.ts', 2)}
                  className="p-1.5 text-stone-400 hover:text-white transition-colors"
                  aria-label="Copy test command"
                >
                  {copiedIndex === 2 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab 2: Photos & Logo */}
        {activeTab === 'photos' && (
          <div className="mt-6 space-y-4 text-sm text-stone-700 dark:text-stone-300">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl">
              <h3 className="font-semibold text-forest-900 dark:text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-forest-700" />
                Two Easy Ways to Add Photos &amp; a Logo
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                You can either upload them right in this web preview using the <strong>"Custom Photos &amp; Logo"</strong> button in the top bar, or place the image files directly into the VS Code project folder.
              </p>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 rounded-xl space-y-3">
              <h4 className="font-semibold text-forest-900 dark:text-stone-200 text-xs uppercase tracking-wider">
                Permanent File Locations in VS Code:
              </h4>
              <ul className="text-xs space-y-2 font-mono text-stone-600 dark:text-stone-400">
                <li className="flex items-center justify-between p-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded">
                  <span>/public/images/logo.png</span>
                  <span className="font-sans text-[11px] text-stone-500">Your company logo (PNG/SVG)</span>
                </li>
                <li className="flex items-center justify-between p-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded">
                  <span>/public/images/hero.jpg</span>
                  <span className="font-sans text-[11px] text-stone-500">Main hero landscape banner (16:9)</span>
                </li>
                <li className="flex items-center justify-between p-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded">
                  <span>/public/images/projects/</span>
                  <span className="font-sans text-[11px] text-stone-500">Showcase photos for villa &amp; courtyards</span>
                </li>
              </ul>
              <p className="text-xs text-stone-500 mt-2">
                Whenever you add images to the <code className="font-mono">/public</code> folder, they are instantly available at <code className="font-mono">/images/your-photo.jpg</code> without needing to recompile!
              </p>
            </div>
          </div>
        )}

        {/* Content Tab 3: Deployment */}
        {activeTab === 'deploy' && (
          <div className="mt-6 space-y-4 text-sm text-stone-700 dark:text-stone-300">
            <div className="p-4 bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-forest-900 dark:text-stone-200">
                  Option 1: Deploy on Vercel (Recommended — 60 seconds)
                </h3>
                <span className="text-[11px] text-forest-700 font-semibold bg-forest-100 dark:bg-forest-900/60 px-2 py-0.5 rounded">
                  Fastest
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Install the Vercel CLI and deploy with one command:
              </p>
              <div className="flex items-center justify-between p-3 bg-stone-900 text-emerald-400 font-mono text-xs rounded-lg">
                <span>npx vercel</span>
                <button
                  onClick={() => handleCopy('npx vercel', 3)}
                  className="p-1.5 text-stone-400 hover:text-white transition-colors"
                  aria-label="Copy Vercel command"
                >
                  {copiedIndex === 3 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-stone-500">
                Follow the 3 prompts (hit Enter to accept defaults) to create a production URL for your site.
              </p>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 rounded-xl space-y-2">
              <h3 className="font-semibold text-forest-900 dark:text-stone-200">
                Option 2: Push to GitHub
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Push your repo to GitHub to trigger automatic deployments on Vercel.
              </p>
              <div className="flex items-center justify-between p-3 bg-stone-900 text-emerald-400 font-mono text-xs rounded-lg">
                <span>git init &amp;&amp; git add . &amp;&amp; git commit -m &quot;Landscape Design Website&quot;</span>
                <button
                  onClick={() => handleCopy('git init && git add . && git commit -m "Landscape Design Website"', 5)}
                  className="p-1.5 text-stone-400 hover:text-white transition-colors"
                  aria-label="Copy Git command"
                >
                  {copiedIndex === 5 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-forest-900 hover:bg-forest-800 transition-colors rounded-lg shadow-xs"
          >
            Got it, Let&apos;s Build
          </button>
        </div>
      </div>
    </div>
  );
};

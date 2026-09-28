import React from 'react';
import {
  Info,
  X,
  ShieldCheck,
  Zap,
  HardDrive,
  FileCheck2,
  Lock,
  Heart,
  Globe,
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black flex items-center justify-center shadow-lg">
              YT
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">About YT Download</h2>
              <p className="text-xs text-slate-400">Authorized Media Utility v2.4</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-slate-300">
          <div>
            <h3 className="text-base font-semibold text-white mb-2">Our Mission</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>YT Download</strong> is a clean, modern, and high-performance web tool built to help
              content creators, researchers, students, and video professionals save and archive media files
              they have legal authorization or permission to use.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2 font-semibold text-xs text-emerald-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Lawful Architecture</span>
              </div>
              <p className="text-[11px] text-slate-400">
                No DRM cracking or unauthorized scraping. All metadata is retrieved via legitimate official oEmbed APIs.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2 font-semibold text-xs text-cyan-400 mb-1">
                <Zap className="w-4 h-4" />
                <span>Blazing Fast</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Zero bloated pop-ups or redirect loops. Straightforward quality selection with one-click direct transfer.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2 font-semibold text-xs text-amber-400 mb-1">
                <Lock className="w-4 h-4" />
                <span>Zero Tracking</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Your download history lives entirely in your browser’s localStorage. We never log your personal links.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2 font-semibold text-xs text-indigo-400 mb-1">
                <FileCheck2 className="w-4 h-4" />
                <span>Multi-Format Ready</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Supports Full HD (1080p), HD (720p), SD (480p), WebM, plus Studio Audio (320kbps MP3 & Lossless WAV).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <h4 className="font-semibold text-white mb-1">Permitted Use Cases</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
              <li>Downloading your own videos and backup copies of your channel content</li>
              <li>Public Domain and Creative Commons (CC-BY) licensed material</li>
              <li>Open source educational documentaries and Blender open animations</li>
              <li>Direct authorized corporate training and demo media files</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            Built with React & Vite
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-750 text-white transition-colors border border-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

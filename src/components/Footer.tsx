import React from 'react';
import { ShieldCheck, Heart, Download } from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
  onOpenLegal: (tab: 'terms' | 'privacy') => void;
  onOpenIntegrationGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAbout,
  onOpenLegal,
  onOpenIntegrationGuide,
}) => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/60 mt-auto py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Download className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white text-sm">YT Download</span>
            <span className="text-slate-600">|</span>
            <span>Authorized Media Downloader</span>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={onOpenAbout}
              className="hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenIntegrationGuide}
              className="hover:text-cyan-400 text-cyan-500 font-medium transition-colors"
            >
              API Guide
            </button>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Strict copyright & platform TOS compliant</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-900 text-center text-[11px] text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Disclaimer: YT Download respects intellectual property rights. Users are strictly responsible for
          ensuring they have legitimate rights or permissions before downloading any third-party media.
        </div>
      </div>
    </footer>
  );
};

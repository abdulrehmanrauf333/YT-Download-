import React, { useState } from 'react';
import {
  Download,
  History,
  Settings,
  Info,
  Code2,
  Sun,
  Moon,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  onOpenLegal: (tab?: 'terms' | 'privacy') => void;
  onOpenIntegrationGuide: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onOpenHistory,
  onOpenSettings,
  onOpenAbout,
  onOpenLegal,
  onOpenIntegrationGuide,
  historyCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 dark:bg-slate-950/80 light:bg-white/80 border-b border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20">
            <Download className="w-5 h-5 stroke-[2.5]" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                YT Download
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                Authorized
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700"
            title="View Download History"
          >
            <History className="w-4 h-4 text-emerald-400" />
            <span>History</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {historyCount}
              </span>
            )}
          </button>

          {/* API / Backend Guide */}
          <button
            onClick={onOpenIntegrationGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-800/80 transition-all border border-transparent hover:border-cyan-500/20"
            title="Backend & API Integration Documentation"
          >
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>API Guide</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700"
            title="Settings & Defaults"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </button>

          {/* About Button */}
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700"
            title="About YT Download"
          >
            <Info className="w-4 h-4 text-slate-400" />
            <span>About</span>
          </button>

          <div className="h-5 w-px bg-slate-800 mx-1" />

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenHistory}
            className="relative p-2 rounded-lg text-slate-300 hover:bg-slate-800"
            title="History"
          >
            <History className="w-5 h-5 text-emerald-400" />
            {historyCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500"></span>
            )}
          </button>

          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-800"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-400" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
            aria-label="Open Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-4 space-y-2 animate-in fade-in slide-in-from-top-4 duration-150">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenHistory();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800/80 text-left font-medium"
          >
            <div className="flex items-center gap-3">
              <History className="w-5 h-5 text-emerald-400" />
              <span>Download History</span>
            </div>
            {historyCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400">
                {historyCount} items
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenIntegrationGuide();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800/80 text-left font-medium"
          >
            <Code2 className="w-5 h-5 text-cyan-400" />
            <span>API & Backend Integration Guide</span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSettings();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800/80 text-left font-medium"
          >
            <Settings className="w-5 h-5 text-slate-400" />
            <span>Settings & Preferences</span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAbout();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800/80 text-left font-medium"
          >
            <Info className="w-5 h-5 text-slate-400" />
            <span>About YT Download</span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenLegal('terms');
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800/80 text-left font-medium"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Terms of Service & Copyright Notice</span>
          </button>
        </div>
      )}
    </header>
  );
};

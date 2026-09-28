import React from 'react';
import {
  Settings as SettingsIcon,
  X,
  RotateCcw,
  Check,
  Moon,
  Sun,
  Sliders,
  History,
  Trash2,
} from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onResetSettings: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center border border-slate-700">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">App Settings</h2>
              <p className="text-xs text-slate-400">Configure your download preferences</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Form */}
        <div className="space-y-5">
          {/* Appearance / Theme */}
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
              Appearance
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onUpdateSettings({ theme: 'dark' })}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  settings.theme === 'dark'
                    ? 'bg-slate-800 border-emerald-500 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Dark Theme</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateSettings({ theme: 'light' })}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  settings.theme === 'light'
                    ? 'bg-slate-800 border-emerald-500 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Light Theme</span>
              </button>
            </div>
          </div>

          {/* Default Format Type */}
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
              Default Format Filter
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'all', label: 'All Formats' },
                  { id: 'video', label: 'Video (MP4)' },
                  { id: 'audio', label: 'Audio (MP3)' },
                ] as const
              ).map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => onUpdateSettings({ defaultType: type.id })}
                  className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    settings.defaultType === type.id
                      ? 'bg-slate-800 border-emerald-500 text-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Default Quality Priority */}
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
              Quality Priority
            </label>
            <select
              value={settings.defaultQuality}
              onChange={(e) =>
                onUpdateSettings({ defaultQuality: e.target.value as any })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="highest">Best Available Quality (1080p / 4K)</option>
              <option value="1080p">Standard Full HD (1080p)</option>
              <option value="720p">High Definition (720p - smaller size)</option>
              <option value="audio_best">Highest Audio Bitrate (320 kbps)</option>
            </select>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2">
            {/* Auto Clear URL */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Auto-clear URL on submit
                </span>
                <span className="text-[11px] text-slate-400">
                  Clears the input field once download options are loaded
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.autoClearUrl}
                onChange={(e) =>
                  onUpdateSettings({ autoClearUrl: e.target.checked })
                }
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-900 border-slate-700"
              />
            </label>

            {/* Save History */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Store Local History
                </span>
                <span className="text-[11px] text-slate-400">
                  Keeps a record of processed files in your local browser storage
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.saveHistory}
                onChange={(e) =>
                  onUpdateSettings({ saveHistory: e.target.checked })
                }
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-900 border-slate-700"
              />
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-6">
          <button
            type="button"
            onClick={onResetSettings}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-md shadow-emerald-500/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

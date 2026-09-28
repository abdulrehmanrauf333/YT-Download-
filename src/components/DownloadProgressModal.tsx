import React from 'react';
import {
  Download,
  CheckCircle2,
  XCircle,
  X,
  Loader2,
  HardDrive,
  FileCheck,
  Zap,
} from 'lucide-react';
import { DownloadProgressState } from '../types';

interface DownloadProgressModalProps {
  state: DownloadProgressState;
  onCancel: () => void;
  onClose: () => void;
}

export const DownloadProgressModal: React.FC<DownloadProgressModalProps> = ({
  state,
  onCancel,
  onClose,
}) => {
  if (!state.active) return null;

  const isCompleted = state.status === 'completed';
  const isError = state.status === 'error';
  const isDownloading = state.status === 'downloading' || state.status === 'processing';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* Glowing top line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400" />

        {/* Close Button if finished or error */}
        {(isCompleted || isError) && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : isError
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : isError ? (
              <XCircle className="w-6 h-6" />
            ) : (
              <Download className="w-6 h-6 animate-bounce" />
            )}
          </div>

          <div>
            <h3 className="font-bold text-lg text-white">
              {isCompleted
                ? 'Download Complete!'
                : isError
                ? 'Download Interrupted'
                : 'Preparing & Downloading'}
            </h3>
            <p className="text-xs text-slate-400">
              {state.formatName} • {state.totalSize}
            </p>
          </div>
        </div>

        {/* File Name */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-5">
          <p className="text-xs font-mono text-slate-300 truncate font-medium">
            {state.itemTitle}
          </p>
        </div>

        {/* Progress Bar & Details */}
        {isDownloading && (
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-400">Transferring file</span>
              <span className="text-emerald-400 font-mono">{state.progress}%</span>
            </div>

            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-150 ease-out"
                style={{ width: `${state.progress}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono pt-1">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>{state.speed}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  {state.transferred} / {state.totalSize}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Completed State Info */}
        {isCompleted && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs mb-6 space-y-1">
            <div className="flex items-center gap-2 font-semibold text-emerald-200">
              <FileCheck className="w-4 h-4" />
              <span>Saved to Browser Downloads</span>
            </div>
            <p className="text-slate-400 pl-6">
              The file was processed and transferred directly to your local downloads directory.
            </p>
          </div>
        )}

        {/* Error State Info */}
        {isError && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs mb-6">
            <p className="font-semibold text-rose-200 mb-1">Download Error</p>
            <p className="text-slate-400">
              {state.errorMessage || 'An error occurred while streaming the requested media file.'}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          {isDownloading ? (
            <button
              onClick={onCancel}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              Cancel Transfer
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

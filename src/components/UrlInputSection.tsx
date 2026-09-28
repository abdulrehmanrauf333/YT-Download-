import React, { useState, useEffect } from 'react';
import {
  Link2,
  Clipboard,
  X,
  ArrowRight,
  Loader2,
  AlertCircle,
  Sparkles,
  Shield,
  Film,
  Check,
} from 'lucide-react';
import { FALLBACK_SAMPLES } from '../services/videoService';

interface SampleItem {
  id: string;
  url: string;
  title: string;
  duration: string;
  license: string;
}

interface UrlInputSectionProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: (targetUrl?: string) => void;
  loading: boolean;
  error: string | null;
  onErrorDismiss: () => void;
}

export const UrlInputSection: React.FC<UrlInputSectionProps> = ({
  url,
  setUrl,
  onSubmit,
  loading,
  error,
  onErrorDismiss,
}) => {
  const [pasted, setPasted] = useState(false);
  const [samples, setSamples] = useState<SampleItem[]>(FALLBACK_SAMPLES);
  const [validationWarning, setValidationWarning] = useState<string | null>(null);

  // Load sample videos from backend if available, fallback already initialized
  useEffect(() => {
    fetch('/api/samples')
      .then((res) => res.json())
      .then((data) => {
        if (data.samples && data.samples.length > 0) {
          setSamples(data.samples);
        }
      })
      .catch(() => {
        // Keeps FALLBACK_SAMPLES on static hosting like GitHub Pages
      });
  }, []);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setValidationWarning(null);
        setPasted(true);
        setTimeout(() => setPasted(false), 2000);
      }
    } catch (err) {
      // Clipboard read may be blocked by iframe permissions, user can paste normally
      console.warn('Clipboard read failed:', err);
    }
  };

  const handleClear = () => {
    setUrl('');
    setValidationWarning(null);
    onErrorDismiss();
  };

  const validateAndSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmed = url.trim();
    if (!trimmed) {
      setValidationWarning('Please paste or enter a video URL.');
      return;
    }

    // Basic format check
    const isYouTube =
      trimmed.includes('youtube.com') || trimmed.includes('youtu.be');
    const isDirectMedia = trimmed.match(/\.(mp4|webm|m4v|ogg|mp3|wav)(\?.*)?$/i);
    const isSample = samples.some((s) => s.url === trimmed || s.id === trimmed);

    if (!isYouTube && !isDirectMedia && !isSample) {
      setValidationWarning(
        'Please enter a valid YouTube URL (e.g., https://www.youtube.com/watch?v=... or https://youtu.be/...) or a direct media link.'
      );
      return;
    }

    setValidationWarning(null);
    onSubmit(trimmed);
  };

  const handleSampleClick = (sampleUrl: string) => {
    setUrl(sampleUrl);
    setValidationWarning(null);
    onSubmit(sampleUrl);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-6 text-center">
      {/* Top Banner Tagline */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-4">
        <Shield className="w-3.5 h-3.5" />
        <span>Download videos you are authorized to save</span>
      </div>

      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3 sm:mb-4">
        Save authorized video{' '}
        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
          in high quality
        </span>
      </h1>

      <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base mb-8">
        Inspect resolutions, audio formats, and file sizes. Process public domain, Creative Commons,
        or your own authorized media securely.
      </p>

      {/* Main Input Form */}
      <form onSubmit={validateAndSubmit} className="relative max-w-3xl mx-auto mb-4">
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-slate-900/90 hover:bg-slate-900 border border-slate-700/80 focus-within:border-emerald-500/80 rounded-2xl shadow-2xl shadow-emerald-500/5 transition-all p-2 gap-2">
          {/* Link Icon */}
          <div className="hidden sm:flex items-center pl-3 text-slate-400">
            <Link2 className="w-5 h-5 text-emerald-400" />
          </div>

          {/* URL Input */}
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (validationWarning) setValidationWarning(null);
              if (error) onErrorDismiss();
            }}
            placeholder="Paste video URL (e.g. https://www.youtube.com/watch?v=...)"
            className="w-full bg-transparent px-3 py-3 text-slate-100 placeholder-slate-500 text-base focus:outline-none"
            disabled={loading}
            aria-label="Video URL input"
          />

          {/* Quick Action Buttons (Paste / Clear) */}
          <div className="flex items-center justify-end gap-1.5 px-2">
            {url ? (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                title="Clear input"
                disabled={loading}
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePaste}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-750 hover:text-white transition-colors border border-slate-700/70"
                title="Paste from clipboard"
                disabled={loading}
              >
                {pasted ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Pasted!</span>
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Paste URL</span>
                  </>
                )}
              </button>
            )}

            {/* Green / Blue Submit Button */}
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Get Download Options</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Validation or API Error Alerts */}
      {(validationWarning || error) && (
        <div className="max-w-3xl mx-auto mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3 text-left animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-rose-200">
              {validationWarning || error}
            </p>
            <p className="text-xs text-rose-300/80 mt-1">
              Ensure you have provided a valid authorized video link or try one of the instant sample videos below.
            </p>
          </div>
          <button
            onClick={() => {
              setValidationWarning(null);
              onErrorDismiss();
            }}
            className="text-rose-400 hover:text-rose-200 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Quick 1-Click Samples for Instant Testing */}
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-1.5 text-slate-400 font-medium shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Quick Test Samples:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {samples.length > 0 ? (
            samples.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSampleClick(s.url)}
                disabled={loading}
                className="px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-750 text-slate-300 hover:text-emerald-300 border border-slate-700/80 transition-all flex items-center gap-1.5 text-[11px] disabled:opacity-50"
                title={`${s.title} (${s.license})`}
              >
                <Film className="w-3 h-3 text-cyan-400" />
                <span className="truncate max-w-[140px] sm:max-w-[180px]">{s.title.split('(')[0]}</span>
                <span className="text-slate-500 font-mono text-[10px]">[{s.duration}]</span>
              </button>
            ))
          ) : (
            <button
              type="button"
              onClick={() =>
                handleSampleClick(
                  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                )
              }
              className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-emerald-300 text-[11px] border border-slate-700"
            >
              Big Buck Bunny (1080p MP4)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

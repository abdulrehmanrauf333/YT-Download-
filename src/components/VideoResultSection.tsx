import React, { useState } from 'react';
import {
  Download,
  Play,
  Clock,
  User,
  CheckCircle2,
  FileVideo,
  FileAudio,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Filter,
  Check,
  Copy,
  Info,
  ChevronDown,
} from 'lucide-react';
import { VideoInfo, VideoFormat } from '../types';

interface VideoResultSectionProps {
  video: VideoInfo;
  onDownload: (format: VideoFormat) => void;
  onReset: () => void;
}

export const VideoResultSection: React.FC<VideoResultSectionProps> = ({
  video,
  onDownload,
  onReset,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'video' | 'audio'>('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const filteredFormats = video.formats.filter((f) => {
    if (filterType === 'video') return f.type === 'video';
    if (filterType === 'audio') return f.type === 'audio';
    return true;
  });

  const recommendedFormat =
    video.formats.find((f) => f.recommended && f.type === 'video') ||
    video.formats[0];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(video.url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Video Details Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md mb-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Thumbnail & Preview */}
          <div className="relative w-full lg:w-96 shrink-0 aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group shadow-lg">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                // Fallback thumbnail if original image fails
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
              }}
            />

            {/* Duration Badge */}
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/80 backdrop-blur-md text-white text-xs font-mono font-medium flex items-center gap-1 shadow">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>{video.duration}</span>
            </div>

            {/* Source Tag */}
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-emerald-500/90 text-slate-950 text-[10px] font-bold tracking-wider uppercase shadow">
              {video.sourceType === 'youtube' ? 'YouTube' : 'Authorized Media'}
            </div>

            {/* Direct Play Overlay if direct media */}
            {video.directDownloadUrl && (
              <button
                onClick={() => setPreviewOpen(!previewOpen)}
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-slate-950 flex items-center justify-center opacity-85 hover:opacity-100 transition-all shadow-xl hover:scale-110"
                title="Preview Video"
              >
                <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
              </button>
            )}
          </div>

          {/* Metadata & Actions */}
          <div className="flex-1 flex flex-col justify-between w-full space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {video.license || 'Authorized for Download'}
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400 font-mono">
                  {video.formats.length} formats available
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug line-clamp-2">
                {video.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-400">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium">{video.author}</span>
                </div>
                {video.authorUrl && (
                  <a
                    href={video.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    <span>Channel / Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Action Ribbon */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {recommendedFormat && (
                  <button
                    onClick={() => onDownload(recommendedFormat)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 shadow-md shadow-emerald-500/10 active:scale-95 transition-all"
                  >
                    <Download className="w-4 h-4 stroke-[2.5]" />
                    <span>Quick Download ({recommendedFormat.quality} {recommendedFormat.container})</span>
                  </button>
                )}

                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-slate-300 bg-slate-800 hover:bg-slate-750 transition-colors border border-slate-700/70"
                  title="Copy video link"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={onReset}
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors underline underline-offset-4"
              >
                Enter Another URL
              </button>
            </div>
          </div>
        </div>

        {/* In-place Preview Player if requested */}
        {previewOpen && video.directDownloadUrl && (
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Inline Video Player</span>
              <button
                onClick={() => setPreviewOpen(false)}
                className="text-slate-500 hover:text-slate-300 text-xs"
              >
                Close Player ✕
              </button>
            </div>
            <video
              src={video.directDownloadUrl}
              controls
              autoPlay
              className="w-full max-h-[380px] rounded-xl bg-black border border-slate-800"
            />
          </div>
        )}
      </div>

      {/* Formats Section Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Available Download Options</span>
            <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {filteredFormats.length} ready
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Select your preferred resolution or audio format to download.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterType === 'all'
                ? 'bg-slate-800 text-emerald-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Formats
          </button>
          <button
            onClick={() => setFilterType('video')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterType === 'video'
                ? 'bg-slate-800 text-emerald-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileVideo className="w-3.5 h-3.5" />
            <span>Video (MP4 / WebM)</span>
          </button>
          <button
            onClick={() => setFilterType('audio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterType === 'audio'
                ? 'bg-slate-800 text-emerald-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileAudio className="w-3.5 h-3.5" />
            <span>Audio (MP3 / WAV)</span>
          </button>
        </div>
      </div>

      {/* Formats Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredFormats.map((format) => {
          const isAudio = format.type === 'audio';

          return (
            <div
              key={format.id}
              className={`relative flex flex-col justify-between p-4 rounded-2xl bg-slate-900/90 border transition-all duration-200 hover:scale-[1.01] hover:shadow-xl ${
                format.recommended
                  ? 'border-emerald-500/60 shadow-lg shadow-emerald-500/5'
                  : 'border-slate-800/90 hover:border-slate-700'
              }`}
            >
              {/* Recommended Badge */}
              {format.recommended && (
                <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 uppercase tracking-wider shadow">
                  Recommended
                </div>
              )}

              {/* Format Info */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`p-1.5 rounded-lg ${
                        isAudio
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      }`}
                    >
                      {isAudio ? (
                        <FileAudio className="w-4 h-4" />
                      ) : (
                        <FileVideo className="w-4 h-4" />
                      )}
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-base leading-tight">
                        {format.resolution}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-400">
                        {format.container} • {format.codec}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-1 rounded-md bg-slate-800 text-slate-200 text-xs font-mono font-semibold">
                    {format.size}
                  </span>
                </div>

                {/* Additional Spec Pills */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 my-3">
                  {format.fps && (
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                      {format.fps}
                    </span>
                  )}
                  {format.bitrate && (
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                      {format.bitrate}
                    </span>
                  )}
                  {format.hasAudio && !isAudio && (
                    <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-900/40">
                      Audio Included
                    </span>
                  )}
                </div>
              </div>

              {/* Download Action Button */}
              <div className="pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => onDownload(format)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-150 active:scale-[0.98] ${
                    format.recommended
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Download {format.container}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compliance / Lawful Disclaimer Banner */}
      <div className="mt-8 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-slate-300 font-medium mb-0.5">
            Notice on Authorized Video Processing
          </p>
          <p>
            YT Download only processes authorized video streams and lawful public domain or Creative
            Commons content. It does not circumvent digital rights management (DRM), authentication
            locks, or platform protections.
          </p>
        </div>
      </div>
    </div>
  );
};

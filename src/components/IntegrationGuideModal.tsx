import React, { useState } from 'react';
import {
  Code2,
  X,
  Copy,
  Check,
  Server,
  Key,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface IntegrationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntegrationGuideModal: React.FC<IntegrationGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyCode = (key: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const videoInfoSnippet = `// Located in server.ts -> app.post('/api/video-info', ...)
app.post('/api/video-info', async (req, res) => {
  const { url } = req.body;

  // 1. Official YouTube oEmbed Metadata (No API key needed, 100% legal):
  const oembedUrl = \`https://www.youtube.com/oembed?url=\${encodeURIComponent(url)}&format=json\`;
  const meta = await fetch(oembedUrl).then(r => r.json());

  // 2. OR connect official Google Cloud YouTube Data API v3:
  // const ytRes = await fetch(\`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=\${videoId}&key=\${process.env.YOUTUBE_API_KEY}\`);

  res.json({
    id: videoId,
    title: meta.title,
    author: meta.author_name,
    thumbnail: meta.thumbnail_url,
    formats: [
      { id: 'mp4_1080p', container: 'MP4', quality: '1080p', type: 'video' },
      { id: 'mp3_320k', container: 'MP3', quality: '320 kbps', type: 'audio' }
    ]
  });
});`;

  const downloadSnippet = `// Located in server.ts -> app.post('/api/download', ...)
app.post('/api/download', async (req, res) => {
  const { url, formatId, quality, type, title } = req.body;

  /*
   * PLUG IN YOUR AUTHORIZED SERVICE HERE:
   * Option A: Forward authorized creator cloud storage stream (S3, GCS)
   * Option B: Invoke Google Cloud Transcoder or AWS Elemental MediaConvert
   * Option C: Invoke your private licensed media rendering cluster
   */

  res.setHeader('Content-Disposition', \`attachment; filename="\${title}_\${quality}.mp4"\`);
  res.setHeader('Content-Type', type === 'audio' ? 'audio/mpeg' : 'video/mp4');

  // Stream authorized media directly to the client:
  // mediaStream.pipe(res);
});`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Backend & API Integration Guide</h2>
              <p className="text-xs text-slate-400">
                Where & how to connect your authorized video backend
              </p>
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
        <div className="flex-1 overflow-y-auto py-5 pr-2 space-y-6 text-xs text-slate-300">
          {/* Quick Summary Card */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="font-semibold text-white text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Clean API Abstraction Overview</span>
            </h4>
            <p className="text-slate-400 text-xs">
              The frontend communicates strictly with two standard endpoints hosted in{' '}
              <code className="text-emerald-400 bg-slate-900 px-1 py-0.5 rounded">server.ts</code>.
              Your secrets, API keys, and transcoders stay 100% on the server side:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px]">
                <span className="text-emerald-400 font-bold">POST</span> /api/video-info
                <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                  Validates URL, fetches lawful metadata & lists available formats.
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px]">
                <span className="text-cyan-400 font-bold">POST</span> /api/download
                <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                  Streams or delivers authorized media binary directly with Content-Disposition.
                </p>
              </div>
            </div>
          </div>

          {/* Endpoint 1 Snippet */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white text-xs flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                  1
                </span>
                <span>Metadata Inspection Endpoint: POST /api/video-info</span>
              </span>
              <button
                onClick={() => copyCode('code1', videoInfoSnippet)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-750 transition-colors"
              >
                {copiedKey === 'code1' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
              {videoInfoSnippet}
            </pre>
          </div>

          {/* Endpoint 2 Snippet */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white text-xs flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono">
                  2
                </span>
                <span>Authorized Media Delivery: POST /api/download</span>
              </span>
              <button
                onClick={() => copyCode('code2', downloadSnippet)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-750 transition-colors"
              >
                {copiedKey === 'code2' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
              {downloadSnippet}
            </pre>
          </div>

          {/* Production Configuration Tips */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h5 className="font-semibold text-white text-xs flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              <span>Environment Variables in .env</span>
            </h5>
            <p className="text-slate-400 text-xs">
              Add your enterprise credentials to your server environment:
            </p>
            <div className="font-mono text-[11px] bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-emerald-300">
              YOUTUBE_API_KEY="AIzaSy..."<br />
              MEDIA_WORKER_URL="https://transcoder.yourdomain.com/v1"<br />
              TRANSCODER_SECRET="your_shared_secret_token"
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-md shadow-cyan-500/20"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

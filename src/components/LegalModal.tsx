import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, X, AlertTriangle } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'terms' | 'privacy';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'terms',
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'terms'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms of Service</span>
            </button>

            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'privacy'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Privacy Notice</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-5 pr-2 space-y-4 text-xs text-slate-300 leading-relaxed">
          {activeTab === 'terms' ? (
            <>
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  <strong>Important Notice:</strong> You may only download video and audio content for which you
                  possess the copyright, hold express permission from the copyright owner, or where the media is
                  released under a Creative Commons or Public Domain license.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">1. Acceptance of Terms</h4>
                <p className="text-slate-400">
                  By accessing and utilizing YT Download, you confirm and warrant that your use complies with all applicable
                  copyright laws, regional digital rights statutes, and the Terms of Service of third-party platforms.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">2. Prohibition on Circumvention</h4>
                <p className="text-slate-400">
                  This application does not bypass digital rights management (DRM), decryption mechanisms, access control
                  safeguards, or paywalled media. Any attempt to modify the application for infringing activities is strictly
                  prohibited.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">3. Permitted & Fair Use</h4>
                <p className="text-slate-400">
                  Permitted activities include creators archiving their personal broadcasts, media students saving CC-BY research
                  films, and preserving public domain archives.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">4. Disclaimer of Warranties</h4>
                <p className="text-slate-400">
                  The service is provided "AS IS" without warranty of any kind. The operators assume no liability for content
                  accessed through client-specified external URLs.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  <strong>Zero-Logging Guarantee:</strong> We do not log, retain, or monetize your query URLs, video searches, or download history.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">1. Information We Do Not Collect</h4>
                <p className="text-slate-400">
                  We do not require user accounts, email registration, payment credentials, or cookies for tracking. Your video URLs
                  are processed ephemerally solely to resolve legal metadata.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">2. Client-Side History</h4>
                <p className="text-slate-400">
                  Your "Download History" is stored strictly inside your browser's local storage (<code className="text-emerald-400">localStorage</code>).
                  It never leaves your local device and can be erased in one click via the History modal or Settings.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">3. Third-Party Requests</h4>
                <p className="text-slate-400">
                  When retrieving public video titles and thumbnails, requests are directed via standard public oEmbed endpoints
                  without passing private personal identifying data.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">4. Security</h4>
                <p className="text-slate-400">
                  All communications are encrypted in transit using industry-standard Transport Layer Security (HTTPS/TLS).
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-md shadow-emerald-500/20"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

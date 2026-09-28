export interface VideoFormat {
  id: string;
  type: 'video' | 'audio';
  container: 'MP4' | 'WebM' | 'MP3' | 'M4A' | 'WAV';
  resolution: string;
  quality: string;
  fps?: string;
  codec: string;
  size: string;
  bitrate?: string;
  recommended?: boolean;
  hasAudio: boolean;
}

export interface VideoInfo {
  id: string;
  url: string;
  title: string;
  author: string;
  authorUrl: string;
  thumbnail: string;
  duration: string;
  durationSeconds: number;
  sourceType: 'youtube' | 'direct' | 'sample';
  license: string;
  isLegallyPermitted: boolean;
  formats: VideoFormat[];
  directDownloadUrl?: string;
  integrationNotice?: string;
}

export interface DownloadHistoryItem {
  id: string;
  videoId: string;
  title: string;
  thumbnail: string;
  formatId: string;
  container: string;
  quality: string;
  size: string;
  downloadedAt: string;
  url: string;
  type: 'video' | 'audio';
}

export interface AppSettings {
  defaultType: 'all' | 'video' | 'audio';
  defaultQuality: 'highest' | '1080p' | '720p' | 'audio_best';
  autoClearUrl: boolean;
  saveHistory: boolean;
  theme: 'dark' | 'light';
}

export interface DownloadProgressState {
  active: boolean;
  itemTitle: string;
  formatName: string;
  progress: number;
  speed: string;
  transferred: string;
  totalSize: string;
  status: 'idle' | 'downloading' | 'processing' | 'completed' | 'error';
  errorMessage?: string;
}

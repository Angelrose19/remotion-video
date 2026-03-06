// Whisper word-level output format
export interface WhisperWord {
  word: string;
  start: number;
  end: number;
}

export interface WhisperSegment {
  start: number;
  end: number;
  text: string;
  words: WhisperWord[];
}

export interface WhisperOutput {
  segments: WhisperSegment[];
}

export interface TutorialProps {
  title: string;
  subtitle?: string;
  screenRecording: string; // filename in public/
  captions: WhisperOutput;
  introDurationInSeconds?: number;
  outroDurationInSeconds?: number;
}

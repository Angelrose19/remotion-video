import type { WhisperOutput } from "./types";

// Sample captions for Remotion Studio preview.
// Replace with real Whisper output for actual videos.
export const sampleCaptions: WhisperOutput = {
  segments: [
    {
      start: 0.0,
      end: 2.5,
      text: "Tap the export button at the bottom",
      words: [
        { word: "Tap", start: 0.0, end: 0.3 },
        { word: "the", start: 0.3, end: 0.45 },
        { word: "export", start: 0.45, end: 0.85 },
        { word: "button", start: 0.85, end: 1.2 },
        { word: "at", start: 1.2, end: 1.35 },
        { word: "the", start: 1.35, end: 1.5 },
        { word: "bottom", start: 1.5, end: 2.0 },
      ],
    },
    {
      start: 2.8,
      end: 5.2,
      text: "Choose 4K resolution for the best quality",
      words: [
        { word: "Choose", start: 2.8, end: 3.1 },
        { word: "4K", start: 3.1, end: 3.4 },
        { word: "resolution", start: 3.4, end: 3.9 },
        { word: "for", start: 3.9, end: 4.05 },
        { word: "the", start: 4.05, end: 4.2 },
        { word: "best", start: 4.2, end: 4.5 },
        { word: "quality", start: 4.5, end: 5.0 },
      ],
    },
    {
      start: 5.5,
      end: 8.0,
      text: "Your video will render in just a few seconds",
      words: [
        { word: "Your", start: 5.5, end: 5.7 },
        { word: "video", start: 5.7, end: 6.0 },
        { word: "will", start: 6.0, end: 6.15 },
        { word: "render", start: 6.15, end: 6.5 },
        { word: "in", start: 6.5, end: 6.6 },
        { word: "just", start: 6.6, end: 6.8 },
        { word: "a", start: 6.8, end: 6.9 },
        { word: "few", start: 6.9, end: 7.1 },
        { word: "seconds", start: 7.1, end: 7.6 },
      ],
    },
  ],
};

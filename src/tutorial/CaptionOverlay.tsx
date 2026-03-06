import { z } from "zod";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { tutorialSchema } from "./schema";

type WhisperOutput = z.infer<typeof tutorialSchema>["captions"];

const BRAND_COLOR = "#31B3FD";

export const CaptionOverlay: React.FC<{
  captions: WhisperOutput;
}> = ({ captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Find the active segment
  const activeSegment = captions.segments.find(
    (seg) => currentTime >= seg.start && currentTime <= seg.end,
  );

  if (!activeSegment) return null;

  // Find the active word index
  const activeWordIndex = activeSegment.words.findIndex(
    (w) => currentTime >= w.start && currentTime <= w.end,
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 120,
        left: 40,
        right: 40,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(8px)",
          borderRadius: 16,
          padding: "16px 28px",
          maxWidth: "90%",
        }}
      >
        <div
          style={{
            fontFamily: "Nunito, sans-serif",
            fontSize: 36,
            fontWeight: 700,
            lineHeight: 1.4,
            textAlign: "center",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 10px",
          }}
        >
          {activeSegment.words.map((word, i) => {
            const isActive = i === activeWordIndex;
            const isPast = i < activeWordIndex;
            return (
              <span
                key={`${word.start}-${i}`}
                style={{
                  color: isActive
                    ? BRAND_COLOR
                    : isPast
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(255,255,255,0.5)",
                  transition: "color 0.1s",
                  transform: isActive ? "scale(1.05)" : "scale(1)",
                }}
              >
                {word.word}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

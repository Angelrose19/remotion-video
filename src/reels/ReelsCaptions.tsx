import { useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { reelsSchema } from "./schema";

type Captions = z.infer<typeof reelsSchema>["captions"];

const GREEN_PILL = "#4CD964";
const FONT_SIZE = 44;
const LINE_HEIGHT = 1.5;
const MAX_LINES = 2;
const MAX_HEIGHT = FONT_SIZE * LINE_HEIGHT * MAX_LINES + 20; // + padding

export const ReelsCaptions: React.FC<{
  captions: Captions;
}> = ({ captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Find active segment
  const activeSegment = captions.segments.find(
    (seg) => currentTime >= seg.start && currentTime <= seg.end,
  );

  if (!activeSegment) return null;

  // Find active word index
  const activeWordIndex = activeSegment.words.findIndex(
    (w) => currentTime >= w.start && currentTime <= w.end,
  );

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "4px 10px",
        width: "100%",
        maxHeight: MAX_HEIGHT,
        overflow: "hidden",
      }}
    >
      {activeSegment.words.map((word, i) => {
        const isActive = i === activeWordIndex;
        const isPast = activeWordIndex >= 0 && i < activeWordIndex;

        return (
          <span
            key={`${word.start}-${i}`}
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: FONT_SIZE,
              fontWeight: 700,
              lineHeight: LINE_HEIGHT,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              ...(isActive
                ? {
                    backgroundColor: GREEN_PILL,
                    borderRadius: 12,
                    padding: "4px 14px",
                    color: "#fff",
                  }
                : {
                    padding: "4px 6px",
                    color: "#fff",
                    opacity: isPast ? 1 : 0.6,
                  }),
            }}
          >
            {word.word}
          </span>
        );
      })}
    </div>
  );
};

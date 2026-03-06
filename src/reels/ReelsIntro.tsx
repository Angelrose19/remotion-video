import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const GREEN_PILL = "#4CD964";

export const ReelsIntro: React.FC<{
  title: string;
  highlightWords?: string[];
  backgroundColor: string;
}> = ({ title, highlightWords = [], backgroundColor }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, 12], [30, 0], {
    extrapolateRight: "clamp",
  });

  const words = title.split(" ");

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${y}px)`,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px 12px",
          maxWidth: "90%",
        }}
      >
        {words.map((word, i) => {
          const isHighlighted = highlightWords.some(
            (hw) => hw.toLowerCase() === word.toLowerCase(),
          );

          // Stagger each word slightly
          const wordOpacity = interpolate(
            frame,
            [4 + i * 3, 10 + i * 3],
            [0, 1],
            { extrapolateRight: "clamp" },
          );
          const wordY = interpolate(
            frame,
            [4 + i * 3, 10 + i * 3],
            [20, 0],
            { extrapolateRight: "clamp" },
          );

          return (
            <span
              key={i}
              style={{
                fontFamily: "Nunito, sans-serif",
                fontSize: 72,
                fontWeight: 900,
                color: "#fff",
                textTransform: "uppercase",
                lineHeight: 1.2,
                opacity: wordOpacity,
                transform: `translateY(${wordY}px)`,
                ...(isHighlighted
                  ? {
                      backgroundColor: GREEN_PILL,
                      borderRadius: 14,
                      padding: "2px 18px",
                    }
                  : {}),
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const BRAND_COLOR = "#31B3FD";

export const IntroScreen: React.FC<{
  title: string;
  subtitle?: string;
  durationInFrames: number;
}> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();

  // Title: fade in + slide up
  const titleOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [8, 22], [40, 0], {
    extrapolateRight: "clamp",
  });

  // Subtitle: fade in slightly after title
  const subtitleOpacity = interpolate(frame, [18, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [18, 30], [25, 0], {
    extrapolateRight: "clamp",
  });

  // Decorative line
  const lineWidth = interpolate(frame, [4, 18], [0, 120], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_COLOR,
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 50px",
      }}
    >
      {/* Decorative line above title */}
      <div
        style={{
          width: lineWidth,
          height: 4,
          backgroundColor: "rgba(255,255,255,0.6)",
          borderRadius: 2,
          marginBottom: 32,
        }}
      />

      {/* Title */}
      <div
        style={{
          fontFamily: "Nunito, sans-serif",
          fontSize: 64,
          fontWeight: 800,
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.15,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          maxWidth: "90%",
        }}
      >
        {title}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            fontFamily: "Nunito, sans-serif",
            fontSize: 30,
            fontWeight: 400,
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            marginTop: 20,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            maxWidth: "85%",
          }}
        >
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
};

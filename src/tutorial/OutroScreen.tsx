import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const BRAND_COLOR = "#31B3FD";

export const OutroScreen: React.FC<{
  durationInFrames: number;
}> = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [5, 18], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [5, 18], [0.9, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_COLOR,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Nunito, sans-serif",
            fontSize: 52,
            fontWeight: 800,
            color: "#fff",
            marginBottom: 16,
          }}
        >
          Travel Animator
        </div>
        <div
          style={{
            fontFamily: "Nunito, sans-serif",
            fontSize: 28,
            fontWeight: 400,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          Download on the App Store
        </div>
      </div>
    </AbsoluteFill>
  );
};

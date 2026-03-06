import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const ReelsOutro: React.FC<{
  backgroundColor: string;
}> = ({ backgroundColor }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 15], [0.85, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
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
            fontSize: 60,
            fontWeight: 800,
            color: "#fff",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Travel Animator
        </div>
        <div
          style={{
            fontFamily: "Nunito, sans-serif",
            fontSize: 28,
            fontWeight: 600,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          Download on the App Store
        </div>
      </div>
    </AbsoluteFill>
  );
};

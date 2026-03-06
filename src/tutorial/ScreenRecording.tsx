import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";

export const ScreenRecording: React.FC<{
  src: string;
}> = ({ src }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OffthreadVideo
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </AbsoluteFill>
  );
};

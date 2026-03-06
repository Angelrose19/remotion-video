import { z } from "zod";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { reelsSchema } from "./schema";
import { ReelsIntro } from "./ReelsIntro";
import { IPhoneMockup } from "./IPhoneMockup";
import { ReelsCaptions } from "./ReelsCaptions";
import { ReelsOutro } from "./ReelsOutro";

type ReelsProps = z.infer<typeof reelsSchema>;

export const ReelsComposition: React.FC<ReelsProps> = ({
  title,
  highlightWords,
  backgroundColor = "#4BA3F5",
  screenRecording,
  captions,
  introDurationInSeconds = 3,
  outroDurationInSeconds = 3,
}) => {
  const { fps, durationInFrames } = useVideoConfig();

  const introFrames = Math.round(introDurationInSeconds * fps);
  const outroFrames = Math.round(outroDurationInSeconds * fps);
  const recordingFrames = durationInFrames - introFrames - outroFrames;

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {/* INTRO */}
      <Sequence from={0} durationInFrames={introFrames}>
        <ReelsIntro
          title={title}
          highlightWords={highlightWords}
          backgroundColor={backgroundColor}
        />
      </Sequence>

      {/* SCREEN RECORDING + CAPTIONS */}
      <Sequence from={introFrames} durationInFrames={recordingFrames}>
        <AbsoluteFill
          style={{
            backgroundColor,
          }}
        >
          {/* Phone centered in upper portion */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 240,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IPhoneMockup videoSrc={screenRecording} width={540} />
          </div>

          {/* Captions pinned to bottom area, below phone */}
          <div
            style={{
              position: "absolute",
              bottom: 200,
              left: 50,
              right: 50,
              height: 160,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <ReelsCaptions captions={captions} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* OUTRO */}
      <Sequence
        from={introFrames + recordingFrames}
        durationInFrames={outroFrames}
      >
        <ReelsOutro backgroundColor={backgroundColor} />
      </Sequence>
    </AbsoluteFill>
  );
};

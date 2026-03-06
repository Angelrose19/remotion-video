import { z } from "zod";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { IntroScreen } from "./IntroScreen";
import { ScreenRecording } from "./ScreenRecording";
import { CaptionOverlay } from "./CaptionOverlay";
import { OutroScreen } from "./OutroScreen";
import { tutorialSchema } from "./schema";

type TutorialProps = z.infer<typeof tutorialSchema>;

export const TutorialComposition: React.FC<TutorialProps> = ({
  title,
  subtitle,
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
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* INTRO */}
      <Sequence from={0} durationInFrames={introFrames}>
        <IntroScreen
          title={title}
          subtitle={subtitle}
          durationInFrames={introFrames}
        />
      </Sequence>

      {/* SCREEN RECORDING + CAPTIONS */}
      <Sequence from={introFrames} durationInFrames={recordingFrames}>
        <ScreenRecording src={screenRecording} />
        <CaptionOverlay captions={captions} />
      </Sequence>

      {/* OUTRO */}
      <Sequence
        from={introFrames + recordingFrames}
        durationInFrames={outroFrames}
      >
        <OutroScreen durationInFrames={outroFrames} />
      </Sequence>
    </AbsoluteFill>
  );
};

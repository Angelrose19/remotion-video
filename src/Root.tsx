import "./index.css";
import { Composition } from "remotion";
import { getVideoMetadata } from "@remotion/media-utils";
import { TutorialComposition } from "./tutorial/TutorialComposition";
import { tutorialSchema } from "./tutorial/schema";
import { sampleCaptions } from "./tutorial/sample-captions";
import { ReelsComposition } from "./reels/ReelsComposition";
import { reelsSchema } from "./reels/schema";
import { sampleReelsCaptions } from "./reels/sample-captions";
import { staticFile } from "remotion";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Tutorial"
        component={TutorialComposition}
        schema={tutorialSchema}
        durationInFrames={480}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{
          title: "How to Export in 4K",
          subtitle: "Step-by-step guide",
          screenRecording: "sample-recording.mp4",
          captions: sampleCaptions,
          introDurationInSeconds: 3,
          outroDurationInSeconds: 3,
        }}
      />
      <Composition
        id="Reels"
        component={ReelsComposition}
        schema={reelsSchema}
        fps={FPS}
        width={1080}
        height={1920}
        calculateMetadata={async ({ props }) => {
          const introDuration = props.introDurationInSeconds ?? 3;
          const outroDuration = props.outroDurationInSeconds ?? 3;

          const metadata = await getVideoMetadata(
            staticFile(props.screenRecording),
          );
          const totalSeconds =
            metadata.durationInSeconds + introDuration + outroDuration;

          return {
            durationInFrames: Math.ceil(totalSeconds * FPS),
          };
        }}
        defaultProps={{
          title: "Add Place Labels",
          highlightWords: ["Labels"],
          backgroundColor: "#4BA3F5",
          screenRecording: "place-labels-fixed.mp4",
          captions: sampleReelsCaptions,
          introDurationInSeconds: 3,
          outroDurationInSeconds: 3,
        }}
      />
    </>
  );
};

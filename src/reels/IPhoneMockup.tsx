import { Img, OffthreadVideo, staticFile } from "remotion";

// Screen area position as % of the mockup image (371x750 PNG)
// Slightly oversized to ensure black fill covers all transparent area
const FILL_TOP = 2.0;
const FILL_LEFT = 2.5;
const FILL_RIGHT = 2.5;
const FILL_BOTTOM = 2.0;
const FILL_RADIUS = 42;

// Exact screen area for video
const SCREEN_TOP = 3.6;
const SCREEN_LEFT = 4.8;
const SCREEN_RIGHT = 4.8;
const SCREEN_BOTTOM = 3.6;
const SCREEN_RADIUS = 32;

export const IPhoneMockup: React.FC<{
  videoSrc: string;
  mockupImage?: string;
  width?: number;
}> = ({ videoSrc, mockupImage = "iphone-mockup.png", width = 540 }) => {
  return (
    <div
      style={{
        width,
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Layer 1 (bottom): Black fill — oversized to cover all transparent area inside frame */}
      <div
        style={{
          position: "absolute",
          top: `${FILL_TOP}%`,
          left: `${FILL_LEFT}%`,
          right: `${FILL_RIGHT}%`,
          bottom: `${FILL_BOTTOM}%`,
          borderRadius: FILL_RADIUS,
          backgroundColor: "#000",
          zIndex: 0,
        }}
      />

      {/* Layer 2 (middle): Video */}
      <div
        style={{
          position: "absolute",
          top: `${SCREEN_TOP}%`,
          left: `${SCREEN_LEFT}%`,
          right: `${SCREEN_RIGHT}%`,
          bottom: `${SCREEN_BOTTOM}%`,
          borderRadius: SCREEN_RADIUS,
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <OffthreadVideo
          src={staticFile(videoSrc)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Layer 3 (top): Transparent mockup frame */}
      <Img
        src={staticFile(mockupImage)}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          position: "relative",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

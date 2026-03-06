# Tutorial Video Creator

Automated pipeline to create branded tutorial reels from screen recordings using [Remotion](https://remotion.dev), [Whisper](https://github.com/openai/whisper), and ffmpeg.

**Output**: 1080×1920 vertical videos with an iPhone mockup, word-by-word captions, and branded intro/outro — ready for Instagram Reels, TikTok, or YouTube Shorts.

## Prerequisites

- **Node.js** ≥ 18
- **Python 3** with [OpenAI Whisper](https://github.com/openai/whisper) installed
- **ffmpeg** installed and in PATH

```bash
# Install Whisper (if not already)
pip install openai-whisper

# Install ffmpeg (macOS)
brew install ffmpeg
```

## Setup

```bash
git clone <repo-url> && cd remotion-video
npm install
```

## Quick Start (Automated)

The fastest way to create a video — one command, one question:

```bash
python3 scripts/create-tutorial.py <screen-recording.mp4>
```

The script will:
1. Ask for an **intro title** (e.g. "Add Place Labels")
2. Re-encode the video to 30fps (Remotion-compatible)
3. Run Whisper for word-level transcription
4. Clean up filler words and fix capitalization
5. Render the final video with Remotion

Output is saved to `out/<video-name>.mp4`.

### Optional: Edit captions before rendering

The script shows cleaned captions and asks if you'd like to edit them. Choose `y` to open the JSON file, make changes, then press Enter to continue rendering.

## Manual Workflow

### 1. Re-encode your screen recording

```bash
ffmpeg -i input.mp4 -r 30 -c:v libx264 -preset fast -crf 18 -c:a aac -y public/my-recording.mp4
```

### 2. Generate transcription with Whisper

```bash
python3 -m whisper public/my-recording.mp4 --model base --output_format json --word_timestamps True --output_dir public/
```

### 3. Create props JSON

Create a file in `props/` (see `props/place-labels-reels.json` for reference):

```json
{
  "title": "Add Place Labels",
  "highlightWords": ["Labels"],
  "backgroundColor": "#4BA3F5",
  "screenRecording": "my-recording.mp4",
  "introDurationInSeconds": 3,
  "outroDurationInSeconds": 3,
  "captions": {
    "segments": [
      {
        "start": 0.0,
        "end": 3.5,
        "text": "Open the app and tap settings",
        "words": [
          { "word": "Open", "start": 0.0, "end": 0.4 },
          { "word": "the", "start": 0.4, "end": 0.6 },
          { "word": "app", "start": 0.6, "end": 1.0 }
        ]
      }
    ]
  }
}
```

### 4. Preview

```bash
npm run dev
```

Open the Remotion Studio in your browser and select the **Reels** composition. Pass your props JSON via the Studio UI.

### 5. Render

```bash
PROPS=$(cat props/my-props.json)
npx remotion render Reels --props="$PROPS" --output=out/my-video.mp4 --codec=h264
```

## Template

iPhone mockup with screen recording, green pill word-by-word captions, branded intro/outro.

- **Intro**: Title with staggered word animation, last word highlighted in green pill
- **Recording**: iPhone mockup (PNG) with video inside, captions below
- **Outro**: "Travel Animator" branding with App Store callout

## Customization

### Change the iPhone mockup

Replace `public/iphone-mockup.png` with your own transparent PNG frame. Adjust screen area percentages in `src/reels/IPhoneMockup.tsx`:

```tsx
const SCREEN_TOP = 3.6;    // % from top
const SCREEN_LEFT = 4.8;   // % from left
const SCREEN_RIGHT = 4.8;  // % from right
const SCREEN_BOTTOM = 3.6; // % from bottom
```

### Change colors

- **Background**: Set `backgroundColor` in props (default: `#4BA3F5`)
- **Highlight pill**: Edit `GREEN_PILL` in `ReelsIntro.tsx` and `ReelsCaptions.tsx`

### Change fonts

Font imports are in `src/index.css`. The project uses **Nunito** (weights 400–900).

### Adjust caption position

In `src/reels/ReelsComposition.tsx`, edit the captions container:

```tsx
bottom: 200,  // distance from bottom of frame
left: 50,     // horizontal padding
right: 50,
height: 160,
```

## Project Structure

```
remotion-video/
├── public/
│   ├── iphone-mockup.png       # iPhone frame (transparent PNG)
│   └── *.mp4                   # Screen recordings (re-encoded)
├── props/
│   └── *.json                  # Video props (title, captions, etc.)
├── scripts/
│   └── create-tutorial.py      # Automated pipeline
├── src/
│   ├── reels/                  # Reels template (iPhone mockup)
│   │   ├── ReelsComposition.tsx
│   │   ├── ReelsIntro.tsx
│   │   ├── ReelsCaptions.tsx
│   │   ├── ReelsOutro.tsx
│   │   ├── IPhoneMockup.tsx
│   │   └── schema.ts
│   ├── Root.tsx                # Composition registry
│   └── index.css               # Font imports
└── out/                        # Rendered videos
```

## License

See [Remotion licensing](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md) for commercial use requirements.

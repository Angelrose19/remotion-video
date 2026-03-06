#!/usr/bin/env python3
"""
Tutorial Video Creator
======================
Automated pipeline to create tutorial reels from screen recordings.

Usage:
    python3 scripts/create-tutorial.py <screen-recording.mp4>

Flow:
    1. Ask for intro title
    2. Re-encode video to 30fps
    3. Run Whisper for timestamped transcription
    4. Clean up transcription (fix grammar, remove filler words)
    5. Generate props JSON
    6. Render video with Remotion (Reels template)
"""

import sys
import os
import json
import subprocess
import re

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(PROJECT_DIR, "public")
PROPS_DIR = os.path.join(PROJECT_DIR, "props")
OUT_DIR = os.path.join(PROJECT_DIR, "out")

BG_COLOR = "#4BA3F5"

# Filler words to remove from transcription
FILLER_WORDS = {
    "um", "uh", "uhh", "umm", "hmm", "hm",
    "you know", "basically", "actually", "so yeah",
    "okay so", "well",
}


def print_step(n, text):
    print(f"\n{'='*50}")
    print(f"  Step {n}: {text}")
    print(f"{'='*50}\n")


def ask_input(prompt, default=None):
    if default:
        result = input(f"{prompt} [{default}]: ").strip()
        return result if result else default
    return input(f"{prompt}: ").strip()


def reencode_video(input_path, output_path):
    """Re-encode to 30fps h264 for Remotion compatibility."""
    print("  Re-encoding video to 30fps...")
    subprocess.run(
        [
            "ffmpeg", "-i", input_path,
            "-r", "30",
            "-c:v", "libx264", "-preset", "fast", "-crf", "18",
            "-c:a", "aac",
            "-y", output_path,
        ],
        capture_output=True,
    )
    print(f"  Done: {os.path.basename(output_path)}")


def run_whisper(video_path, output_dir):
    """Run Whisper and return the JSON transcription."""
    print("  Running Whisper (this may take a minute)...")
    subprocess.run(
        [
            sys.executable, "-m", "whisper",
            video_path,
            "--model", "base",
            "--output_format", "json",
            "--word_timestamps", "True",
            "--output_dir", output_dir,
        ],
        capture_output=True,
    )

    basename = os.path.splitext(os.path.basename(video_path))[0]
    json_path = os.path.join(output_dir, basename + ".json")

    with open(json_path, "r") as f:
        return json.load(f)


def clean_transcription(whisper_data):
    """
    Clean up Whisper transcription:
    - Remove filler words
    - Fix capitalization
    - Keep timestamps intact
    """
    cleaned_segments = []

    for seg in whisper_data.get("segments", []):
        cleaned_words = []

        for word_data in seg.get("words", []):
            w = word_data["word"].strip().lower()

            if w in FILLER_WORDS or not w:
                continue

            cleaned_words.append({
                "word": word_data["word"].strip(),
                "start": round(word_data["start"], 2),
                "end": round(word_data["end"], 2),
            })

        if not cleaned_words:
            continue

        # Capitalize first word
        first = cleaned_words[0]["word"]
        cleaned_words[0]["word"] = first[0].upper() + first[1:]

        seg_text = " ".join(w["word"] for w in cleaned_words)

        cleaned_segments.append({
            "start": round(seg["start"], 2),
            "end": round(seg["end"], 2),
            "text": seg_text,
            "words": cleaned_words,
        })

    return {"segments": cleaned_segments}


def extract_highlight_word(title):
    """Use the last word of the title as the highlight word."""
    words = title.strip().split()
    return [words[-1]] if words else []


def render_video(props_path, output_name):
    """Render the video with Remotion."""
    print("  Rendering with Remotion...")
    output_path = os.path.join(OUT_DIR, f"{output_name}.mp4")

    with open(props_path, "r") as f:
        props_json = f.read()

    result = subprocess.run(
        [
            "npx", "remotion", "render", "Reels",
            f"--props={props_json}",
            f"--output={output_path}",
            "--codec=h264",
        ],
        cwd=PROJECT_DIR,
    )

    if result.returncode == 0:
        print(f"\n  Video saved: {output_path}")
        subprocess.run(["open", output_path])
    else:
        print("\n  Render failed. Check the error above.")

    return output_path


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/create-tutorial.py <screen-recording.mp4>")
        print("\nExample:")
        print("  python3 scripts/create-tutorial.py ~/Desktop/my-recording.mp4")
        sys.exit(1)

    input_video = os.path.abspath(sys.argv[1])

    if not os.path.exists(input_video):
        print(f"Error: File not found: {input_video}")
        sys.exit(1)

    base_name = os.path.splitext(os.path.basename(input_video))[0]
    base_name = re.sub(r"[^a-zA-Z0-9_-]", "-", base_name).lower().strip("-")

    print("\n" + "=" * 50)
    print("  Tutorial Video Creator")
    print("=" * 50)
    print(f"  Input: {os.path.basename(input_video)}")

    # ── Step 1: Get title ──
    print_step(1, "Intro Title")
    title = ask_input("Enter intro title (e.g. 'Add Place Labels')")
    highlight_words = extract_highlight_word(title)
    print(f"  Title: {title}")
    print(f"  Highlighted: {highlight_words[0]}")

    # ── Step 2: Re-encode ──
    print_step(2, "Re-encoding Video")
    video_filename = f"{base_name}.mp4"
    encoded_path = os.path.join(PUBLIC_DIR, video_filename)

    if os.path.exists(encoded_path):
        reuse = ask_input(f"  {video_filename} already exists. Reuse? (y/n)", "y")
        if reuse.lower() != "y":
            reencode_video(input_video, encoded_path)
    else:
        reencode_video(input_video, encoded_path)

    # ── Step 3: Whisper ──
    print_step(3, "Transcribing")
    whisper_json_path = os.path.join(PUBLIC_DIR, f"{base_name}.json")

    if os.path.exists(whisper_json_path):
        reuse = ask_input("  Whisper output exists. Reuse? (y/n)", "y")
        if reuse.lower() == "y":
            with open(whisper_json_path, "r") as f:
                whisper_data = json.load(f)
        else:
            whisper_data = run_whisper(encoded_path, PUBLIC_DIR)
    else:
        whisper_data = run_whisper(encoded_path, PUBLIC_DIR)

    # ── Step 4: Clean ──
    print_step(4, "Cleaning Transcription")
    captions = clean_transcription(whisper_data)

    print(f"  {len(captions['segments'])} segments:\n")
    for seg in captions["segments"]:
        print(f"  [{seg['start']:.1f}s - {seg['end']:.1f}s] {seg['text']}")

    cleaned_path = os.path.join(PROPS_DIR, f"{base_name}-captions.json")
    with open(cleaned_path, "w") as f:
        json.dump(captions, f, indent=2)

    edit = ask_input("\n  Edit captions before rendering? (y/n)", "n")
    if edit.lower() == "y":
        subprocess.run(["open", cleaned_path])
        input("  Press Enter when done editing...")
        with open(cleaned_path, "r") as f:
            captions = json.load(f)

    # ── Step 5: Create props + render ──
    print_step(5, "Rendering")

    props = {
        "title": title,
        "highlightWords": highlight_words,
        "backgroundColor": BG_COLOR,
        "screenRecording": video_filename,
        "introDurationInSeconds": 3,
        "outroDurationInSeconds": 3,
        "captions": captions,
    }

    props_path = os.path.join(PROPS_DIR, f"{base_name}.json")
    with open(props_path, "w") as f:
        json.dump(props, f, indent=2)

    render_video(props_path, base_name)

    print("\n" + "=" * 50)
    print("  Done!")
    print("=" * 50 + "\n")


if __name__ == "__main__":
    main()

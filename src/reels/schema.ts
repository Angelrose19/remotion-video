import { z } from "zod";

const whisperWordSchema = z.object({
  word: z.string(),
  start: z.number(),
  end: z.number(),
});

const whisperSegmentSchema = z.object({
  start: z.number(),
  end: z.number(),
  text: z.string(),
  words: z.array(whisperWordSchema),
});

const whisperOutputSchema = z.object({
  segments: z.array(whisperSegmentSchema),
});

export const reelsSchema = z.object({
  title: z.string(),
  highlightWords: z.optional(z.array(z.string())),
  backgroundColor: z.optional(z.string()),
  screenRecording: z.string(),
  captions: whisperOutputSchema,
  introDurationInSeconds: z.optional(z.number()),
  outroDurationInSeconds: z.optional(z.number()),
});

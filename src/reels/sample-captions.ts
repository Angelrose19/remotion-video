import { z } from "zod";
import { reelsSchema } from "./schema";

type Captions = z.infer<typeof reelsSchema>["captions"];

export const sampleReelsCaptions: Captions = {
  segments: [
    {
      start: 0.0,
      end: 3.5,
      text: "Plot the starting and ending point",
      words: [
        { word: "Plot", start: 0.0, end: 0.4 },
        { word: "the", start: 0.4, end: 0.55 },
        { word: "starting", start: 0.55, end: 1.0 },
        { word: "and", start: 1.0, end: 1.2 },
        { word: "ending", start: 1.2, end: 1.6 },
        { word: "point", start: 1.6, end: 2.0 },
      ],
    },
    {
      start: 4.0,
      end: 7.5,
      text: "Drag points between your destinations",
      words: [
        { word: "Drag", start: 4.0, end: 4.3 },
        { word: "points", start: 4.3, end: 4.7 },
        { word: "between", start: 4.7, end: 5.1 },
        { word: "your", start: 5.1, end: 5.3 },
        { word: "destinations", start: 5.3, end: 6.0 },
      ],
    },
    {
      start: 8.0,
      end: 11.0,
      text: "Select place labels and export",
      words: [
        { word: "Select", start: 8.0, end: 8.4 },
        { word: "place", start: 8.4, end: 8.7 },
        { word: "labels", start: 8.7, end: 9.1 },
        { word: "and", start: 9.1, end: 9.3 },
        { word: "export", start: 9.3, end: 9.8 },
      ],
    },
  ],
};

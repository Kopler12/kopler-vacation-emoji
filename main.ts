// One Emoji, One Dream Vacation — make.fun entry.
//
// Writes exactly one emoji, nothing else, to /output/entry.txt.
// The judge reads that single emoji as the dream vacation.
//
// Emoji: 🌅 (sunrise over the sea) — the golden-hour moment at the beach:
// the postcard image of a dream vacation, vivid at a glance, personal,
// and readable on any screen in any culture.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const EMOJI = "🌅";

// Guard: EMOJI must be exactly one grapheme cluster, so the output file
// can never accidentally grow a second visible character (a stray letter,
// a variation selector sequence, or a ZWJ pair would all change the count).
const graphemeSegmenter = new Intl.Segmenter(undefined, {
  granularity: "grapheme",
});
const graphemeCount = [...graphemeSegmenter.segment(EMOJI)].length;
if (graphemeCount !== 1) {
  throw new Error(
    `EMOJI must be exactly one grapheme cluster, got ${graphemeCount}`,
  );
}

// The grader runs this program in a sandbox and reads /output/entry.txt.
// OUTPUT_PATH exists only so the entry can be tested locally.
const out = process.env.OUTPUT_PATH ?? "/output/entry.txt";

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, EMOJI, "utf8");

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The robot vacuum's excuse, exactly as entered — one line, no newline.
const line =
  "I didn't miss that spot. I was giving the dust a head start, it's called strategy, not laziness.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, line, "utf8");

// The brief caps the entry at 140 characters, so fail loudly if it ever grows.
if (line.length > 140) {
  throw new Error(`excuse is ${line.length} characters, over the 140 limit`);
}

// Read it back and make sure what landed on disk is byte-for-byte the line,
// with no trailing newline sneaking in.
const written = readFileSync(target, "utf8");
if (written !== line || written.endsWith("\n")) {
  throw new Error("entry.txt does not match the excuse line exactly");
}
console.log(`Wrote entry.txt (${line.length} characters) to ${outDir}`);

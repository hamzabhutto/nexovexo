// One-off: key out the black background from the logo mark and write a
// transparent PNG. Run: node scripts/make-transparent-logo.mjs
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(__dirname, "..", "public");

const SRC = path.join(pub, "logo-mark.png"); // JPEG data, black bg
const OUT = path.join(pub, "logo-mark-transparent.png");

// Threshold: pixels whose brightness is below this become transparent.
// The N itself is bright (cyan/blue/violet), the background is ~#000.
const THRESHOLD = 48; // 0-255
const FEATHER = 26; // soft edge range above threshold

const img = sharp(SRC).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.from(data);

for (let i = 0; i < width * height; i++) {
  const o = i * channels;
  const r = data[o];
  const g = data[o + 1];
  const b = data[o + 2];
  // Perceived luminance
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  let alpha;
  if (lum <= THRESHOLD) {
    alpha = 0;
  } else if (lum <= THRESHOLD + FEATHER) {
    alpha = Math.round(((lum - THRESHOLD) / FEATHER) * 255);
  } else {
    alpha = 255;
  }
  out[o + 3] = alpha;
}

await sharp(out, { raw: { width, height, channels } })
  .png()
  .toFile(OUT);

console.log(`Wrote ${OUT} (${width}x${height})`);

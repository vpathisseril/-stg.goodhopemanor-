import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const sourceDirectory = resolve("assets");
const outputDirectory = resolve(sourceDirectory, "optimized");
const images = [
  { source: "bedroom_ivoryblue.jpg", output: "bedroom-ivoryblue.webp", width: 1200 },
  { source: "dining_room_blue.jpg", output: "dining-room-blue.webp", width: 1400 },
  { source: "dining_room_red.png", output: "dining-room-red.webp", width: 1400 },
  { source: "living_room2.jpg", output: "living-room-2.webp", width: 1400 },
  { source: "living_room3.jpg", output: "living-room-3.webp", width: 1200, quality: 70 },
  { source: "washing_closet.jpg", output: "washing-closet.webp", width: 1400 },
  { source: "Joyful Laughter in the Garden (1).png", output: "garden-laughter.webp", width: 1400, quality: 74 },
  { source: "Warm Garden Caregiving Conversation.png", output: "warm-garden-caregiving-conversation.webp", width: 1400, quality: 74 },
  { source: "Delicate Rose Petals on Ivory.png", output: "rose-petal-upper-left.webp", width: 360, quality: 82, extract: { left: 0, top: 70, width: 360, height: 300 } },
  { source: "Delicate Rose Petals on Ivory.png", output: "rose-petal-lower-right.webp", width: 360, quality: 82, extract: { left: 1311, top: 580, width: 360, height: 330 } },
];

await mkdir(outputDirectory, { recursive: true });

for (const image of images) {
  const inputPath = resolve(sourceDirectory, image.source);
  const outputPath = resolve(outputDirectory, image.output);
  let pipeline = sharp(inputPath).rotate();

  if (image.extract) {
    pipeline = pipeline.extract(image.extract);
  }

  const { size } = await pipeline
    .resize({ width: image.width, height: image.width, fit: "inside", withoutEnlargement: true })
    .webp({ quality: image.quality ?? 78, effort: 6 })
    .toFile(outputPath);
  const maxSize = image.output === "living-room-3.webp" ? 150_000 : 200_000;

  if (size > maxSize) {
    throw new Error(
      `${image.output} is ${size} bytes; the image budget is ${maxSize} bytes.`,
    );
  }

  console.info(`${image.source} -> ${image.output} (${size} bytes)`);
}

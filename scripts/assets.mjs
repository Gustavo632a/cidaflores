import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
await fs.mkdir(path.join(root, "assets/originals"), { recursive: true });
const hero = await fs.readFile(path.join(root, "assets/originals/hero.png"));
await fs.writeFile(path.join(root, "assets/originals/hero.png"), hero);
async function convert(buffer, name) {
  await sharp(buffer)
    .resize(1536, 1024, { fit: "cover" })
    .webp({ quality: 82 })
    .toFile(path.join(root, `public/images/${name}.webp`));
  await sharp(buffer)
    .resize(640, 427, { fit: "cover" })
    .webp({ quality: 78 })
    .toFile(path.join(root, `public/images/${name}-small.webp`));
}
await convert(hero, "hero-buque");
const ids = [
  "photo-1561181286-d3fee7d55364",
  "photo-1525310072745-f49212b5ac6d",
  "photo-1490750967868-88aa4486c946",
  "photo-1457089328109-e5d9bd499191",
  "photo-1462275646964-a0e3386b89fa",
  "photo-1487070183336-b863922373d4",
];
const names = [
  "colecao-01",
  "colecao-02",
  "colecao-03",
  "colecao-04",
  "sobre",
  "galeria-01",
  "galeria-02",
  "galeria-03",
  "galeria-04",
  "galeria-05",
  "galeria-06",
];
const images = await Promise.all(
  ids.map(async (id) => {
    const response = await fetch(
      `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=90`,
    );
    if (!response.ok) throw new Error(`${id}: ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(path.join(root, `assets/originals/${id}.jpg`), buffer);
    return buffer;
  }),
);
await Promise.all(
  names.map((name, index) => convert(images[index % images.length], name)),
);
console.info("Local WebP assets prepared.");

/**
 * convert-images.mjs
 * Converts JPG/PNG → WebP for all Luvera asset folders.
 * Safe to re-run — skips files where a .webp already exists.
 * Run from your project root: node scripts/convert-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const FOLDERS = [
  'public/ugc',
  'public/benefits',
  'public/ingredients',
  'public/hero',
  'public/product',
];

const QUALITY = 75;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

async function exists(filePath) {
  try { await stat(filePath); return true; } catch { return false; }
}

async function convertFolder(folderPath) {
  let files;
  try {
    files = await readdir(folderPath);
  } catch {
    console.warn(`  ⚠ Skipping ${folderPath} (not found)`);
    return;
  }

  const targets = files.filter(f => EXTENSIONS.has(extname(f).toLowerCase()));

  if (targets.length === 0) {
    console.log(`  — ${folderPath}: nothing to convert`);
    return;
  }

  for (const file of targets) {
    const inputPath  = join(folderPath, file);
    const outputPath = join(folderPath, basename(file, extname(file)) + '.webp');

    // Skip if .webp already exists
    if (await exists(outputPath)) {
      console.log(`  — ${file}: already converted, skipping`);
      continue;
    }

    try {
      const beforeStat = await stat(inputPath);
      await sharp(inputPath).webp({ quality: QUALITY }).toFile(outputPath);
      const afterStat  = await stat(outputPath);
      const pct = Math.round((1 - afterStat.size / beforeStat.size) * 100);
      const kb  = (n) => (n / 1024).toFixed(0) + ' KB';
      console.log(`  ✓ ${file} → .webp  ${kb(beforeStat.size)} → ${kb(afterStat.size)}  (${pct}% smaller)`);
    } catch (err) {
      console.error(`  ✗ Failed: ${file} —`, err.message);
    }
  }
}

console.log('🖼  Converting images to WebP...\n');
for (const folder of FOLDERS) {
  console.log(`📁 ${folder}`);
  await convertFolder(folder);
}
console.log('\n✅ Done. Update your src= attributes to use .webp extensions.');

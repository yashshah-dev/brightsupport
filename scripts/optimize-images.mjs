import { promises as fs } from 'fs'
import path from 'path'
import sharp from 'sharp'

const widths = [480, 768, 1024, 1400]
const rootDir = path.join(process.cwd(), 'public', 'images')

async function collectFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  const widthSuffixPattern = new RegExp(`-(${widths.join('|')})$`)

  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) files.push(...(await collectFiles(full)))
    else if (/\.(webp|png|jpg|jpeg)$/i.test(e.name)) {
      // Only process original files that don't have width suffixes
      // Skip files that contain patterns like -480, -768, -1024, -1400
      const baseName = path.parse(e.name).name
      if (!widthSuffixPattern.test(baseName)) {
        files.push(full)
      }
    }
  }
  return files
}

async function cleanupMalformedVariants(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const widthPattern = new RegExp(`-(${widths.join('|')})`, 'g')

  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      await cleanupMalformedVariants(full)
    } else if (/\.(webp|avif)$/i.test(e.name)) {
      const baseName = path.parse(e.name).name
      // Count width suffixes
      const widthMatches = baseName.match(widthPattern)
      const widthCount = widthMatches ? widthMatches.length : 0

      // Keep only files with 0 or 1 width suffix (originals and their direct variants)
      // Remove files with 2 or more width suffixes (malformed variants)
      if (widthCount > 1) {
        console.log(`Removing malformed variant: ${e.name}`)
        await fs.unlink(full)
      }
    }
  }
}

function variantName(file, w, ext) {
  const { name } = path.parse(file)
  return name + '-' + w + '.' + ext
}

async function ensureVariants(file) {
  const dir = path.dirname(file)
  const base = path.parse(file).name
  const buf = await fs.readFile(file)
  const image = sharp(buf)
  const meta = await image.metadata()

  // Check if all variants already exist
  let allVariantsExist = true
  for (const w of widths) {
    if (meta.width && meta.width < w) continue
    const webpPath = path.join(dir, variantName(file, w, 'webp'))
    const avifPath = path.join(dir, variantName(file, w, 'avif'))
    try {
      await fs.access(webpPath)
      await fs.access(avifPath)
    } catch {
      allVariantsExist = false
      break
    }
  }

  // Skip if all variants exist
  if (allVariantsExist) {
    process.stdout.write(base + ' (skipped - variants exist)\n')
    return
  }

  for (const w of widths) {
    if (meta.width && meta.width < w) continue
    const webpPath = path.join(dir, variantName(file, w, 'webp'))
    const avifPath = path.join(dir, variantName(file, w, 'avif'))
    let needWebp = true
    let needAvif = true
    try { await fs.access(webpPath); needWebp = false } catch { }
    try { await fs.access(avifPath); needAvif = false } catch { }
    if (!needWebp && !needAvif) continue
    const resized = sharp(buf).resize({ width: w })
    if (needWebp) await resized.clone().webp({ quality: 80 }).toFile(webpPath)
    if (needAvif) await resized.clone().avif({ quality: 50 }).toFile(avifPath)
    process.stdout.write(base + ' ' + w + '\n')
  }
}

async function run() {
  console.log('Cleaning up malformed variant files...')
  await cleanupMalformedVariants(rootDir)

  console.log('Processing original images...')
  const originals = await collectFiles(rootDir)
  console.log(`Found ${originals.length} original images to process`)

  for (const f of originals) await ensureVariants(f)
}

run().catch(e => { console.error(e); process.exit(1) })

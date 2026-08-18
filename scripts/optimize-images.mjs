// 图片压缩：只处理大图（>150KB），缩放超宽 + JPEG 质量压缩（就地覆盖）
// 小图保持原样，避免重编码反而变大。用法：node scripts/optimize-images.mjs
import { Jimp } from 'jimp'
import { readdir } from 'node:fs/promises'
import { statSync } from 'node:fs'
import { join } from 'node:path'

const QUALITY = 78
const SIZE_CUTOFF = 150 * 1024 // 只处理超过 150KB 的文件

const TARGETS = [
  ['public/photos/certs', 1500],
  ['public/photos/life', 1500],
  ['public/photos', 1000],
]

let saved = 0
for (const [dir, maxW] of TARGETS) {
  let files
  try {
    files = await readdir(dir)
  } catch {
    continue
  }
  for (const f of files) {
    if (!/\.(jpe?g|png)$/i.test(f)) continue
    const p = join(dir, f)
    if (statSync(p).size < SIZE_CUTOFF) continue // 小图不动
    try {
      const img = await Jimp.read(p)
      const before = img.bitmap.width
      if (img.bitmap.width > maxW) img.scaleToFit({ w: maxW, h: 10000 })
      await img.write(p, { quality: QUALITY })
      saved++
      console.log(`ok  ${p}  ${before}px → ${img.bitmap.width}px`)
    } catch (e) {
      console.error('fail', p, e?.message || e)
    }
  }
}
console.log(`done, ${saved} large files optimized`)

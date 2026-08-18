// 视频压缩：把视频压成适合页面背景的体积（1280 宽 / CRF30 / 去音轨 / faststart）
// 用法：node scripts/optimize-video.mjs [源文件，默认 public/hero-bg.mp4]
// 注意：会就地覆盖源文件，请先备份原始视频。
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { statSync, renameSync } from 'node:fs'

const require = createRequire(import.meta.url)
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path

const src = process.argv[2] || 'public/hero-bg.mp4'
const tmp = src + '.tmp.mp4'

console.log('encoding', src)
execFileSync(
  ffmpeg,
  [
    '-y', '-i', src,
    '-vf', 'scale=1280:-2:flags=lanczos',
    '-c:v', 'libx264', '-crf', '30', '-preset', 'medium',
    '-movflags', '+faststart', '-an', '-pix_fmt', 'yuv420p',
    tmp,
  ],
  { stdio: 'inherit' }
)

renameSync(tmp, src)
const mb = statSync(src).size / 1024 / 1024
console.log(`done → ${src} (${mb.toFixed(1)} MB)`)

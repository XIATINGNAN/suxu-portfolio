import { useEffect, useRef } from 'react'

// 全局动态背景：墨绿极光缓缓流动 + 磷光微粒上升
// 位于所有内容之后（z-index:0），不拦截交互
export default function BgFx() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // 尊重系统「减少动效」设置
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // 预渲染一颗发光的粒子贴图（一次），每帧 drawImage 远比逐粒子 arc+shadowBlur 快
    const SPRITE = 64
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = SPRITE
    const sctx = sprite.getContext('2d')
    const grad = sctx.createRadialGradient(SPRITE / 2, SPRITE / 2, 0, SPRITE / 2, SPRITE / 2, SPRITE / 2)
    grad.addColorStop(0, 'rgba(190, 255, 220, 1)')
    grad.addColorStop(0.25, 'rgba(140, 255, 200, 0.8)')
    grad.addColorStop(0.6, 'rgba(70, 235, 170, 0.28)')
    grad.addColorStop(1, 'rgba(46, 229, 163, 0)')
    sctx.fillStyle = grad
    sctx.fillRect(0, 0, SPRITE, SPRITE)

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let particles = []
    let raf = 0

    const spawn = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.6,          // 核心半径
      vy: Math.random() * 0.28 + 0.07,       // 上升速度
      vx: (Math.random() - 0.5) * 0.22,      // 水平漂移
      phase: Math.random() * Math.PI * 2,    // 闪烁相位
      a: Math.random() * 0.4 + 0.12,         // 基础透明度
    })

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = w < 640 ? 20 : 42 // 移动端减半
      particles = Array.from({ length: count }, spawn)
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.y -= p.vy
        p.x += p.vx + Math.sin(p.phase) * 0.18
        p.phase += 0.012

        if (p.y < -12) { p.y = h + 12; p.x = Math.random() * w }
        if (p.x < -12) p.x = w + 12
        else if (p.x > w + 12) p.x = -12

        const alpha = p.a * (0.65 + 0.35 * Math.sin(p.phase))
        const size = p.r * 7 // 贴图放大，形成柔和光晕
        ctx.globalAlpha = alpha
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size)
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="bgfx" aria-hidden="true">
      <div className="bgfx-aurora">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>
      <canvas ref={canvasRef} className="bgfx-canvas" />
    </div>
  )
}

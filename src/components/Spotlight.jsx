import { useEffect } from 'react'

// 指针跟随光晕：把光标在卡片内的相对位置写入 --mx/--my，
// 卡片光晕层据此渲染一束跟随指针的彩色光
export default function Spotlight() {
  useEffect(() => {
    let raf = 0

    const onMove = (e) => {
      const el = e.target.closest && e.target.closest('[data-spotlight]')
      if (!el) return
      // rAF 节流，避免高频布局读取
      if (raf) return
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
        el.style.setProperty('--my', `${e.clientY - rect.top}px`)
        raf = 0
      })
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      document.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return null
}

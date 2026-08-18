import { useEffect } from 'react'

// 轻量灯箱：点击大图查看，按 Esc 或点击背景关闭
export default function Lightbox({ src, caption, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-label="图片预览">
      <button className="lightbox-close" aria-label="关闭" onClick={onClose}>✕</button>
      <img src={src} alt={caption || '图片预览'} />
      {caption && <div className="lightbox-cap">{caption}</div>}
    </div>
  )
}

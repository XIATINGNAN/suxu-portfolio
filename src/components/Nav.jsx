import { useEffect, useState } from 'react'
import { nav, profile } from '../data/resume'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // rAF 节流：每帧最多处理一次滚动，避免高频 setState
    let raf = 0
    let current = false
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const next = window.scrollY > 24
        if (next !== current) {
          current = next
          setScrolled(next)
        }
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // 打开移动端菜单时锁定滚动
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a className="brand" href="#top" onClick={() => { setOpen(false) }}>
            <span className="zh">{profile.name}</span>
            <span className="en">VISUAL × AI × BRAND</span>
          </a>

          <nav className="nav-links" aria-label="主导航">
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                <span className="num">{item.num}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="btn btn-ghost nav-cta">开始合作</a>

          <button
            className={`nav-burger ${open ? 'open' : ''}`}
            aria-label="打开菜单"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* 移动端全屏菜单 */}
      <div className={`mobile-menu ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
        {nav.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            <span className="num">{item.num}</span>
            {item.label}
          </a>
        ))}
        <a className="btn btn-primary mm-cta" href="#contact">开始合作</a>
      </div>
    </>
  )
}

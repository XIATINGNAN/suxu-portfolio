import { useLayoutEffect, useRef, useState } from 'react'
import { profile } from '../data/resume'
import { gsap } from '../lib/gsap'

// 全屏首屏：opening 动画（遮罩揭开 + 标题位移/压缩归位）
// 视频背景（public/hero-bg.mp4，可选）+ 极光渐变兜底 + 科技网格 + 噪点
export default function Hero() {
  const videoRef = useRef(null)
  const rootRef = useRef(null)
  const panelRef = useRef(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffectVideo(videoRef, setVideoReady)

  // 首屏 opening 动画
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // 遮罩面板揭开：ref 直接引用，不受作用域限制
      const panel = panelRef.current
      const mark = panel.querySelector('.ip-mark')
      tl.to(panel, { yPercent: -100, duration: 1.25, ease: 'expo.inOut' }, 0.3)
        .to(mark, { opacity: 0, y: -24, duration: 0.6, ease: 'power3.out' }, 0.28)
        .to(panel, { autoAlpha: 0, duration: 0.2, ease: 'none' }, 1.55)

      // 标题：大幅位移进场 + 压缩归位（scaleY 0.94 → 1）
      tl.fromTo(
        '.hm .hero-title-line',
        { yPercent: 125, scaleY: 0.94 },
        { yPercent: 0, scaleY: 1, duration: 1.5, stagger: 0.12 },
        0.62
      )

      // 其余元素依次进场
      tl.fromTo('.hero-overline', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.5)
        .fromTo('.hero-role', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 1.3)
        .fromTo('.hero-sub', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 1.38)
        .fromTo('.hero-actions', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 1.46)
        .fromTo('.hero-meta', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 1.56)
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* 首屏 opening 遮罩面板（fixed，兄弟节点 + ref，避免作用域/裁剪问题） */}
      <div className="intro-panel" ref={panelRef} aria-hidden="true">
        <span className="ip-mark">苏</span>
        <span className="ip-sub">SU XU · VISUAL × AI × BRAND</span>
      </div>

      <section className="hero" id="top" ref={rootRef}>
        <div className="hero-bg" aria-hidden="true">
          <div className="aurora" />
          <div className="grid-lines" />
          <video
            ref={videoRef}
            className={`hero-video ${videoReady ? 'ready' : ''}`}
            src={`${import.meta.env.BASE_URL}hero-bg.mp4`}
            poster={`${import.meta.env.BASE_URL}hero-poster.jpg`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="hero-veil" />
          <div className="noise" />
        </div>

        <div className="hero-inner">
          <p className="overline hero-overline">PORTFOLIO · 2026</p>

          <h1 className="hero-title">
            <span className="hm">
              <span className="hero-title-line">{profile.name}</span>
            </span>
            <span className="hm">
              <span className="hero-title-line grad">设计 × AI</span>
            </span>
          </h1>

          <div className="hero-role">
            <span>视觉设计师</span>
            <span className="dot" />
            <span>AI 设计师</span>
            <span className="dot" />
            <span>品牌设计师</span>
          </div>

          <p className="hero-sub">{profile.tagline}</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#works">
              查看作品 <span className="arr">→</span>
            </a>
            <a className="btn btn-ghost" href="#contact">开始合作</a>
          </div>
        </div>

        <div className="hero-meta">
          <div className="group">
            <span>📍 <b>{profile.location}</b></span>
            <span>✉️ <b>{profile.email}</b></span>
          </div>
          <span className="scroll-hint"><span className="line" />滚动探索</span>
        </div>
      </section>
    </>
  )
}

// 视频预加载成功后再淡入，失败则回退极光渐变背景
function useEffectVideo(videoRef, setVideoReady) {
  useLayoutEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onLoaded = () => setVideoReady(true)
    const onFail = () => setVideoReady(false)
    v.addEventListener('loadeddata', onLoaded)
    v.addEventListener('error', onFail)
    return () => {
      v.removeEventListener('loadeddata', onLoaded)
      v.removeEventListener('error', onFail)
    }
  }, [videoRef, setVideoReady])
}

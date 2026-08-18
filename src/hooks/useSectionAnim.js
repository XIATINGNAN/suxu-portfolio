import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// 统一的模块进场动效：
//  幽灵英文大标题大幅度进场 → overline → 标题遮罩揭开 → 卡片 stagger → 图片 reveal + 视差
// 缓动统一用 power3/4.out（丝滑减速），不做廉价回弹
export default function useSectionAnim() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || REDUCED) return

    const q = gsap.utils.selector(el)

    // —— 头部进场：幽灵英文大标题 → overline → 标题遮罩 ——
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 78%' },
      defaults: { ease: 'power4.out' },
    })

    const ghost = q('.ghost')
    if (ghost.length) {
      tl.fromTo(
        ghost,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.6 },
        0
      )
    }

    const overline = q('.section-head .overline')
    if (overline.length) {
      tl.fromTo(
        overline,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        0.15
      )
    }

    const inner = q('.title-mask .title-inner')
    if (inner.length) {
      tl.fromTo(
        inner,
        { yPercent: 115 },
        { yPercent: 0, duration: 1.4 },
        0.2
      )
    }

    // —— 卡片 stagger ——
    q('[data-stagger]').forEach((grid) => {
      const items = gsap.utils.toArray(grid.querySelectorAll(':scope > .anim-card'))
      if (!items.length) return
      gsap.fromTo(
        items,
        { y: 72, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.15,
          ease: 'power3.out',
          stagger: 0.09,
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: grid, start: 'top 84%' },
        }
      )
    })

    // —— 图片 reveal（缩放落位） + 轻微视差 ——
    q('.img-reveal').forEach((frame) => {
      const img = frame.querySelector('img')
      if (!img) return
      const parallax = frame.classList.contains('parallax')

      if (parallax) {
        // 视差图：保留 1.2 倍余量（CSS 基座），reveal 由更大缩放到位，滚动时轻微上下漂移
        gsap.fromTo(
          img,
          { scale: 1.35 },
          {
            scale: 1.2,
            duration: 1.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: frame, start: 'top 88%' },
          }
        )
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: frame,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      } else {
        // 普通图：轻微缩放 reveal，结束后还原，不裁切（如证书文档）
        gsap.fromTo(
          img,
          { scale: 1.12 },
          {
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: frame, start: 'top 90%' },
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && el.contains(st.trigger)) st.kill()
      })
      tl.kill()
    }
  }, [])

  return ref
}

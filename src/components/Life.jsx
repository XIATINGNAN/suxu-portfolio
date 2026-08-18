import { useState } from 'react'
import { life } from '../data/resume'
import useSectionAnim from '../hooks/useSectionAnim'
import Lightbox from './Lightbox'

// 生活掠影：爱好 / 社交 / 个人掠影图集
export default function Life() {
  const ref = useSectionAnim()
  const [zoom, setZoom] = useState(null) // 图集灯箱

  const cards = [
    {
      ...life.archery,
      tagText: life.archery.tag,
      href: null,
    },
    {
      ...life.douyin,
      tagText: life.douyin.tag + (life.douyin.url ? ' · 可跳转' : ' · 链接待补充'),
      href: life.douyin.url || null,
    },
  ]

  return (
    <section className="section life" id="life" ref={ref}>
      <div className="wrap">
        <div className="section-head">
          <span className="ghost" aria-hidden="true">LIFE</span>
          <div className="left">
            <span className="overline">Life — 生活掠影</span>
            <h2 className="section-title">
              <span className="title-mask">
                <span className="title-inner">工作之外，<em>生活有光</em></span>
              </span>
            </h2>
          </div>
          <span className="section-note">爱好 · 社交 · 记录</span>
        </div>

        {/* 特色卡片：射箭 + 抖音 */}
        <div className="life-feat" data-stagger>
          {cards.map((c, i) => (
            <a
              key={c.title}
              className="life-card anim-card img-reveal parallax"
              href={c.href}
              target={c.href ? '_blank' : undefined}
              rel="noreferrer"
              data-spotlight
            >
              <img src={c.src} alt={c.title} loading="lazy" decoding="async" />
              <div className="veil" />
              <span className="ext">{c.tagText}</span>
              <div className="info">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            </a>
          ))}
        </div>

        {/* 个人掠影图集 */}
        <div className="life-gallery" data-stagger>
          {life.gallery.map((g, i) => (
            <button
              key={g.src}
              className="item anim-card img-reveal"
              onClick={() => setZoom(i)}
              aria-label={`放大查看：${g.note}`}
              data-spotlight
            >
              <img src={g.src} alt={g.note} loading="lazy" decoding="async" />
              <span className="note">{g.note}</span>
            </button>
          ))}
        </div>

        {zoom !== null && (
          <Lightbox
            src={life.gallery[zoom].src}
            caption={life.gallery[zoom].note}
            onClose={() => setZoom(null)}
          />
        )}
      </div>
    </section>
  )
}

import { useState } from 'react'
import { works, certs } from '../data/resume'
import useSectionAnim from '../hooks/useSectionAnim'
import Lightbox from './Lightbox'

// 精选项目：大卡片展示作品 + 证书墙
export default function Works() {
  const ref = useSectionAnim()
  const [zoom, setZoom] = useState(null) // 证书墙灯箱

  return (
    <section className="section works" id="works" ref={ref}>
      <div className="wrap">
        <div className="section-head">
          <span className="ghost" aria-hidden="true">WORKS</span>
          <div className="left">
            <span className="overline">Works — 精选项目</span>
            <h2 className="section-title">
              <span className="title-mask">
                <span className="title-inner">作品与证书，<em>用结果说话</em></span>
              </span>
            </h2>
          </div>
          <span className="section-note">作品集 · 能力 · 认证</span>
        </div>

        <div className="works-grid" data-stagger>
          {works.map((w, i) => (
            <article
              key={w.id}
              className={`work-card anim-card ${w.span} ${w.placeholder ? 'placeholder' : ''}`}
              data-spotlight
            >
              <div className="top">
                <span className="num">{w.num}</span>
                <span className={`status ${w.statusTone}`}>{w.status}</span>
              </div>

              <h3>{w.title}</h3>
              <span className="cat">{w.category}</span>
              <p className="desc">{w.desc}</p>

              {w.metrics && (
                <div className="work-metrics">
                  {w.metrics.map((m) => (
                    <div className="m" key={m.label}>
                      <div className="value">{m.value}</div>
                      <div className="label">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="tags">
                {w.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* 证书墙 */}
        <div className="certs-block">
          <div className="certs-head">
            <h3>证书墙</h3>
            <span className="line" />
            <span className="meta">点击放大 · 共 {certs.length} 项</span>
          </div>
          <div className="certs-grid" data-stagger>
            {certs.map((c, i) => (
              <button
                key={c.src}
                className="cert-card anim-card"
                onClick={() => setZoom(i)}
                aria-label={`放大查看：${c.title}`}
                data-spotlight
              >
                <div className="frame img-reveal">
                  <img src={c.src} alt={c.title} loading="lazy" decoding="async" />
                </div>
                <div className="cap">
                  <div className="t">{c.title}</div>
                  <div className="m">{c.meta} · {c.note}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="works-foot">
          <span className="hint">注：部分项目资料整理中，待补充内容将在此模块持续更新。</span>
          <span>SU XU — PORTFOLIO</span>
        </div>

        {zoom !== null && (
          <Lightbox
            src={certs[zoom].src}
            caption={`${certs[zoom].title} — ${certs[zoom].meta}`}
            onClose={() => setZoom(null)}
          />
        )}
      </div>
    </section>
  )
}

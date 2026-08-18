import { strengths } from '../data/resume'
import useSectionAnim from '../hooks/useSectionAnim'

// 个人优势：卡片展示能力
export default function Strengths() {
  const ref = useSectionAnim()

  return (
    <section className="section strengths" id="strengths" ref={ref}>
      <div className="wrap">
        <div className="section-head">
          <span className="ghost" aria-hidden="true">STRENGTHS</span>
          <div className="left">
            <span className="overline">Strengths — 个人优势</span>
            <h2 className="section-title">
              <span className="title-mask">
                <span className="title-inner">四项能力，<em>互为支撑</em></span>
              </span>
            </h2>
          </div>
          <span className="section-note">设计 × AI × 技术</span>
        </div>

        <div className="strengths-grid" data-stagger>
          {strengths.map((s) => (
            <article key={s.num} className="str-card anim-card" data-spotlight>
              <div className="head">
                <span className="icon">{s.icon}</span>
                <span className="num">{s.num}</span>
              </div>
              <h3>{s.title}</h3>
              <p className="desc">{s.desc}</p>
              <div className="tags">
                {s.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

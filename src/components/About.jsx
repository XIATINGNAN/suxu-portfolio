import { useState } from 'react'
import { profile, stats } from '../data/resume'
import useSectionAnim from '../hooks/useSectionAnim'

// 个人经历：头像 / 个人介绍 / 联系方式 / 项目数据
export default function About() {
  const ref = useSectionAnim()
  const [avatarOk, setAvatarOk] = useState(true)

  return (
    <section className="section about" id="about" ref={ref}>
      <div className="wrap">
        <div className="section-head">
          <span className="ghost" aria-hidden="true">ABOUT</span>
          <div className="left">
            <span className="overline">About — 个人经历</span>
            <h2 className="section-title">
              <span className="title-mask">
                <span className="title-inner">把技术与表达力，<em>叠加成作品</em></span>
              </span>
            </h2>
          </div>
          <span className="section-note">{profile.education} · {profile.school}</span>
        </div>

        <div className="about-grid">
          {/* 头像 / 肖像（图片 reveal + 轻微视差） */}
          <div className="portrait img-reveal parallax">
            <img
              src={profile.avatar}
              alt={`${profile.name} 肖像`}
              fetchPriority="high"
              decoding="async"
              onError={() => setAvatarOk(false)}
              style={{ display: avatarOk ? undefined : 'none' }}
            />
            <div className="monogram" style={{ display: avatarOk ? 'none' : undefined }}>
              <span>{profile.name.charAt(0)}</span>
            </div>
          </div>
          <div className="portrait-caption">
            <span>{profile.nameEn} / {profile.major}</span>
            <span className="status">● 可合作</span>
          </div>

          {/* 右侧内容 */}
          <div data-stagger>
            <div className="anim-card">
              <p className="lead">
                你好，我是 <em>{profile.name}</em>。专注
                <em> 视觉设计、AI 设计与品牌表达</em>，也拥有电气工程与自动化的专业底色。
              </p>
            </div>
            {profile.bio.map((p, i) => (
              <div className="anim-card" key={i}>
                <p className="para">{p}</p>
              </div>
            ))}

            <div className="anim-card">
              <div className="about-meta">
                <div className="cell">
                  <div className="k">邮箱</div>
                  <a className="v" href={profile.emailHref}>{profile.email}</a>
                </div>
                <div className="cell">
                  <div className="k">电话</div>
                  <a className="v" href={`tel:${profile.phone.replace(/-/g, '')}`}>{profile.phone}</a>
                </div>
                <div className="cell">
                  <div className="k">LinkedIn</div>
                  <a className="v" href={profile.linkedinHref} target="_blank" rel="noreferrer">{profile.linkedin}</a>
                </div>
                <div className="cell">
                  <div className="k">所在地</div>
                  <span className="v">{profile.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 项目数据 */}
        <div className="about-stats" data-stagger>
          {stats.map((s, i) => (
            <div className="stat anim-card" key={i} data-spotlight>
              <div className="value">{s.value}</div>
              <div className="label">{s.label}</div>
              <div className="note">{s.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

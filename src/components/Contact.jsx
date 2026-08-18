import { contact, profile } from '../data/resume'
import useSectionAnim from '../hooks/useSectionAnim'

// 联系方式：整页收尾
export default function Contact() {
  const ref = useSectionAnim()

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="contact-bg" aria-hidden="true" />

      <div className="contact-inner">
        <div className="contact-head-top">
          <span className="ghost" aria-hidden="true">CONTACT</span>
          <span className="overline">Contact — 联系我</span>
          <h2 className="contact-heading">
            <span className="title-mask">
              <span className="title-inner">{contact.heading[0]}<br />{contact.heading[1]}</span>
            </span>
          </h2>
          <p className="contact-sub">{contact.sub}</p>

          <a className="contact-email" href={contact.methods[0].href}>
            {contact.methods[0].value}
          </a>
        </div>

        <div className="contact-grid" data-stagger>
          {contact.methods.map((m) => (
            <div className="cell anim-card" key={m.label} data-spotlight>
              <div className="icon">{m.icon}</div>
              <div className="k">{m.label}</div>
              {m.href ? (
                <a className="v" href={m.href} target={m.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {m.value}
                </a>
              ) : (
                <span className="v">{m.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <span>© 2026 {profile.name} · {profile.nameEn}</span>
          <span>用心构建每一个像素</span>
          <a className="to-top" href="#top">回到顶部 ↑</a>
        </div>
      </footer>
    </section>
  )
}

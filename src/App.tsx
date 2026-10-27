import { useState, type CSSProperties, type ReactNode } from 'react'
import { profile, labels, checks, commits, diff, type CheckStatus } from './data'

type Tab = 'conversation' | 'commits' | 'checks' | 'files'

const Icon = {
  PR: () => (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.12v5.26a2.25 2.25 0 1 1-1.5 0V5.37a2.25 2.25 0 0 1-1.5-2.12Zm2.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM10 2.5h1a2.5 2.5 0 0 1 2.5 2.5v5.63a2.25 2.25 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.25a.25.25 0 0 1-.43.18L7.4 3.26a.25.25 0 0 1 0-.36l2.17-2.17a.25.25 0 0 1 .43.18Zm2.25 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
    </svg>
  ),
  Merge: () => (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M5.45 5.15A2.25 2.25 0 1 0 4.5 5.37v5.26a2.25 2.25 0 1 0 1.5 0V8.06a4.5 4.5 0 0 0 3.25 1.43h.52a2.25 2.25 0 1 0 0-1.5h-.52a3 3 0 0 1-2.8-1.93l-.5-.9ZM4.5 3.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Zm.75 9a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm6.75-3.5a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Z" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
    </svg>
  ),
  Commit: () => (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M11.93 8.5a4 4 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4 4 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
    </svg>
  ),
  Tag: () => (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M1 7.78V2.75C1 1.78 1.78 1 2.75 1h5.03c.46 0 .9.18 1.24.51l5.5 5.5a1.75 1.75 0 0 1 0 2.48l-5.03 5.03a1.75 1.75 0 0 1-2.48 0l-5.5-5.5A1.75 1.75 0 0 1 1 7.78Zm1.5 0c0 .07.03.13.07.18l5.5 5.5a.25.25 0 0 0 .36 0l5.03-5.03a.25.25 0 0 0 0-.36l-5.5-5.5a.25.25 0 0 0-.18-.07H2.75a.25.25 0 0 0-.25.25ZM6 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    </svg>
  ),
  Eye: () => (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M8 2c1.98 0 3.67 1.02 4.9 2.15C14.13 5.3 15 6.6 15.42 7.4c.1.2.1.42 0 .62C15 8.8 14.13 10.1 12.9 11.25 11.67 12.38 9.98 13.4 8 13.4s-3.67-1.02-4.9-2.15C1.87 10.1 1 8.8.58 8.02a.68.68 0 0 1 0-.62C1 6.6 1.87 5.3 3.1 4.15 4.33 3.02 6.02 2 8 2ZM8 5a2.7 2.7 0 1 0 0 5.4A2.7 2.7 0 0 0 8 5Z" />
    </svg>
  ),
}

function StatusIcon({ status }: { status: CheckStatus }) {
  return status === 'success' ? (
    <span className="status ok" title="Passed"><Icon.Check /></span>
  ) : (
    <span className="status pending" title="Pending"><span className="dot" /></span>
  )
}

function Avatar({ size = 40 }: { size?: number }) {
  return <img className="avatar" src={profile.avatar} alt={profile.name} width={size} height={size} />
}

function TimelineEvent({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="event">
      <span className="event-icon">{icon}</span>
      <div className="event-body">{children}</div>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState<Tab>('conversation')
  const [merged, setMerged] = useState(false)
  const passed = checks.filter((c) => c.status === 'success').length
  const pending = checks.length - passed

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'conversation', label: 'Conversation', count: merged ? 2 : 1 },
    { id: 'commits', label: 'Commits', count: commits.length },
    { id: 'checks', label: 'Checks', count: checks.length },
    { id: 'files', label: 'Files changed', count: 1 },
  ]

  const [copied, setCopied] = useState(false)
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent('Hablemos - PR #1')}`

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copiá mi mail:', profile.email)
    }
  }

  const contact = (
    <>
      <div className="contact-buttons">
        <a className="btn primary" href={gmailUrl} target="_blank" rel="noreferrer">Escribirme por Gmail</a>
        <button className="btn" onClick={copyEmail}>{copied ? '¡Copiado!' : 'Copiar mail'}</button>
        <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
      <p className="email-line"><code>{profile.email}</code></p>
    </>
  )

  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <span className="logo" aria-hidden>{'</>'}</span>
          <span className="crumb">
            xeroo <span className="sep">/</span> <strong>equipo-dev</strong>
          </span>
          <span className="public">Public</span>
        </div>
      </header>

      <main className="wrap">
        <div className="pr-head">
          <h1>
            Sumar a Nahuel Menichetti al equipo de desarrollo <span className="num">#1</span>
          </h1>
          <div className="pr-meta">
            <span className={`state ${merged ? 'merged' : 'open'}`}>
              {merged ? <Icon.Merge /> : <Icon.PR />} {merged ? 'Merged' : 'Open'}
            </span>
            <span className="meta-text">
              <strong>{profile.handle}</strong> {merged ? 'merged' : 'wants to merge'} {commits.length} commits
              into <code>xeroo:main</code> from <code>nahuel:full-stack-dev</code>
            </span>
          </div>
        </div>

        <nav className="tabs" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={tab === t.id ? 'tab active' : 'tab'}
              onClick={() => setTab(t.id)}
            >
              {t.label} <span className="count">{t.count}</span>
            </button>
          ))}
        </nav>

        <div className="layout">
          <section className="content">
            {tab === 'conversation' && (
              <div className="timeline">
                <article className="comment">
                  <Avatar />
                  <div className="comment-box">
                    <div className="comment-header">
                      <strong>{profile.handle}</strong> commented
                      <span className="badge">Author</span>
                    </div>
                    <div className="comment-body">
                      <h2>¿Qué cambia?</h2>
                      <p>
                        Suma un desarrollador full-stack al equipo que va a construir el sistema de gestión
                        integral. Trabajo principalmente en TypeScript: React en el frontend, Node.js, Express y
                        PostgreSQL en el backend.
                      </p>
                      <h2>Contexto</h2>
                      <ul>
                        <li>Hoy hago desarrollo web para <strong>LEB Entertainment</strong>, una productora de música en vivo.</li>
                        <li>Antes fui desarrollador frontend en <strong>Globant</strong>, con React y TypeScript en un equipo Scrum.</li>
                        <li>Estudio Ciencias de la Computación en <strong>UADE</strong>.</li>
                      </ul>
                      <h2>Cómo probarlo</h2>
                      <ul>
                        <li>
                          Demo de Car Rental, mi último proyecto full-stack:{' '}
                          <a href={profile.demo} target="_blank" rel="noreferrer">car-rental-xi-teal-49.vercel.app</a>
                        </li>
                        <li>
                          Código:{' '}
                          <a href={profile.repo} target="_blank" rel="noreferrer">github.com/Nahuel7709/Car-Rental</a>
                        </li>
                        <li>
                          Esta página también es el entregable: React + TypeScript + Vite, deployada en Vercel.
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>

                <TimelineEvent icon={<Icon.Tag />}>
                  <strong>{profile.handle}</strong> added labels{' '}
                  {labels.map((l) => (
                    <span key={l.name} className="label" style={{ '--label': l.color } as CSSProperties}>{l.name}</span>
                  ))}
                </TimelineEvent>
                <TimelineEvent icon={<Icon.Eye />}>
                  <strong>{profile.handle}</strong> requested a review from <strong>equipo de Xeroo</strong>
                </TimelineEvent>

                {merged && (
                  <TimelineEvent icon={<Icon.Merge />}>
                    <strong>equipo de Xeroo</strong> merged commit <code>1d9b4e8</code> into <code>main</code>
                  </TimelineEvent>
                )}

                <div className={merged ? 'merge-box merged' : 'merge-box'}>
                  {merged ? (
                    <div className="merge-done">
                      <span className="merge-icon"><Icon.Merge /></span>
                      <div>
                        <h3>Pull request successfully merged 🎉</h3>
                        <p>Gracias por llegar hasta acá. El siguiente paso es una charla:</p>
                        {contact}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="merge-row">
                        <span className="status ok big"><Icon.Check /></span>
                        <div>
                          <strong>{pending === 0 ? 'All checks have passed' : `${passed} checks passed, ${pending} pending`}</strong>
                          <button className="link" onClick={() => setTab('checks')}>Ver checks</button>
                        </div>
                      </div>
                      <div className="merge-row">
                        <span className="status ok big"><Icon.Check /></span>
                        <div>
                          <strong>This branch has no conflicts with the base branch</strong>
                          <p className="muted">Disponible para full-time híbrido en Buenos Aires.</p>
                        </div>
                      </div>
                      <div className="merge-actions">
                        <button className="btn merge" onClick={() => setMerged(true)}>Merge pull request</button>
                        <span className="muted">o <a href={gmailUrl} target="_blank" rel="noreferrer">dejá un comentario por mail</a></span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {tab === 'commits' && (
              <div className="panel">
                <div className="panel-title"><Icon.Commit /> Commits en <code>nahuel:full-stack-dev</code></div>
                <ol className="commits">
                  {commits.map((c) => (
                    <li key={c.hash}>
                      <div className="commit-msg">{c.msg}</div>
                      <div className="commit-meta">
                        <Avatar size={18} /> <strong>{profile.handle}</strong> · {c.date}
                      </div>
                      <code className="hash">{c.hash}</code>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {tab === 'checks' && (
              <div className="panel">
                <div className="panel-title">
                  Requisitos de la búsqueda: {passed} de {checks.length} en verde
                </div>
                <ul className="checks">
                  {checks.map((c) => (
                    <li key={c.name}>
                      <StatusIcon status={c.status} />
                      <div>
                        <strong>{c.name}</strong>
                        <p>{c.detail}</p>
                      </div>
                      <span className={`check-state ${c.status}`}>{c.status === 'success' ? 'Passed' : 'Pending'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === 'files' && (
              <div className="panel diff">
                <div className="panel-title">
                  <code>src/team/devTeam.ts</code>
                  <span className="diffstat">
                    <span className="plus">+{diff.filter((l) => l.type === 'add').length}</span>{' '}
                    <span className="minus">−0</span>
                  </span>
                </div>
                <pre className="code">
                  {diff.map((l, i) => (
                    <div key={i} className={`line ${l.type}`}>
                      <span className="ln">{i + 1}</span>
                      <span className="sign">{l.type === 'add' ? '+' : ' '}</span>
                      <span>{l.text}</span>
                    </div>
                  ))}
                </pre>
              </div>
            )}
          </section>

          <aside className="sidebar">
            <div className="side-block">
              <h4>Reviewers</h4>
              <p><span className="status pending small"><span className="dot" /></span> equipo de Xeroo</p>
            </div>
            <div className="side-block">
              <h4>Assignees</h4>
              <p className="assignee"><Avatar size={20} /> {profile.handle}</p>
            </div>
            <div className="side-block">
              <h4>Labels</h4>
              <div className="labels">
                {labels.map((l) => (
                  <span key={l.name} className="label" style={{ '--label': l.color } as CSSProperties}>{l.name}</span>
                ))}
              </div>
            </div>
            <div className="side-block">
              <h4>Links</h4>
              <ul className="links">
                <li><a href={profile.demo} target="_blank" rel="noreferrer">Demo de Car Rental</a></li>
                <li><a href={profile.repo} target="_blank" rel="noreferrer">Repo de Car Rental</a></li>
                <li><a href={profile.cv} target="_blank" rel="noreferrer">Ver CV (PDF)</a> · <a href={profile.cv} download>Descargar</a></li>
                <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <footer className="wrap footer">
        Hecho por {profile.name} para la búsqueda de Xeroo · React + TypeScript + Vite
      </footer>
    </>
  )
}

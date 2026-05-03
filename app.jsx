const { useState, useEffect, useRef, useMemo } = React;

// ============================================================
// bitsharp — landing page
// ============================================================

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#c8ff3d",
  "showGrid": true,
  "heroVariant": "sharpen",
  "language": "en"
}/*EDITMODE-END*/;

const COPY = {
  en: {
    nav: ["Work", "Services", "Process", "Team", "Contact"],
    cta: "Start a project",
    eyebrow: "Independent software studio · est. 2019 · Lviv / remote",
    heroLine1: "We build",
    heroLine2: "sharp",
    heroLine3: "software.",
    heroSub: "bitsharp is a small team of senior engineers shipping production systems for fintech, logistics and developer tools. No agencies. No layers. Just the people writing the code.",
    statLabel1: "Years compounding",
    statLabel2: "Shipped products",
    statLabel3: "Senior engineers",
    statLabel4: "Avg. retention",
    servicesTitle: "What we do",
    servicesSub: "Four practices. One team rotates between them.",
    processTitle: "How we work",
    processSub: "A two-week rhythm. No SOWs that read like novels.",
    workTitle: "Selected work",
    workSub: "Public case studies. Ask for the rest under NDA.",
    teamTitle: "The bench",
    teamSub: "Seven engineers. One designer. Zero account managers.",
    contactTitle: "Let's talk",
    contactSub: "Tell us what you're building. We answer within one business day, in plain language.",
    footerNote: "bitsharp ltd · made in Lviv, Ukraine"
  },
  uk: {
    nav: ["Роботи", "Послуги", "Процес", "Команда", "Контакти"],
    cta: "Розпочати проєкт",
    eyebrow: "Незалежна студія розробки · з 2019 · Львів / віддалено",
    heroLine1: "Ми пишемо",
    heroLine2: "гострий",
    heroLine3: "софт.",
    heroSub: "bitsharp — маленька команда сеньйорних інженерів, що запускає продакшн-системи для fintech, логістики та девтулзів. Без агенцій. Без прошарків. Лише ті, хто пише код.",
    statLabel1: "Років роботи",
    statLabel2: "Запущених продуктів",
    statLabel3: "Сеньйор-інженерів",
    statLabel4: "Середнє утримання",
    servicesTitle: "Що ми робимо",
    servicesSub: "Чотири напрямки. Одна команда ротує між ними.",
    processTitle: "Як ми працюємо",
    processSub: "Двотижневий ритм. Без контрактів-романів.",
    workTitle: "Вибрані роботи",
    workSub: "Публічні кейси. Решта — за NDA.",
    teamTitle: "Команда",
    teamSub: "Сім інженерів. Один дизайнер. Нуль акаунт-менеджерів.",
    contactTitle: "Поговорімо",
    contactSub: "Розкажіть, що ви будуєте. Відповідаємо протягом одного робочого дня, простою мовою.",
    footerNote: "bitsharp ltd · зроблено у Львові, Україна"
  }
};

const SERVICES = [
  { id: "01", code: "build", title: "Product engineering", body: "Greenfield web and mobile products. TypeScript, Rust, Swift. We own the stack from the first commit to live ops.", tags: ["React", "Next", "Rust", "Postgres"] },
  { id: "02", code: "scale", title: "Platform & infra", body: "Latency budgets, cost ceilings, observability that actually pages the right person. AWS, GCP, bare-metal where it pays off.", tags: ["k8s", "Terraform", "OTel"] },
  { id: "03", code: "ai",    title: "Applied AI", body: "Retrieval, evals, agent loops. We build the boring 80% around the model so the demo survives contact with users.", tags: ["LLM", "RAG", "Evals"] },
  { id: "04", code: "audit", title: "Audits & rescue", body: "Drop us into a stuck codebase. Two weeks later you get a written assessment, a triaged backlog and a path forward.", tags: ["Review", "Refactor"] }
];

const PROCESS = [
  { week: "Week 0", title: "Discovery call", body: "60 minutes. We figure out if we're the right team. If we're not, we tell you who is." },
  { week: "Week 1", title: "Scoping sprint", body: "A flat-fee, two-week scoping engagement. You walk away owning a spec, regardless of whether we keep working together." },
  { week: "Week 2+", title: "Build cadence", body: "Two-week iterations. Friday demo. Monday plan. A shared Linear, a shared Slack, no status PDFs." },
  { week: "Ongoing", title: "Live ops", body: "On-call rotation, cost reviews, quarterly architecture audits. We don't disappear after launch." }
];

const WORK = [
  { client: "Halberd Capital",  sector: "Fintech",     year: "2025", note: "Real-time portfolio engine. p99 < 12ms across 4 regions.",       metric: "p99 12ms" },
  { client: "Routesmith",       sector: "Logistics",   year: "2024", note: "Dispatcher console used by 1,800 drivers. Replaced a SaaS that cost 6× more.", metric: "1,800 dau" },
  { client: "Lemma",            sector: "Devtools",    year: "2024", note: "CLI + dashboard for ML eval pipelines. Open-sourced under MIT.",  metric: "11k ★" },
  { client: "Foundry Linen",    sector: "Commerce",    year: "2023", note: "Headless storefront, custom checkout, 3rd-party logistics glue.", metric: "+38% AOV" },
  { client: "Northbeam Health", sector: "Health",      year: "2023", note: "HIPAA-compliant intake flow. Audited, signed off, boring on purpose.", metric: "0 incidents" },
  { client: "Quill",            sector: "AI",          year: "2025", note: "Document agent. Eval harness, retrieval, the whole 80%.",         metric: "94% pass" }
];

const TEAM = [
  { initials: "MK", name: "Marta K.",   role: "Founder · Staff eng",  yrs: 14, focus: "Distributed systems" },
  { initials: "OR", name: "Oleh R.",    role: "Staff engineer",       yrs: 12, focus: "Rust · low-level" },
  { initials: "IS", name: "Iryna S.",   role: "Senior engineer",      yrs: 9,  focus: "React · type theory" },
  { initials: "DK", name: "Dmytro K.",  role: "Senior engineer",      yrs: 11, focus: "Infra · SRE" },
  { initials: "NB", name: "Nazar B.",   role: "Senior engineer",      yrs: 8,  focus: "iOS · Swift" },
  { initials: "AT", name: "Anna T.",    role: "Senior engineer",      yrs: 7,  focus: "Applied ML" },
  { initials: "VP", name: "Vlad P.",    role: "Senior engineer",      yrs: 10, focus: "Backend · Go" },
  { initials: "KH", name: "Kateryna H.", role: "Principal designer",  yrs: 9,  focus: "Product · type" }
];

// ------------------------------------------------------------
// Animated grid behind hero — "sharpening" effect
// ------------------------------------------------------------
function SharpenGrid({ accent, enabled }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    const cvs = ref.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    let raf, t0 = performance.now();
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cvs.width = cvs.offsetWidth * dpr;
      cvs.height = cvs.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      const t = (performance.now() - t0) / 1000;
      const w = cvs.offsetWidth, h = cvs.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const cell = 24;
      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / cell);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cell, y = j * cell;
          // distance from animated focal point
          const fx = w * (0.5 + 0.25 * Math.sin(t * 0.3));
          const fy = h * (0.5 + 0.25 * Math.cos(t * 0.22));
          const d = Math.hypot(x - fx, y - fy);
          const sharpness = Math.max(0, 1 - d / 360);
          if (sharpness < 0.02) {
            ctx.fillStyle = "rgba(255,255,255,0.025)";
            ctx.fillRect(x + cell / 2 - 0.5, y + cell / 2 - 0.5, 1, 1);
          } else {
            const alpha = sharpness * 0.9;
            const len = sharpness * (cell - 6);
            ctx.strokeStyle = sharpness > 0.7
              ? `${accent}${Math.floor(alpha * 255).toString(16).padStart(2,"0")}`
              : `rgba(255,255,255,${alpha * 0.45})`;
            ctx.lineWidth = sharpness > 0.85 ? 1.2 : 0.6;
            ctx.beginPath();
            // a cross / plus that "sharpens" near the focal point
            ctx.moveTo(x + cell / 2 - len / 2, y + cell / 2);
            ctx.lineTo(x + cell / 2 + len / 2, y + cell / 2);
            ctx.moveTo(x + cell / 2, y + cell / 2 - len / 2);
            ctx.lineTo(x + cell / 2, y + cell / 2 + len / 2);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [accent, enabled]);
  return <canvas ref={ref} className="sharpen-canvas" aria-hidden="true" />;
}

// ------------------------------------------------------------
// Marquee of stack tokens
// ------------------------------------------------------------
function StackMarquee() {
  const items = ["TypeScript","Rust","Go","Swift","Postgres","Kotlin","React","Next.js","tRPC","Tailwind","Prisma","Redis","Kafka","ClickHouse","Terraform","Kubernetes","AWS","GCP","Cloudflare","OpenTelemetry","Sentry","Linear","Figma","Vitest","Playwright","Zod","Drizzle","tRPC","WebGPU","WASM"];
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-bullet">◇</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Live "compile" terminal
// ------------------------------------------------------------
function CompileTerminal() {
  const lines = [
    { t: "$", c: "bitsharp init halberd-portfolio --stack=rust+ts" },
    { t: "›", c: "resolving 184 deps…", ok: true },
    { t: "›", c: "schema · 38 tables · 0 conflicts", ok: true },
    { t: "›", c: "running 2,148 tests · 100% pass", ok: true },
    { t: "›", c: "p99 latency · 12ms · within budget", ok: true },
    { t: "✓", c: "deploy → eu-central-1, us-east-1, ap-south-1", ok: true },
    { t: "$", c: "_", cursor: true }
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setShown(s => (s + 1) % (lines.length + 4)), 700);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="tdot" /><span className="tdot" /><span className="tdot" />
        <span className="terminal-title">~/bitsharp/ops · zsh</span>
      </div>
      <div className="terminal-body">
        {lines.slice(0, Math.min(shown, lines.length)).map((ln, i) => (
          <div key={i} className={`tline ${ln.ok ? "ok" : ""}`}>
            <span className="tprompt">{ln.t}</span>
            <span className="tcmd">{ln.c}</span>
            {ln.cursor && <span className="tcursor">█</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Wordmark — drawn typographically, no SVG art
// ------------------------------------------------------------
function Wordmark({ small }) {
  return (
    <span className={`wordmark ${small ? "sm" : ""}`}>
      <span className="wm-bit">bit</span><span className="wm-slash">/</span><span className="wm-sharp">sharp</span>
    </span>
  );
}

// ------------------------------------------------------------
// Sections
// ------------------------------------------------------------
function Nav({ copy, onContact }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-logo"><Wordmark small /></a>
        <ul className="nav-links">
          {copy.nav.map((n, i) => (
            <li key={i}><a href={`#${["work","services","process","team","contact"][i]}`}>{n}</a></li>
          ))}
        </ul>
        <button className="btn btn-primary nav-cta" onClick={onContact}>
          {copy.cta} <span className="btn-arrow">→</span>
        </button>
      </div>
    </nav>
  );
}

function Hero({ copy, accent, showGrid }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  return (
    <section className="hero" id="top">
      <SharpenGrid accent={accent} enabled={showGrid} />
      <div className="hero-frame">
        <div className="hero-eyebrow">
          <span className="dot dot-live" /> {copy.eyebrow}
          <span className="hero-clock">LVIV · {hh}</span>
        </div>
        <h1 className="hero-title">
          <span className="ht-line">{copy.heroLine1}</span>
          <span className="ht-line ht-display">{copy.heroLine2}<span className="ht-period">.</span></span>
          <span className="ht-line">{copy.heroLine3}</span>
        </h1>
        <div className="hero-grid">
          <p className="hero-sub">{copy.heroSub}</p>
          <div className="hero-meta">
            <div className="meta-row"><span className="meta-k">index</span><span className="meta-v">001 / 042</span></div>
            <div className="meta-row"><span className="meta-k">latency</span><span className="meta-v">p99 · 12ms</span></div>
            <div className="meta-row"><span className="meta-k">availability</span><span className="meta-v">99.98 %</span></div>
            <div className="meta-row"><span className="meta-k">on-call</span><span className="meta-v"><span className="dot dot-live" /> live</span></div>
          </div>
        </div>
        <div className="hero-foot">
          <a href="#services" className="btn btn-primary">See what we do <span className="btn-arrow">↓</span></a>
          <a href="#work" className="btn btn-ghost">Selected work</a>
          <span className="hero-tag">/* sharpened since 2019 */</span>
        </div>
      </div>
      <StackMarquee />
    </section>
  );
}

function Stats({ copy }) {
  const stats = [
    { n: "07",  l: copy.statLabel1, suf: "yrs" },
    { n: "42",  l: copy.statLabel2 },
    { n: "08",  l: copy.statLabel3 },
    { n: "3.4", l: copy.statLabel4, suf: "yrs" }
  ];
  return (
    <section className="stats">
      <div className="stats-inner">
        {stats.map((s, i) => (
          <div key={i} className="stat">
            <div className="stat-num">{s.n}{s.suf && <span className="stat-suf">{s.suf}</span>}</div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services({ copy }) {
  const [active, setActive] = useState(0);
  return (
    <section className="services" id="services">
      <header className="sec-head">
        <div className="sec-tag">02 · Services</div>
        <h2 className="sec-title">{copy.servicesTitle}</h2>
        <p className="sec-sub">{copy.servicesSub}</p>
      </header>
      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <article
            key={s.id}
            className={`service ${active === i ? "is-active" : ""}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            tabIndex={0}
          >
            <header className="service-head">
              <span className="service-id">/{s.id}</span>
              <span className="service-code">{s.code}()</span>
            </header>
            <h3 className="service-title">{s.title}</h3>
            <p className="service-body">{s.body}</p>
            <ul className="service-tags">
              {s.tags.map(t => <li key={t}>{t}</li>)}
            </ul>
            <div className="service-rule" />
          </article>
        ))}
      </div>
    </section>
  );
}

function Process({ copy }) {
  return (
    <section className="process" id="process">
      <header className="sec-head">
        <div className="sec-tag">03 · Process</div>
        <h2 className="sec-title">{copy.processTitle}</h2>
        <p className="sec-sub">{copy.processSub}</p>
      </header>
      <ol className="process-list">
        {PROCESS.map((p, i) => (
          <li key={i} className="process-step">
            <div className="step-week">{p.week}</div>
            <div className="step-bar">
              <span className="step-dot" />
              {i < PROCESS.length - 1 && <span className="step-line" />}
            </div>
            <div className="step-body">
              <h3 className="step-title">{p.title}</h3>
              <p className="step-text">{p.body}</p>
            </div>
            <div className="step-num">0{i + 1}</div>
          </li>
        ))}
      </ol>
      <CompileTerminal />
    </section>
  );
}

function Work({ copy }) {
  const [hover, setHover] = useState(null);
  return (
    <section className="work" id="work">
      <header className="sec-head">
        <div className="sec-tag">01 · Work</div>
        <h2 className="sec-title">{copy.workTitle}</h2>
        <p className="sec-sub">{copy.workSub}</p>
      </header>
      <div className="work-table">
        <div className="work-row work-head">
          <span>Client</span>
          <span>Sector</span>
          <span>Year</span>
          <span>Outcome</span>
          <span className="ta-right">Metric</span>
        </div>
        {WORK.map((w, i) => (
          <a
            key={i}
            className={`work-row ${hover === i ? "is-hover" : ""}`}
            href="#"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onClick={e => e.preventDefault()}
          >
            <span className="wr-client">{w.client}</span>
            <span className="wr-sector">{w.sector}</span>
            <span className="wr-year">{w.year}</span>
            <span className="wr-note">{w.note}</span>
            <span className="wr-metric">{w.metric} <span className="wr-arrow">→</span></span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Team({ copy }) {
  return (
    <section className="team" id="team">
      <header className="sec-head">
        <div className="sec-tag">04 · Team</div>
        <h2 className="sec-title">{copy.teamTitle}</h2>
        <p className="sec-sub">{copy.teamSub}</p>
      </header>
      <div className="team-grid">
        {TEAM.map((m, i) => (
          <div key={i} className="member">
            <div className="member-avatar">
              <span className="member-initials">{m.initials}</span>
              <span className="member-stripes" aria-hidden="true" />
            </div>
            <div className="member-meta">
              <div className="member-name">{m.name}</div>
              <div className="member-role">{m.role}</div>
              <div className="member-focus"><span>{m.focus}</span><span className="member-yrs">{m.yrs}y</span></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact({ copy }) {
  const [form, setForm] = useState({ name: "", email: "", brief: "", budget: "50–150k" });
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.brief) return;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };
  return (
    <section className="contact" id="contact">
      <header className="sec-head">
        <div className="sec-tag">05 · Contact</div>
        <h2 className="sec-title">{copy.contactTitle}</h2>
        <p className="sec-sub">{copy.contactSub}</p>
      </header>
      <div className="contact-grid">
        <form className="contact-form" onSubmit={submit}>
          <div className="field">
            <label>Your name</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Olena Hrytsenko" />
          </div>
          <div className="field">
            <label>Work email</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="olena@company.io" />
          </div>
          <div className="field">
            <label>Budget range</label>
            <div className="chips">
              {["< 50k","50–150k","150–500k","500k +"].map(b => (
                <button type="button" key={b} className={`chip ${form.budget === b ? "is-on" : ""}`} onClick={() => setForm({...form, budget: b})}>{b}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>What are you building?</label>
            <textarea rows={4} value={form.brief} onChange={e => setForm({...form, brief: e.target.value})} placeholder="A short paragraph beats a 40-page RFP. Tell us the problem, not the spec." />
          </div>
          <button className="btn btn-primary btn-lg" type="submit">
            {sent ? "Sent. We'll reply within 24h ✓" : "Send brief →"}
          </button>
        </form>
        <aside className="contact-aside">
          <div className="ca-block">
            <div className="ca-k">Direct</div>
            <a className="ca-v" href="mailto:hello@bitsharp.dev">hello@bitsharp.dev</a>
          </div>
          <div className="ca-block">
            <div className="ca-k">Studio</div>
            <div className="ca-v">7 Rynok Sq · Lviv 79008<br/>Ukraine</div>
          </div>
          <div className="ca-block">
            <div className="ca-k">Hours</div>
            <div className="ca-v">Mon – Fri · 09:00 – 19:00 EET<br/>Async always</div>
          </div>
          <div className="ca-block">
            <div className="ca-k">Open roles</div>
            <div className="ca-v">Senior platform eng · Sr applied AI</div>
          </div>
          <div className="ca-block ca-block-quiet">
            <div className="ca-k">/* note */</div>
            <div className="ca-v ca-quiet">We don't take more than three new engagements per quarter. If we say yes, you have the team.</div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Footer({ copy }) {
  return (
    <footer className="footer">
      <div className="footer-row">
        <Wordmark />
      </div>
      <div className="footer-row footer-meta">
        <span>{copy.footerNote}</span>
        <span>© 2019–2026</span>
        <span>v 4.2.1 · build #2026.05.01</span>
      </div>
    </footer>
  );
}

// ------------------------------------------------------------
// App
// ------------------------------------------------------------
function App() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const copy = COPY[tweaks.language] || COPY.en;

  // Apply accent CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", tweaks.accent);
  }, [tweaks.accent]);

  const onContact = () => {
    document.getElementById("contact")?.scrollTo?.({ behavior: "smooth" });
    const el = document.getElementById("contact");
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: "smooth" });
  };

  return (
    <div className="app">
      <Nav copy={copy} onContact={onContact} />
      <Hero copy={copy} accent={tweaks.accent} showGrid={tweaks.showGrid} />
      <Stats copy={copy} />
      <Work copy={copy} />
      <Services copy={copy} />
      <Process copy={copy} />
      <Team copy={copy} />
      <Contact copy={copy} />
      <Footer copy={copy} />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Accent">
          <window.TweakColor label="Accent color" value={tweaks.accent} onChange={v => setTweak("accent", v)} />
        </window.TweakSection>
        <window.TweakSection title="Hero">
          <window.TweakToggle label="Animated grid" value={tweaks.showGrid} onChange={v => setTweak("showGrid", v)} />
        </window.TweakSection>
        <window.TweakSection title="Language">
          <window.TweakRadio
            label="Copy"
            value={tweaks.language}
            onChange={v => setTweak("language", v)}
            options={[{value:"en", label:"EN"},{value:"uk", label:"UK"}]}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

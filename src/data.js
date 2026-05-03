export const COPY = {
  en: {
    nav: ["Work", "Services", "Process", "Team", "Contact"],
    cta: "Start a project",
    eyebrow: "Independent software studio · est. 2025 · Kharkiv / remote",
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
    footerNote: "bitsharp ltd · made in Kharkiv, Ukraine"
  },
  uk: {
    nav: ["Роботи", "Послуги", "Процес", "Команда", "Контакти"],
    cta: "Розпочати проєкт",
    eyebrow: "Незалежна студія розробки · з 2025 · Харків / віддалено",
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
    footerNote: "bitsharp ltd · зроблено у Харкові, Україна"
  }
}

export const SERVICES = [
  { id: "01", code: "build", title: "Product engineering", body: "Greenfield web and mobile products. TypeScript, Rust, Swift. We own the stack from the first commit to live ops.", tags: ["React", "Next", "Rust", "Postgres"] },
  { id: "02", code: "scale", title: "Platform & infra", body: "Latency budgets, cost ceilings, observability that actually pages the right person. AWS, GCP, bare-metal where it pays off.", tags: ["k8s", "Terraform", "OTel"] },
  { id: "03", code: "ai",    title: "Applied AI", body: "Retrieval, evals, agent loops. We build the boring 80% around the model so the demo survives contact with users.", tags: ["LLM", "RAG", "Evals"] },
  { id: "04", code: "audit", title: "Audits & rescue", body: "Drop us into a stuck codebase. Two weeks later you get a written assessment, a triaged backlog and a path forward.", tags: ["Review", "Refactor"] }
]

export const PROCESS = [
  { week: "Week 0", title: "Discovery call", body: "60 minutes. We figure out if we're the right team. If we're not, we tell you who is." },
  { week: "Week 1", title: "Scoping sprint", body: "A flat-fee, two-week scoping engagement. You walk away owning a spec, regardless of whether we keep working together." },
  { week: "Week 2+", title: "Build cadence", body: "Two-week iterations. Friday demo. Monday plan. A shared Linear, a shared Slack, no status PDFs." },
  { week: "Ongoing", title: "Live ops", body: "On-call rotation, cost reviews, quarterly architecture audits. We don't disappear after launch." }
]

export const WORK = [
  { client: "Halberd Capital",  sector: "Fintech",     year: "2025", note: "Real-time portfolio engine. p99 < 12ms across 4 regions.",       metric: "p99 12ms" },
  { client: "Routesmith",       sector: "Logistics",   year: "2024", note: "Dispatcher console used by 1,800 drivers. Replaced a SaaS that cost 6× more.", metric: "1,800 dau" },
  { client: "Lemma",            sector: "Devtools",    year: "2024", note: "CLI + dashboard for ML eval pipelines. Open-sourced under MIT.",  metric: "11k ★" },
  { client: "Foundry Linen",    sector: "Commerce",    year: "2023", note: "Headless storefront, custom checkout, 3rd-party logistics glue.", metric: "+38% AOV" },
  { client: "Northbeam Health", sector: "Health",      year: "2023", note: "HIPAA-compliant intake flow. Audited, signed off, boring on purpose.", metric: "0 incidents" },
  { client: "Quill",            sector: "AI",          year: "2025", note: "Document agent. Eval harness, retrieval, the whole 80%.",         metric: "94% pass" }
]

export const TEAM = [
  { initials: "MK", name: "Marta K.",    role: "Founder · Staff eng",  yrs: 14, focus: "Distributed systems" },
  { initials: "OR", name: "Oleh R.",     role: "Staff engineer",       yrs: 12, focus: "Rust · low-level" },
  { initials: "IS", name: "Iryna S.",    role: "Senior engineer",      yrs: 9,  focus: "React · type theory" },
  { initials: "DK", name: "Dmytro K.",   role: "Senior engineer",      yrs: 11, focus: "Infra · SRE" },
  { initials: "NB", name: "Nazar B.",    role: "Senior engineer",      yrs: 8,  focus: "iOS · Swift" },
  { initials: "AT", name: "Anna T.",     role: "Senior engineer",      yrs: 7,  focus: "Applied ML" },
  { initials: "VP", name: "Vlad P.",     role: "Senior engineer",      yrs: 10, focus: "Backend · Go" },
  { initials: "KH", name: "Kateryna H.", role: "Principal designer",   yrs: 9,  focus: "Product · type" }
]

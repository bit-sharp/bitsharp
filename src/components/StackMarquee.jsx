const ITEMS = ["TypeScript","Rust","Go","Swift","Postgres","Kotlin","React","Next.js","tRPC","Tailwind","Prisma","Redis","Kafka","ClickHouse","Terraform","Kubernetes","AWS","GCP","Cloudflare","OpenTelemetry","Sentry","Linear","Figma","Vitest","Playwright","Zod","Drizzle","tRPC","WebGPU","WASM"]

export default function StackMarquee() {
  const row = [...ITEMS, ...ITEMS]
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
  )
}

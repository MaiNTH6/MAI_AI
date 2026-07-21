import type { PricingPlan } from "@/lib/types";

export function PricingTable({ plans }: { plans: PricingPlan[] }) {
  return (
    <div className="not-prose grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-8">
      {plans.map((p) => (
        <div
          key={p.name}
          className={`relative rounded-2xl border-2 p-6 ${
            p.recommended
              ? "border-brand-600 bg-brand-500/10 shadow-lg shadow-brand-200/40"
              : "border-[color:var(--line)] bg-white/[0.04]"
          }`}
        >
          {p.recommended && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
              Khuyên mua
            </div>
          )}
          <div className="font-bold text-lg text-[color:var(--ink)]">{p.name}</div>
          <div className="mt-2 text-3xl font-extrabold text-brand-300">
            {p.price}
          </div>
          <div className="mt-2 text-sm text-[color:var(--muted)]">{p.forWho}</div>
          <ul className="mt-4 space-y-2 text-sm">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span className="text-[color:var(--muted)]">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

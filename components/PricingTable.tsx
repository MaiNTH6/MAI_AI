import type { PricingPlan } from "@/lib/types";

export function PricingTable({ plans }: { plans: PricingPlan[] }) {
  return (
    <div className="not-prose grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-8">
      {plans.map((p) => (
        <div
          key={p.name}
          className={`relative rounded-2xl border-2 p-6 ${
            p.recommended
              ? "border-brand-600 bg-brand-50/40 shadow-lg shadow-brand-200/40"
              : "border-slate-200 bg-slate-50/60"
          }`}
        >
          {p.recommended && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
              Khuyên mua
            </div>
          )}
          <div className="font-bold text-lg text-slate-900">{p.name}</div>
          <div className="mt-2 text-3xl font-extrabold text-brand-700">
            {p.price}
          </div>
          <div className="mt-2 text-sm text-slate-600">{p.forWho}</div>
          <ul className="mt-4 space-y-2 text-sm">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span className="text-slate-700">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

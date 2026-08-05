export interface ApiChecklistCase {
  id: string;
  content: string;
  expected: string;
}

export interface ApiChecklistGroup {
  group: string;
  cases: ApiChecklistCase[];
}

/** Bảng checklist test API, nhóm theo kịch bản (xem khung 7 nhóm ở Mục 2.1). */
export function ApiChecklistTable({ groups }: { groups: ApiChecklistGroup[] }) {
  return (
    <div className="mt-4 space-y-6">
      {groups.map((g) => (
        <div key={g.group}>
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-300">
            {g.group}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed text-sm border-collapse">
              <thead>
                <tr className="bg-[color:var(--bg3)]">
                  {[
                    ["Mã TC", "w-[14%]"],
                    ["Nội dung", "w-[41%]"],
                    ["Kỳ vọng", "w-[45%]"],
                  ].map(([h, w]) => (
                    <th key={h} className={`${w} border border-[color:var(--line2)] px-3 py-2 text-left font-semibold`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {g.cases.map((c) => (
                  <tr key={c.id} className="even:bg-white/[0.04]">
                    <td className="w-[14%] border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] break-words">
                      {c.id}
                    </td>
                    <td className="w-[41%] border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)] break-words">
                      {c.content}
                    </td>
                    <td className="w-[45%] border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)] break-words">
                      {c.expected}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

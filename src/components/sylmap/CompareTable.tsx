import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Panel } from "@/components/ui/Panel";

export interface CompareRow {
  label: ReactNode;
  values: ReactNode[];
  /** Highlights rows where the compared items differ */
  differs?: boolean;
}

export interface CompareTableProps {
  /** Column headers for the compared items, e.g. ["VTU CSE", "KTU CSE"] */
  columns: ReactNode[];
  rows: CompareRow[];
  caption?: ReactNode;
  className?: string;
}

/** Side-by-side curriculum comparison on a result panel. Scrolls horizontally on small screens. */
export function CompareTable({ columns, rows, caption, className }: CompareTableProps) {
  return (
    <Panel variant="result" padded={false} className={cn("overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-left border-collapse">
          {caption && <caption className="text-left px-4 sm:px-5 pt-4 text-sm font-bold text-fg">{caption}</caption>}
          <thead>
            <tr className="border-b border-line/10">
              <th scope="col" className="px-4 sm:px-5 py-3 text-micro uppercase tracking-wider font-bold text-fg-faint">
                <span className="sr-only">Attribute</span>
              </th>
              {columns.map((col, i) => (
                <th key={i} scope="col" className="px-4 sm:px-5 py-3 text-xs font-bold text-accent-text">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className={cn("border-b border-line/10 last:border-0", row.differs && "bg-accent-fill/5")}>
                <th scope="row" className="px-4 sm:px-5 py-2.5 text-xs font-semibold text-fg-secondary align-top">
                  {row.label}
                </th>
                {row.values.map((value, c) => (
                  <td key={c} className="px-4 sm:px-5 py-2.5 text-xs text-fg-body align-top">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  hint?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, hint, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-cream-300 bg-cream-50/60 px-6 py-14 text-center dark:border-ink-700 dark:bg-ink-800/40">
      {icon && <div className="text-clay-500 dark:text-clay-300">{icon}</div>}
      <h3 className="font-display text-lg font-medium text-ink-900 dark:text-cream-100">{title}</h3>
      {hint && <p className="max-w-sm text-sm text-ink-700/70 dark:text-cream-200/60">{hint}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

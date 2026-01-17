export default function RiskBadge({ level }: { level: 'low' | 'medium' | 'high' }) {
  const colors: Record<string, string> = {
    low: 'bg-emerald-600',
    medium: 'bg-amber-500',
    high: 'bg-red-600'
  };
  return <span className={`px-2 py-1 rounded text-xs text-white ${colors[level]}`}>{level}</span>;
}

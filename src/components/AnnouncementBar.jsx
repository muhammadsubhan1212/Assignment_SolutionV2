import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function AnnouncementBar() {
  return (
    <div className="bg-brass-400 px-4 py-2 text-center">
      <p className="flex items-center justify-center gap-2 text-[12px] font-semibold leading-snug text-ink-950 sm:text-[13px]">
        <Sparkles size={14} className="hidden shrink-0 sm:block" />
        <span>New students save 15% on their first project</span>
        <Link to="/order-now" className="shrink-0 underline decoration-ink-950/40 underline-offset-2 hover:decoration-ink-950">
          Claim offer →
        </Link>
      </p>
    </div>
  )
}

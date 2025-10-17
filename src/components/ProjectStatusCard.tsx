interface Segment {
  color: string
  percent: number
  label: string
}

interface ProjectStatusCardProps {
  count: number
  badgeText?: string
  segments?: Segment[]
}

export default function ProjectStatusCard({
  count,
  badgeText = '+1 New',
  segments = [
    { color: '#22D3EE', percent: 50, label: 'In Progress' },
    { color: '#8B5CF6', percent: 30, label: 'Completed' },
    { color: '#EAB308', percent: 20, label: 'Yet to Start' },
  ],
}: ProjectStatusCardProps) {
  const size = 120
  const stroke = 8
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius

  let accumulated = 0

  return (
    <div className="card card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="h3 text-white">Project Status</h3>
        <span className="text-[#10B981] text-xs border border-[#2A2A2A] rounded-[8px] px-2 py-1 bg-[#1A1A1A]">{badgeText}</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size}>
            <g transform={`translate(${size / 2}, ${size / 2})`}>
              <circle r={radius} fill="none" stroke="#2A2A2A" strokeWidth={stroke} />
              {segments.map((seg, idx) => {
                const segLength = (seg.percent / 100) * circumference
                const dashArray = `${segLength} ${circumference - segLength}`
                const dashOffset = circumference * (accumulated / 100)
                accumulated += seg.percent
                return (
                  <circle
                    key={idx}
                    r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={stroke}
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    transform="rotate(-90)"
                    strokeLinecap="round"
                  />
                )
              })}
            </g>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="display-number text-white leading-none">{count}</div>
              <div className="small text-[#A0A0A0] mt-[4px]">Projects</div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <ul className="space-y-2">
            {segments.map((seg, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
                <span className="small text-[#A0A0A0]">{seg.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'

interface ChartProps {
  title: string
  data: { label: string; value: number }[]
  type?: 'leads' | 'sales'
}

export default function Chart({ title, data, type = 'leads' }: ChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const computedMax = Math.max(...data.map(item => item.value))
  const maxValue = Math.max(1, computedMax)

  const getBarColor = (index: number, isHovered: boolean) => {
    const baseColors = {
      leads: 'from-primary-cyan to-secondary-purple',
      sales: 'from-success-green to-primary-cyan'
    }
    
    if (isHovered) {
      return `bg-gradient-to-t ${baseColors[type]} shadow-lg shadow-${type === 'leads' ? 'primary-cyan' : 'success-green'}/30`
    }
    
    return `bg-gradient-to-t ${baseColors[type]} opacity-80 hover:opacity-100`
  }

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  return (
    <div className="premium-card p-8 border border-white/8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
        <div className="flex items-center gap-3">
          <div className="text-sm text-text-tertiary">
            Máx: <span className="font-mono font-semibold text-text-secondary">{formatValue(computedMax)}</span>
          </div>
          <div className={`w-3 h-3 rounded-full ${type === 'leads' ? 'bg-primary-cyan' : 'bg-success-green'}`} />
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full h-px bg-border-subtle opacity-30" />
          ))}
        </div>

        {/* Chart */}
        <div className="relative h-[200px] w-full flex items-end justify-between gap-2 px-2">
          {data.map((item, index) => {
            const height = Math.max(8, Math.round((item.value / maxValue) * 180))
            const isHovered = hoveredIndex === index
            
            return (
              <div 
                key={index} 
                className="flex flex-col items-center flex-1 group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Value Tooltip */}
                <div className={`
                  absolute -top-12 left-1/2 transform -translate-x-1/2 
                  px-3 py-1 rounded-lg bg-surface-elevated border border-white/10
                  text-xs font-mono font-semibold text-text-primary
                  transition-all duration-200 pointer-events-none
                  ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                `}>
                  {formatValue(item.value)}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-surface-elevated" />
                </div>

                {/* Bar */}
                <div className="w-full max-w-[32px] bg-surface-elevated rounded-t-lg overflow-hidden flex items-end relative">
                  <div
                    className={`
                      w-full rounded-t-lg transition-all duration-500 ease-out
                      ${getBarColor(index, isHovered)}
                      ${isHovered ? 'scale-105' : 'scale-100'}
                    `}
                    style={{ 
                      height: `${height}px`,
                      animationDelay: `${index * 100}ms`
                    }}
                  />
                  
                  {/* Glow effect on hover */}
                  {isHovered && (
                    <div className={`
                      absolute inset-0 rounded-t-lg
                      ${type === 'leads' ? 'shadow-primary-cyan/50' : 'shadow-success-green/50'}
                      shadow-lg
                    `} />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Labels */}
        <div className="mt-4 flex justify-between items-center px-2">
          {data.map((item, index) => (
            <div 
              key={index} 
              className={`
                flex-1 text-center text-xs font-medium transition-colors duration-200
                ${hoveredIndex === index ? 'text-text-primary' : 'text-text-tertiary'}
              `}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Chart Stats */}
      <div className="mt-6 pt-4 border-t border-border-subtle">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-text-tertiary uppercase tracking-wider mb-1">Total</div>
            <div className="text-lg font-mono font-semibold text-text-primary">
              {formatValue(data.reduce((sum, item) => sum + item.value, 0))}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-tertiary uppercase tracking-wider mb-1">Média</div>
            <div className="text-lg font-mono font-semibold text-text-secondary">
              {formatValue(Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length))}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-tertiary uppercase tracking-wider mb-1">Pico</div>
            <div className="text-lg font-mono font-semibold text-primary-cyan">
              {formatValue(computedMax)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
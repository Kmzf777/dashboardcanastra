'use client'

import React, { useState } from 'react'

type Item = { label: string; value: number; color?: string }

export default function SimpleBarChart({ items, max }: { items: Item[]; max?: number }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const maxValue = typeof max === 'number' ? max : Math.max(...items.map(i => i.value), 1)
  
  const formatValue = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  const getDefaultColor = (index: number) => {
    const colors = ['#00F5FF', '#8B5CF6', '#10B981', '#F59E0B']
    return colors[index % colors.length]
  }

  return (
    <div className="space-y-4 min-w-0 max-w-full overflow-hidden">
      {items.map((item, idx) => {
        const pct = Math.round((item.value / maxValue) * 100)
        const isHovered = hoveredIndex === idx
        const barColor = item.color || getDefaultColor(idx)
        
        return (
          <div 
            key={idx}
            className="group cursor-pointer min-w-0"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: barColor }}
                />
                <span className={`text-sm font-medium transition-colors duration-200 ${
                  isHovered ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-mono font-semibold transition-colors duration-200 ${
                  isHovered ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {formatValue(item.value)}
                </span>
                <span className="text-xs text-text-tertiary">
                  {pct}%
                </span>
              </div>
            </div>
            
            <div className="relative h-3 bg-surface-elevated border border-border-subtle rounded-full overflow-hidden">
              <div
                className={`
                  h-full rounded-full transition-all duration-500 ease-out relative
                  ${isHovered ? 'shadow-lg' : ''}
                `}
                style={{ 
                  width: `${pct}%`, 
                  backgroundColor: barColor,
                  boxShadow: isHovered ? `0 0 20px ${barColor}40` : 'none'
                }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
              
              {/* Hover glow effect */}
              {isHovered && (
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    background: `linear-gradient(90deg, transparent, ${barColor}20, transparent)`,
                  }}
                />
              )}
            </div>
          </div>
        )
      })}
      
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border-subtle">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xs text-text-tertiary uppercase tracking-wider mb-1">Total</div>
            <div className="text-lg font-mono font-semibold text-text-primary">
              {formatValue(items.reduce((sum, item) => sum + item.value, 0))}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-tertiary uppercase tracking-wider mb-1">Maior</div>
            <div className="text-lg font-mono font-semibold text-primary-cyan">
              {formatValue(maxValue)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
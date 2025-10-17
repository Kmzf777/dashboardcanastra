'use client'

import { useState, useEffect } from 'react'
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  CursorArrowRaysIcon, 
  PaperAirplaneIcon, 
  BanknotesIcon, 
  SparklesIcon, 
  TrophyIcon, 
  StarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon
} from '@heroicons/react/24/outline'

interface DashboardCardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: string
  period?: string
}

export default function DashboardCard({ title, value, change, changeType, icon, period }: DashboardCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Extract numeric value for animation
  const numericValue = parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      const duration = 2000 // 2 seconds
      const steps = 60
      const increment = numericValue / steps
      let current = 0

      const interval = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          current = numericValue
          clearInterval(interval)
        }
        setAnimatedValue(current)
      }, duration / steps)

      return () => clearInterval(interval)
    }, 300)

    return () => clearTimeout(timer)
  }, [numericValue])

  // Format animated value back to original format
  const formatAnimatedValue = (val: number) => {
    if (value.includes('R$')) {
      return `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
    if (value.includes('%')) {
      return `${val.toFixed(1)}%`
    }
    return Math.round(val).toLocaleString('pt-BR')
  }

  const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    '📊': ChartBarIcon,
    '📈': ArrowTrendingUpIcon,
    '🎯': CursorArrowRaysIcon,
    '🚀': PaperAirplaneIcon,
    '💰': BanknotesIcon,
    '💎': SparklesIcon,
    '🏆': TrophyIcon,
    '👑': StarIcon,
  }

  const IconComp = iconMap[icon]

  const getTrendIcon = () => {
    switch (changeType) {
      case 'positive':
        return <ArrowUpIcon className="w-3 h-3" />
      case 'negative':
        return <ArrowDownIcon className="w-3 h-3" />
      default:
        return <MinusIcon className="w-3 h-3" />
    }
  }

  const getTrendColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-success-green bg-success-green/10 border-success-green/20'
      case 'negative':
        return 'text-danger-red bg-danger-red/10 border-danger-red/20'
      default:
        return 'text-text-tertiary bg-text-tertiary/10 border-text-tertiary/20'
    }
  }

  const getAccentColor = () => {
    switch (changeType) {
      case 'positive':
        return 'border-success-green/30 shadow-success-green/10'
      case 'negative':
        return 'border-danger-red/30 shadow-danger-red/10'
      default:
        return 'border-primary-cyan/30 shadow-primary-cyan/10'
    }
  }

  return (
    <div className={`
      premium-card 
      relative overflow-hidden min-w-0 w-full
      min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]
      group 
      hover:scale-[1.02] 
      hover:shadow-2xl 
      transition-all 
      duration-300 
      ${getAccentColor()}
      p-3 sm:p-4 lg:p-6
    `}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {IconComp && (
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-primary-cyan/10 flex items-center justify-center">
              <IconComp className="w-3 h-3 sm:w-4 sm:h-4 text-primary-cyan" />
            </div>
          )}
          {period && (
            <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
              {period}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xs sm:text-sm font-medium text-text-secondary mb-1.5 sm:mb-2 truncate">
        {title}
      </h3>

      {/* Value with gradient effect */}
      <div className="mb-2 sm:mb-3 flex-1 flex items-center min-w-0">
        <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold font-mono bg-gradient-to-r from-primary-cyan to-white bg-clip-text text-transparent leading-none truncate overflow-hidden whitespace-nowrap">
          {formatAnimatedValue(animatedValue)}
        </div>
      </div>

      {/* Trend indicator */}
      <div className="flex items-center gap-1.5 sm:gap-2 mt-auto">
        <div className={`
          inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium border
          ${getTrendColor()}
        `}>
          {getTrendIcon()}
          <span className="hidden sm:inline">{change}</span>
          <span className="sm:hidden">{change.replace('%', '')}</span>
        </div>
        <span className="text-xs text-text-tertiary hidden sm:inline">vs ontem</span>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-cyan/5 to-secondary-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
}
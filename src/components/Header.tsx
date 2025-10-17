'use client'

import { useState, useEffect } from 'react'
import { ClockIcon, ChartBarIcon, ArrowTrendingUpIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

interface HeaderProps {
  onMobileMenuToggle?: () => void
  isMobileMenuOpen?: boolean
}

export default function Header({ onMobileMenuToggle, isMobileMenuOpen = false }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setIsVisible(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <header 
      className="fixed top-0 left-0 lg:left-64 right-0 z-40 h-14 sm:h-16 glass border-b border-border-subtle transition-all duration-300"
      style={{
        backdropFilter: `blur(${Math.min(scrollY / 10 + 12, 20)}px)`,
        backgroundColor: `rgba(15, 23, 42, ${Math.min(scrollY / 100 + 0.8, 0.95)})`
      }}
    >
      {/* Subtle gradient overlay that intensifies on scroll */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-primary-cyan/5 via-transparent to-success-green/5 transition-opacity duration-300"
        style={{ opacity: Math.min(scrollY / 200, 0.3) }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between relative z-10">
        {/* Left side - Mobile menu button and metrics */}
        <div className={`
          flex items-center space-x-3 sm:space-x-6 transition-all duration-700 ease-out
          ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}
        `}>
          {/* Mobile menu button */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg bg-surface-elevated/50 backdrop-blur-sm border border-border-subtle hover:bg-surface-hover hover:border-primary-cyan/30 transition-all duration-200 group"
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-5 h-5 text-text-primary group-hover:text-primary-cyan transition-colors" />
            ) : (
              <Bars3Icon className="w-5 h-5 text-text-primary group-hover:text-primary-cyan transition-colors" />
            )}
          </button>

          {/* Desktop metrics - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            <div 
              className="flex items-center space-x-2 group cursor-pointer transition-all duration-200 hover:scale-105"
              style={{ transitionDelay: '100ms' }}
            >
              <ChartBarIcon className="w-4 h-4 text-primary-cyan group-hover:text-primary-cyan/80 transition-colors" />
              <span className="text-metadata group-hover:text-text-secondary transition-colors">Leads Hoje</span>
              <span className="text-sm font-mono font-semibold text-text-primary group-hover:text-primary-cyan transition-colors">24</span>
            </div>
            <div 
              className="flex items-center space-x-2 group cursor-pointer transition-all duration-200 hover:scale-105"
              style={{ transitionDelay: '200ms' }}
            >
              <ArrowTrendingUpIcon className="w-4 h-4 text-success-green group-hover:text-success-green/80 transition-colors" />
              <span className="text-metadata group-hover:text-text-secondary transition-colors">Conversão</span>
              <span className="text-sm font-mono font-semibold text-success-green group-hover:text-success-green/80 transition-colors">12.5%</span>
            </div>
          </div>
          
          {/* Mobile/Tablet compact metrics */}
          <div className="md:hidden lg:flex items-center space-x-3">
            <div 
              className="flex items-center space-x-1.5 group cursor-pointer transition-all duration-200 hover:scale-105"
              style={{ transitionDelay: '100ms' }}
            >
              <ChartBarIcon className="w-3.5 h-3.5 text-primary-cyan" />
              <span className="text-xs font-mono font-semibold text-text-primary">24</span>
            </div>
            <div 
              className="flex items-center space-x-1.5 group cursor-pointer transition-all duration-200 hover:scale-105"
              style={{ transitionDelay: '150ms' }}
            >
              <ArrowTrendingUpIcon className="w-3.5 h-3.5 text-success-green" />
              <span className="text-xs font-mono font-semibold text-success-green">12.5%</span>
            </div>
          </div>
        </div>

        {/* Right side - Time display and user avatar with responsive design */}
        <div className={`
          flex items-center space-x-3 sm:space-x-6 transition-all duration-700 ease-out
          ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}
        `}>
          <div 
            className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer transition-all duration-200 hover:scale-105"
            style={{ transitionDelay: '300ms' }}
          >
            <ClockIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-tertiary group-hover:text-primary-cyan transition-colors" />
            <div className="text-right">
              <div className="text-xs sm:text-sm font-mono font-semibold text-text-primary group-hover:text-primary-cyan transition-colors">
                {formatTime(currentTime)}
              </div>
              {/* Full date on desktop, simplified on mobile */}
              <div className="text-metadata group-hover:text-text-secondary transition-colors hidden sm:block">
                {formatDate(currentTime)}
              </div>
              <div className="text-metadata group-hover:text-text-secondary transition-colors sm:hidden">
                {currentTime.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
              </div>
            </div>
          </div>
          
          {/* Enhanced user avatar with responsive sizing */}
          <div 
            className="relative group cursor-pointer transition-all duration-200 hover:scale-110"
            style={{ transitionDelay: '400ms' }}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-premium flex items-center justify-center relative overflow-hidden group-hover:rotate-3 transition-transform duration-300">
              <span className="text-xs font-semibold text-white relative z-10">CI</span>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
            </div>
            
            {/* Pulse ring on hover */}
            <div className="absolute inset-0 rounded-full bg-gradient-premium opacity-0 group-hover:opacity-75 group-hover:animate-pulse-ring transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </header>
  )
}
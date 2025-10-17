'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ChartBarIcon, UserIcon, UserGroupIcon } from '@heroicons/react/24/outline'

// Ícone personalizado para Valéria (mulher)
const WomanIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    <circle cx="12" cy="6" r="2" fill="currentColor" opacity="0.3" />
  </svg>
)

// Ícone personalizado para Marcos (homem)
const ManIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    <rect x="10" y="4" width="4" height="4" rx="2" fill="currentColor" opacity="0.3" />
  </svg>
)

export default function Sidebar() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  
  const menuItems = [
    { name: 'Dashboard', icon: ChartBarIcon, href: '/', active: pathname === '/' },
    { name: 'Valéria AI', icon: WomanIcon, href: '/valeriaai', active: pathname === '/valeriaai' },
    { name: 'Marcos AI', icon: ManIcon, href: '/marcosai', active: pathname === '/marcosai' },
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <aside className="sidebar-premium min-h-screen flex flex-col py-4 sm:py-6 group relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-cyan/5 via-transparent to-success-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <nav className="w-full flex-1 relative z-10">
        <ul className="flex flex-col space-y-1 sm:space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <li 
                key={index} 
                className={`
                  w-full relative transition-all duration-500 ease-out
                  ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Enhanced active indicator with animation */}
                {item.active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 sm:h-8 w-0.5 sm:w-1 bg-primary-cyan rounded-r-full shadow-glow-cyan" />
                )}
                
                {/* Hover background effect */}
                <div 
                  className={`
                    absolute inset-0 mx-1 sm:mx-2 rounded-xl bg-gradient-to-r from-primary-cyan/10 to-success-green/10 
                    opacity-0 transition-all duration-300 scale-95
                    ${hoveredItem === index ? 'opacity-100 scale-100' : ''}
                  `}
                />
                
                <Link
                  href={item.href}
                  aria-label={item.name}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`
                    w-full flex items-center px-3 sm:px-4 py-2.5 sm:py-3 mx-1 sm:mx-2 rounded-xl transition-all duration-300 relative z-10
                    transform hover:scale-105 hover:translate-x-1
                    ${item.active 
                      ? 'bg-surface-hover text-primary-cyan shadow-glow-cyan' 
                      : 'text-text-tertiary hover:text-text-primary hover:bg-surface-hover'
                    }
                    group-hover:mx-2 sm:group-hover:mx-3
                  `}
                >
                  <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 relative">
                    <Icon className={`
                      w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 
                      ${item.active ? 'text-primary-cyan' : 'text-current'}
                      ${hoveredItem === index ? 'scale-110 rotate-3' : ''}
                    `} />
                    
                    {/* Enhanced glow effect */}
                    {(item.active || hoveredItem === index) && (
                      <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 bg-primary-cyan opacity-20 blur-sm rounded-full" />
                    )}
                    
                    {/* Shimmer effect on hover */}
                    {hoveredItem === index && (
                      <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer rounded-full" />
                    )}
                  </div>
                  
                  <span className={`
                    menu-label text-xs sm:text-sm font-medium transition-all duration-300
                    ${item.active ? 'text-primary-cyan' : 'text-current'}
                    ${hoveredItem === index ? 'translate-x-1' : ''}
                  `}>
                    {item.name}
                  </span>
                  
                  {/* Subtle arrow indicator on hover */}
                  <div className={`
                    ml-auto opacity-0 transition-all duration-300 text-primary-cyan text-xs sm:text-sm
                    ${hoveredItem === index ? 'opacity-100 translate-x-0' : 'translate-x-2'}
                  `}>
                    →
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      
      {/* Enhanced bottom branding */}
      <div className={`
        px-3 sm:px-4 py-2 sm:py-3 border-t border-border-subtle relative z-10 transition-all duration-700 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
      `} style={{ transitionDelay: '400ms' }}>
        <div className="flex items-center justify-center group-hover:justify-start transition-all duration-300 group cursor-pointer">
          <div className="relative">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-premium flex items-center justify-center relative overflow-hidden group-hover:rotate-6 transition-transform duration-300">
              <span className="text-xs font-bold text-white relative z-10">CI</span>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
            </div>
            
            {/* Pulse ring on hover */}
            <div className="absolute inset-0 rounded-lg bg-gradient-premium opacity-0 group-hover:opacity-50 group-hover:animate-pulse-ring transition-opacity duration-300" />
          </div>
          
          <div className="menu-label ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300">
            <div className="text-xs font-semibold text-text-primary group-hover:text-primary-cyan transition-colors duration-300">Canastra</div>
            <div className="text-xs text-text-tertiary group-hover:text-text-secondary transition-colors duration-300 hidden sm:block">Intelligence</div>
            <div className="text-xs text-text-tertiary group-hover:text-text-secondary transition-colors duration-300 sm:hidden">AI</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
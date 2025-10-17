'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ChartBarIcon, UserIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/outline'

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

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
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
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        sidebar-premium h-screen w-64 flex flex-col py-4 sm:py-6 group overflow-hidden z-50
        fixed top-0 left-0
        overflow-y-auto
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-cyan/5 via-transparent to-success-green/5" />
        
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-end p-4 relative z-20">
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-surface-elevated/50 backdrop-blur-sm border border-border-subtle hover:bg-surface-hover hover:border-primary-cyan/30 transition-all duration-200 group"
            aria-label="Fechar menu"
          >
            <XMarkIcon className="w-5 h-5 text-text-primary group-hover:text-primary-cyan transition-colors" />
          </button>
        </div>
        
        <nav className="w-full flex-1 relative z-10 px-2 lg:px-0">
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
                    opacity-100
                  `}
                />
                
                <Link
                  href={item.href}
                  aria-label={item.name}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`
                    w-full flex items-center px-3 sm:px-4 py-2.5 sm:py-3 mx-1 sm:mx-2 rounded-xl transition-colors duration-300 relative z-10
                    ${item.active 
                      ? 'bg-surface-hover text-primary-cyan shadow-glow-cyan' 
                      : 'text-text-tertiary hover:text-text-primary hover:bg-surface-hover'
                    }
                  `}
                  onClick={() => {
                    // Fechar menu mobile ao clicar em um item
                    if (onClose && window.innerWidth < 1024) {
                      onClose()
                    }
                  }}
                >
                  <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 relative">
                    <Icon className={`
                      w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 
                      ${item.active ? 'text-primary-cyan' : 'text-current'}
                    `} />
                    
                    {/* Enhanced glow effect */}
                    {item.active && (
                      <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 bg-primary-cyan opacity-20 blur-sm rounded-full" />
                    )}
                    
                    {/* Shimmer effect on hover */}

                  </div>
                  
                  <span className={`
                    menu-label text-xs sm:text-sm font-medium transition-colors duration-300
                    ${item.active ? 'text-primary-cyan' : 'text-current'}
                 `}>
                    {item.name}
                  </span>
                  
                  {/* Subtle arrow indicator on hover */}
                  <div className="ml-auto text-primary-cyan text-xs sm:text-sm opacity-0">→</div>
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
        <div className="flex items-center justify-center transition-all duration-300 cursor-pointer">
          <div className="relative">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-premium flex items-center justify-center relative overflow-hidden">
              <span className="text-xs font-bold text-white relative z-10">CI</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0" />
            </div>
            <div className="absolute inset-0 rounded-lg bg-gradient-premium opacity-0" />
          </div>
          <div className="menu-label ml-2 sm:ml-3">
            <div className="text-xs font-semibold text-text-primary">Canastra</div>
            <div className="text-xs text-text-tertiary hidden sm:block">Intelligence</div>
            <div className="text-xs text-text-tertiary sm:hidden">AI</div>
          </div>
        </div>
      </div>
    </aside>
    </>
  )
}
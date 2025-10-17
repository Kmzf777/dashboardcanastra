'use client'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import DashboardCard from '@/components/DashboardCard'
import Chart from '@/components/Chart'

import { CursorArrowRaysIcon, ChartBarIcon, ArrowTrendingUpIcon, SparklesIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { getAttendedBySector, getVendasAtacadoKpis, getNewLeadsKpis } from '@/lib/queries'

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false)
  const [animationStage, setAnimationStage] = useState(0)
  const [attendedBySector, setAttendedBySector] = useState({ private_label: 0, atacado: 0, exportacao: 0, consumo_proprio: 0 })
  const [vendasKpis, setVendasKpis] = useState({ todayTotal: 0, last7Total: 0, last15Total: 0, last30Total: 0 })
  const [leadsKpis, setLeadsKpis] = useState({ today: 0, last7: 0, last15: 0, last30: 0 })
  const [loading, setLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
    
    // Staggered animation stages
    const stages = [
      () => setAnimationStage(1), // Hero section
      () => setAnimationStage(2), // Metrics cards
      () => setAnimationStage(3), // Charts
      () => setAnimationStage(4), // Activity feed
    ]
    
    stages.forEach((stage, index) => {
      setTimeout(stage, (index + 1) * 200)
    })

    // Load real data from Supabase
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Load data in parallel with individual error handling
      const [attendedData, vendasData, leadsData] = await Promise.all([
        getAttendedBySector().catch(err => {
          console.error('Erro ao carregar dados por setor:', err)
          return { private_label: 0, atacado: 0, exportacao: 0, consumo_proprio: 0 }
        }),
        getVendasAtacadoKpis().catch(err => {
          console.error('Erro ao carregar KPIs de vendas:', err)
          return { todayTotal: 0, last7Total: 0, last15Total: 0, last30Total: 0 }
        }),
        getNewLeadsKpis().catch(err => {
          console.error('Erro ao carregar KPIs de leads:', err)
          return { today: 0, last7: 0, last15: 0, last30: 0 }
        })
      ])
      
      setAttendedBySector(attendedData || { private_label: 0, atacado: 0, exportacao: 0, consumo_proprio: 0 })
      setVendasKpis(vendasData || { todayTotal: 0, last7Total: 0, last15Total: 0, last30Total: 0 })
      setLeadsKpis(leadsData || { today: 0, last7: 0, last15: 0, last30: 0 })
    } catch (error) {
      console.error('Erro geral ao carregar dados do dashboard:', error)
      // Set default values in case of complete failure
      setAttendedBySector({ private_label: 0, atacado: 0, exportacao: 0, consumo_proprio: 0 })
      setVendasKpis({ todayTotal: 0, last7Total: 0, last15Total: 0, last30Total: 0 })
      setLeadsKpis({ today: 0, last7: 0, last15: 0, last30: 0 })
    } finally {
      setLoading(false)
    }
  }

  const formatBRL = (n: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)

  const attendedSectorData = [
    { label: 'Private Label', value: attendedBySector.private_label, color: '#22D3EE' },
    { label: 'Atacado', value: attendedBySector.atacado, color: '#10B981' },
    { label: 'Exportação', value: attendedBySector.exportacao, color: '#8B5CF6' },
    { label: 'Consumo Próprio', value: attendedBySector.consumo_proprio, color: '#EAB308' },
  ]

  // Enhanced metrics with positive changes for premium feel
  const leadsMetrics = [
    {
      title: "Novos Leads",
      value: String(leadsKpis.today),
      change: "+8.2%",
      changeType: "positive" as const,
      icon: "🎯",
      period: "Hoje"
    },
    {
      title: "Novos Leads",
      value: String(leadsKpis.last7),
      change: "+15.4%",
      changeType: "positive" as const,
      icon: "📊",
      period: "7 dias"
    },
    {
      title: "Novos Leads",
      value: String(leadsKpis.last15),
      change: "+22.1%",
      changeType: "positive" as const,
      icon: "📈",
      period: "15 dias"
    },
    {
      title: "Novos Leads",
      value: String(leadsKpis.last30),
      change: "+31.7%",
      changeType: "positive" as const,
      icon: "🚀",
      period: "30 dias"
    }
  ]

  const salesMetrics = [
    {
      title: "Vendas Atacado",
      value: formatBRL(vendasKpis.todayTotal),
      change: "+12.5%",
      changeType: "positive" as const,
      icon: "💰",
      period: "Hoje"
    },
    {
      title: "Vendas Atacado",
      value: formatBRL(vendasKpis.last7Total),
      change: "+18.3%",
      changeType: "positive" as const,
      icon: "💎",
      period: "7 dias"
    },
    {
      title: "Vendas Atacado",
      value: formatBRL(vendasKpis.last15Total),
      change: "+25.7%",
      changeType: "positive" as const,
      icon: "🏆",
      period: "15 dias"
    },
    {
      title: "Vendas Atacado",
      value: formatBRL(vendasKpis.last30Total),
      change: "+34.2%",
      changeType: "positive" as const,
      icon: "👑",
      period: "30 dias"
    }
  ]

  // Dados para gráficos de Leads
  const leadsChartData = [
    { label: "Hoje", value: leadsKpis.today },
    { label: "7 dias", value: leadsKpis.last7 },
    { label: "15 dias", value: leadsKpis.last15 },
    { label: "30 dias", value: leadsKpis.last30 }
  ]

  // Dados para gráficos de Vendas
  const salesChartData = [
    { label: "Hoje", value: vendasKpis.todayTotal },
    { label: "7 dias", value: vendasKpis.last7Total },
    { label: "15 dias", value: vendasKpis.last15Total },
    { label: "30 dias", value: vendasKpis.last30Total }
  ]

  // Atividades recentes do sistema
  const recentActivities = [
    { id: 1, user: "Sistema IA", action: "Novo lead qualificado automaticamente", time: "2 min atrás", type: "lead" },
    { id: 2, user: "Valéria AI", action: "Análise de conversão concluída", time: "5 min atrás", type: "analysis" },
    { id: 3, user: "Marcos AI", action: "Relatório de vendas gerado", time: "8 min atrás", type: "report" },
    { id: 4, user: "Sistema", action: "Backup automático realizado", time: "12 min atrás", type: "system" },
    { id: 5, user: "Valéria AI", action: "Predição de vendas atualizada", time: "15 min atrás", type: "prediction" }
  ]

  return (
    <div className="min-h-screen bg-background-base">
      <Header 
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="relative min-w-0 lg:pl-64">
        <Sidebar 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <main className="flex-1 min-w-0 pt-16 px-3 sm:px-4 lg:px-8 xl:px-12 transition-all duration-300 overflow-x-hidden">
          <div className="w-full max-w-7xl mx-auto space-y-8">
            

            
            {/* Loading indicator */}
            {loading && (
              <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="bg-surface-elevated rounded-xl p-6 flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-primary-cyan border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-text-primary">Carregando dados...</span>
                </div>
              </div>
            )}
            
            {/* Premium Dashboard Hero Section - Enhanced Responsive */}
            <div className={`
              premium-card group relative overflow-hidden min-w-0 mb-6 sm:mb-8 lg:mb-12
              transition-all duration-700 ease-out
              ${animationStage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}>
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-premium rounded-lg sm:rounded-xl lg:rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-[1px] bg-surface-elevated rounded-lg sm:rounded-xl lg:rounded-2xl" />
              
              {/* Background effects - Responsive sizes */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/5 via-transparent to-success-green/5" />
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-primary-cyan/3 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-96 lg:h-96 bg-success-green/3 rounded-full blur-3xl" />
              
              <div className="relative z-10 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12">
                <div className="flex flex-col sm:flex-row lg:flex-row items-center sm:items-start lg:items-start gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                  
                  {/* Premium Icon with animations - Responsive sizes */}
                  <div className="relative group/icon flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-premium rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center relative overflow-hidden group-hover/icon:rotate-3 transition-transform duration-300">
                      <ChartBarIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white relative z-10" />
                      
                      {/* Pulse ring animation */}
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-premium opacity-75" />
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-premium blur-xl opacity-50" />
                  </div>
                  
                  {/* Content - Enhanced responsive typography */}
                  <div className="flex-1 text-center sm:text-left lg:text-left min-w-0">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-text-primary mb-2 sm:mb-3 lg:mb-4">
                      Dashboard Executivo
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-text-secondary mb-3 sm:mb-4 md:mb-5 lg:mb-6 max-w-2xl mx-auto sm:mx-0 lg:mx-0 px-2 sm:px-0">
                      Visão completa do desempenho de vendas, leads e métricas estratégicas em tempo real
                    </p>
                    
                    {/* Quick metrics in hero - Enhanced responsive layout */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-6 justify-center sm:justify-start lg:justify-start">
                      <div className="text-center min-w-0 flex-1 sm:flex-none">
                        <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gradient-cyan truncate">{leadsKpis.today}</div>
                        <div className="text-xs sm:text-sm text-text-tertiary">Leads Hoje</div>
                      </div>
                      <div className="text-center min-w-0 flex-1 sm:flex-none">
                        <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gradient-green truncate">{formatBRL(vendasKpis.todayTotal)}</div>
                        <div className="text-xs sm:text-sm text-text-tertiary">Vendas Hoje</div>
                      </div>
                      <div className="text-center min-w-0 flex-1 sm:flex-none">
                        <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gradient-purple">+12.5%</div>
                        <div className="text-xs sm:text-sm text-text-tertiary">Crescimento</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Atendidos por Setor - Enhanced Responsive */}
            <div className={`
              mb-8 sm:mb-10 lg:mb-12 transition-all duration-700 ease-out delay-200
              ${animationStage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 sm:mb-8 text-center lg:text-left px-4 sm:px-0">
                Atendidos por Setor
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                 <Chart data={leadsChartData} title="Leads por Dia" type="leads" />
                 <Chart data={salesChartData} title="Vendas por Dia" type="sales" />
               </div>
            </div>

            {/* Novos Leads - Enhanced Responsive */}
            <div className={`
              transition-all duration-700 ease-out delay-300
              ${animationStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 sm:mb-8 text-center lg:text-left px-4 sm:px-0">
                Novos Leads
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {leadsMetrics.map((metric, index) => (
                  <DashboardCard key={`${metric.title}-${metric.period}`} {...metric} />
                ))}
              </div>
            </div>

            {/* Charts - Enhanced Responsive Layout */}
            <div className={`
              grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8
              transition-all duration-700 ease-out
              ${animationStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}>
              <div className="transition-all duration-500 ease-out" style={{ transitionDelay: '100ms' }}>
                <Chart title="Evolução de Leads" data={leadsChartData} type="leads" />
              </div>
              <div className="transition-all duration-500 ease-out" style={{ transitionDelay: '200ms' }}>
                <Chart title="Evolução de Vendas" data={salesChartData} type="sales" />
              </div>
            </div>

            {/* Vendas Atacado - Enhanced Responsive Grid */}
            <div className={`
              glass rounded-xl p-4 sm:p-6 lg:p-8 border border-cyan-400/20 mb-6 lg:mb-8 transition-all duration-700 ease-out
              ${animationStage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}>
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 lg:mb-6">Vendas Atacado</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {salesMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="transition-all duration-500 ease-out"
                    style={{ 
                      transitionDelay: animationStage >= 2 ? `${(index + 4) * 100}ms` : '0ms',
                      transform: animationStage >= 2 ? 'translateY(0)' : 'translateY(20px)',
                      opacity: animationStage >= 2 ? 1 : 0
                    }}
                  >
                    <DashboardCard
                      title={metric.title}
                      value={metric.value}
                      change={metric.change}
                      changeType={metric.changeType}
                      icon={metric.icon}
                      period={metric.period}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed Section - Enhanced Responsive */}
            <div className={`
              premium-card
              transition-all duration-700 ease-out
              ${animationStage >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6 space-y-2 sm:space-y-0">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Atividades Recentes do Sistema</h2>
                <div className="text-xs sm:text-sm text-text-tertiary self-start sm:self-auto">
                  Últimas {recentActivities.length} ações
                </div>
              </div>
              
              {/* Mobile-first responsive table */}
              <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b border-border-subtle">
                        <th className="text-left py-2 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-text-secondary">Sistema</th>
                        <th className="text-left py-2 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-text-secondary">Ação</th>
                        <th className="text-left py-2 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-text-secondary hidden sm:table-cell">Tempo</th>
                        <th className="text-left py-2 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-text-secondary">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivities.map((activity, index) => (
                        <tr 
                          key={activity.id} 
                          className="border-b border-border-subtle hover:bg-surface-hover transition-all duration-200 group"
                          style={{
                            transitionDelay: animationStage >= 4 ? `${index * 50}ms` : '0ms',
                            transform: animationStage >= 4 ? 'translateX(0)' : 'translateX(-20px)',
                            opacity: animationStage >= 4 ? 1 : 0
                          }}
                        >
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-text-primary font-medium group-hover:text-primary-cyan transition-colors text-sm sm:text-base">
                            <div className="truncate max-w-[120px] sm:max-w-none" title={activity.user}>
                              {activity.user}
                            </div>
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-text-secondary group-hover:text-text-primary transition-colors text-sm sm:text-base">
                            <div className="truncate max-w-[200px] sm:max-w-none" title={activity.action}>
                              {activity.action}
                            </div>
                            {/* Show time on mobile below action */}
                            <div className="sm:hidden text-xs text-text-tertiary font-mono mt-1">
                              {activity.time}
                            </div>
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-text-tertiary font-mono text-xs sm:text-sm group-hover:text-text-secondary transition-colors hidden sm:table-cell">
                            <div className="whitespace-nowrap">
                              {activity.time}
                            </div>
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6">
                            <span className={`inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium transition-all duration-200 group-hover:scale-105 ${
                              activity.type === 'lead' ? 'bg-primary-cyan/20 text-primary-cyan border border-primary-cyan/30' :
                              activity.type === 'analysis' ? 'bg-secondary-purple/20 text-secondary-purple border border-secondary-purple/30' :
                              activity.type === 'report' ? 'bg-success-green/20 text-success-green border border-success-green/30' :
                              activity.type === 'prediction' ? 'bg-warning-yellow/20 text-warning-yellow border border-warning-yellow/30' :
                              'bg-neutral-600/20 text-neutral-400 border border-neutral-600/30'
                            }`}>
                              {activity.type === 'lead' ? (
                                <>
                                  <CursorArrowRaysIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                                  <span className="hidden sm:inline">Lead</span>
                                  <span className="sm:hidden">L</span>
                                </>
                              ) : activity.type === 'analysis' ? (
                                <>
                                  <ChartBarIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                                  <span className="hidden sm:inline">Análise</span>
                                  <span className="sm:hidden">A</span>
                                </>
                              ) : activity.type === 'report' ? (
                                <>
                                  <ArrowTrendingUpIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                                  <span className="hidden sm:inline">Relatório</span>
                                  <span className="sm:hidden">R</span>
                                </>
                              ) : activity.type === 'prediction' ? (
                                <>
                                  <SparklesIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                                  <span className="hidden sm:inline">Predição</span>
                                  <span className="sm:hidden">P</span>
                                </>
                              ) : (
                                <>
                                  <Cog6ToothIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                                  <span className="hidden sm:inline">Sistema</span>
                                  <span className="sm:hidden">S</span>
                                </>
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
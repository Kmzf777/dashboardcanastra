'use client'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { BeakerIcon, BanknotesIcon, ArrowTrendingUpIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline'
import DashboardCard from '@/components/DashboardCard'
import { getVendasAtacadoKpis, getClientsByState } from '@/lib/queries'

export default function MarcosAI() {
  const [isVisible, setIsVisible] = useState(false)
  const [vendasKpis, setVendasKpis] = useState({ todayTotal: 0, last7Total: 0, last15Total: 0, last30Total: 0 })
  const [clientsByState, setClientsByState] = useState({})
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setIsVisible(true)
    loadMarcosData()
  }, [])

  const loadMarcosData = async () => {
    try {
      setLoading(true)
      
      // Load data in parallel with individual error handling
      const [vendasData, clientsData] = await Promise.all([
        getVendasAtacadoKpis().catch(err => {
          console.error('Erro ao carregar KPIs de vendas:', err)
          return { todayTotal: 0, last7Total: 0, last15Total: 0, last30Total: 0 }
        }),
        getClientsByState().catch(err => {
          console.error('Erro ao carregar clientes por estado:', err)
          return []
        })
      ])
      
      setVendasKpis(vendasData || { todayTotal: 0, last7Total: 0, last15Total: 0, last30Total: 0 })
      setClientsByState(clientsData || [])
    } catch (error) {
      console.error('Erro geral ao carregar dados do Marcos AI:', error)
      // Set default values in case of complete failure
      setVendasKpis({ todayTotal: 0, last7Total: 0, last15Total: 0, last30Total: 0 })
      setClientsByState([])
    } finally {
      setLoading(false)
    }
  }
  const formatBRL = (n: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)
  
  return (
    <div className="min-h-screen bg-background-base">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 xl:p-12">
          <div className="w-full max-w-7xl mx-auto space-y-8">
            
            {/* Premium AI Agent Hero Card */}
            <div className={`
              ai-agent-card group relative overflow-hidden
              transition-all duration-700 ease-out
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}>
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-premium rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-[1px] bg-surface-elevated rounded-2xl" />
              
              {/* Background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-purple/5 via-transparent to-primary-cyan/5" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-purple/3 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-cyan/3 rounded-full blur-3xl" />
              
              <div className="relative z-10 p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  
                  {/* Premium Icon with animations */}
                  <div className="relative group/icon">
                    <div className="w-20 h-20 bg-gradient-premium rounded-2xl flex items-center justify-center relative overflow-hidden group-hover/icon:rotate-3 transition-transform duration-300">
                      <BeakerIcon className="w-10 h-10 text-white relative z-10" />
                      
                      {/* Pulse ring animation */}
                      <div className="absolute inset-0 bg-gradient-premium rounded-2xl animate-pulse-ring opacity-0 group-hover/icon:opacity-100" />
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-secondary-purple/20 rounded-2xl blur-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-3 tracking-tight">
                      Marcos AI
                    </h1>
                    <p className="text-lg text-text-secondary mb-6">
                      Assistente Inteligente de Vendas e Estratégia
                    </p>
                    
                    {/* Quick metrics */}
                    <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                      <div className="text-center lg:text-left">
                        <div className="text-2xl font-bold text-success-green font-mono">
                          {formatBRL(vendasKpis.todayTotal)}
                        </div>
                        <div className="text-xs text-text-tertiary uppercase tracking-wider">
                          Vendas Hoje
                        </div>
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-2xl font-bold text-secondary-purple font-mono">
                          {formatBRL(vendasKpis.last7Total)}
                        </div>
                        <div className="text-xs text-text-tertiary uppercase tracking-wider">
                          Últimos 7 dias
                        </div>
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-2xl font-bold text-primary-cyan font-mono">
                          94%
                        </div>
                        <div className="text-xs text-text-tertiary uppercase tracking-wider">
                          Taxa de Fechamento
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="feature-card group/feature">
                    <div className="flex items-center justify-center w-12 h-12 bg-success-green/10 rounded-xl mb-4 group-hover/feature:bg-success-green/20 transition-colors duration-300">
                      <BanknotesIcon className="w-6 h-6 text-success-green" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Análise de Vendas</h3>
                    <p className="text-text-tertiary text-sm">Monitoramento inteligente de performance</p>
                  </div>
                  
                  <div className="feature-card group/feature">
                    <div className="flex items-center justify-center w-12 h-12 bg-secondary-purple/10 rounded-xl mb-4 group-hover/feature:bg-secondary-purple/20 transition-colors duration-300">
                      <ArrowTrendingUpIcon className="w-6 h-6 text-secondary-purple" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Estratégias de Crescimento</h3>
                    <p className="text-text-tertiary text-sm">Recomendações baseadas em IA</p>
                  </div>
                  
                  <div className="feature-card group/feature">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-cyan/10 rounded-xl mb-4 group-hover/feature:bg-primary-cyan/20 transition-colors duration-300">
                      <CursorArrowRaysIcon className="w-6 h-6 text-primary-cyan" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Otimização de ROI</h3>
                    <p className="text-text-tertiary text-sm">Maximização do retorno sobre investimento</p>
                  </div>
                </div>
              </div>
            </div>
                
                {/* KPIs de Vendas Atacado */}
                <div className="glass rounded-xl p-8 border border-cyan-400/20 mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">Vendas Atacado</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <DashboardCard title="Vendas Hoje" value={formatBRL(vendasKpis.todayTotal)} change="—" changeType="neutral" icon="💰" period="Hoje" />
                    <DashboardCard title="Vendas 7d" value={formatBRL(vendasKpis.last7Total)} change="—" changeType="neutral" icon="💎" period="7 dias" />
                    <DashboardCard title="Vendas 15d" value={formatBRL(vendasKpis.last15Total)} change="—" changeType="neutral" icon="🏆" period="15 dias" />
                    <DashboardCard title="Vendas 30d" value={formatBRL(vendasKpis.last30Total)} change="—" changeType="neutral" icon="👑" period="30 dias" />
                  </div>
                </div>


            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard title="Vendas Hoje" value={formatBRL(vendasKpis.todayTotal)} change="+18.5%" changeType="positive" icon="💰" period="Hoje" />
              <DashboardCard title="Vendas 7d" value={formatBRL(vendasKpis.last7Total)} change="+12.3%" changeType="positive" icon="💎" period="7 dias" />
              <DashboardCard title="Vendas 15d" value={formatBRL(vendasKpis.last15Total)} change="+25.7%" changeType="positive" icon="🏆" period="15 dias" />
              <DashboardCard title="Vendas 30d" value={formatBRL(vendasKpis.last30Total)} change="+31.2%" changeType="positive" icon="👑" period="30 dias" />
            </div>

            {/* Premium Data Table - Clientes por Estado */}
            <div className="premium-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">Clientes por Estado</h2>
                <div className="text-sm text-text-tertiary">
                  {Object.keys(clientsByState).length} estados ativos
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-subtle">
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                        Total Clientes
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                        Reposição
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                        Taxa Reposição
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {Object.entries(clientsByState).map(([state, data]: [string, any], idx) => {
                      const repositionRate = data.total > 0 ? ((data.reposicao / data.total) * 100).toFixed(1) : '0.0'
                      const getRateColor = (rate: number) => {
                        if (rate >= 70) return 'bg-success-green/10 text-success-green border-success-green/20'
                        if (rate >= 50) return 'bg-warning-amber/10 text-warning-amber border-warning-amber/20'
                        return 'bg-error-red/10 text-error-red border-error-red/20'
                      }
                      
                      return (
                        <tr key={idx} className="hover:bg-surface-hover transition-colors duration-200">
                          <td className="px-6 py-4 text-text-primary font-medium">
                            {state}
                          </td>
                          <td className="px-6 py-4 text-text-secondary font-mono">
                            {data.total}
                          </td>
                          <td className="px-6 py-4 text-text-secondary font-mono">
                            {data.reposicao}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRateColor(parseFloat(repositionRate))}`}>
                              {repositionRate}%
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Development Status */}
            <div className="premium-card border-secondary-purple/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-secondary-purple rounded-full" />
                <h3 className="text-lg font-semibold text-text-primary">Recursos Avançados</h3>
              </div>
              <p className="text-text-secondary mb-2">
                Análise preditiva de vendas e otimização de estratégias
              </p>
              <p className="text-sm text-text-tertiary">
                Machine learning para previsão de fechamentos, análise de ROI por canal e recomendações personalizadas
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
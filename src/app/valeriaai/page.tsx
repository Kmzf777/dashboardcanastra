'use client'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { CpuChipIcon } from '@heroicons/react/24/outline'
import DashboardCard from '@/components/DashboardCard'
import SimpleBarChart from '@/components/SimpleBarChart'
import Chart from '@/components/Chart'
import { getNewLeadsKpis, getAttendedBySector, getQualifiedTotals } from '@/lib/queries'

export default function ValeriaAI() {
  const [isVisible, setIsVisible] = useState(false)
  const [newLeadsKpis, setNewLeadsKpis] = useState({ today: 0, last7: 0, last15: 0, last30: 0 })
  const [attendedBySector, setAttendedBySector] = useState({ private_label: 0, atacado: 0, exportacao: 0, consumo_proprio: 0 })
  const [qualifiedTotals, setQualifiedTotals] = useState({ total_qualified: 0 })
  const [loading, setLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
    loadValeriaData()
  }, [])

  const loadValeriaData = async () => {
    try {
      setLoading(true)
      
      // Load data in parallel with individual error handling
      const [leadsData, attendedData, qualifiedData] = await Promise.all([
        getNewLeadsKpis().catch(err => {
          console.error('Erro ao carregar KPIs de leads:', err)
          return { today: 0, last7: 0, last15: 0, last30: 0 }
        }),
        getAttendedBySector().catch(err => {
          console.error('Erro ao carregar dados por setor:', err)
          return { private_label: 0, atacado: 0, exportacao: 0, consumo_proprio: 0 }
        }),
        getQualifiedTotals().catch(err => {
          console.error('Erro ao carregar totais qualificados:', err)
          return { total_qualified: 0 }
        })
      ])
      
      setNewLeadsKpis(leadsData || { today: 0, last7: 0, last15: 0, last30: 0 })
      setAttendedBySector(attendedData || { private_label: 0, atacado: 0, exportacao: 0, consumo_proprio: 0 })
      setQualifiedTotals(qualifiedData || { total_qualified: 0 })
    } catch (error) {
      console.error('Erro geral ao carregar dados da Valéria AI:', error)
      // Set default values in case of complete failure
      setNewLeadsKpis({ today: 0, last7: 0, last15: 0, last30: 0 })
      setAttendedBySector({ private_label: 0, atacado: 0, exportacao: 0, consumo_proprio: 0 })
      setQualifiedTotals({ total_qualified: 0 })
    } finally {
      setLoading(false)
    }
  }
  
  const leadsChartData = [
    { label: 'Hoje', value: newLeadsKpis.today },
    { label: '7 dias', value: newLeadsKpis.last7 },
    { label: '15 dias', value: newLeadsKpis.last15 },
    { label: '30 dias', value: newLeadsKpis.last30 },
  ]
  const attendedSectorItems = [
    { label: 'Private Label', value: attendedBySector.private_label },
    { label: 'Atacado', value: attendedBySector.atacado },
    { label: 'Exportação', value: attendedBySector.exportacao },
    { label: 'Consumo Próprio', value: attendedBySector.consumo_proprio },
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
            
            {/* Premium AI Agent Hero Card */}
            <div className={`
              ai-agent-card group relative overflow-hidden min-w-0
              transition-all duration-700 ease-out
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}>
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-premium rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-[1px] bg-surface-elevated rounded-2xl" />
              
              {/* Background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/5 via-transparent to-success-green/5" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-cyan/3 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-success-green/3 rounded-full blur-3xl" />
              
              <div className="relative z-10 p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  
                  {/* Premium Icon with animations */}
                  <div className="relative group/icon">
                    <div className="w-20 h-20 bg-gradient-premium rounded-2xl flex items-center justify-center relative overflow-hidden group-hover/icon:rotate-3 transition-transform duration-300">
                      <CpuChipIcon className="w-10 h-10 text-white relative z-10" />
                      
                      {/* Pulse ring animation */}
                      <div className="absolute inset-0 bg-gradient-premium rounded-2xl animate-pulse-ring opacity-0 group-hover/icon:opacity-100" />
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-primary-cyan/20 rounded-2xl blur-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-3 tracking-tight">
                      Valéria AI
                    </h1>
                    <p className="text-lg text-text-secondary mb-6">
                      Assistente Inteligente de Marketing
                    </p>
                    
                    {/* Quick metrics */}
                    <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                      <div className="text-center lg:text-left">
                        <div className="text-2xl font-bold text-primary-cyan font-mono">
                          {newLeadsKpis.today}
                        </div>
                        <div className="text-xs text-text-tertiary uppercase tracking-wider">
                          Leads Hoje
                        </div>
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-2xl font-bold text-success-green font-mono">
                          {newLeadsKpis.last7}
                        </div>
                        <div className="text-xs text-text-tertiary uppercase tracking-wider">
                          Últimos 7 dias
                        </div>
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-2xl font-bold text-secondary-purple font-mono">
                          89%
                        </div>
                        <div className="text-xs text-text-tertiary uppercase tracking-wider">
                          Taxa de Conversão
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard title="Hoje" value={`${newLeadsKpis.today}`} change="+12.5%" changeType="positive" icon="✨" period="Hoje" />
              <DashboardCard title="7 dias" value={`${newLeadsKpis.last7}`} change="+8.3%" changeType="positive" icon="📈" period="7 dias" />
              <DashboardCard title="15 dias" value={`${newLeadsKpis.last15}`} change="+15.2%" changeType="positive" icon="🚀" period="15 dias" />
              <DashboardCard title="30 dias" value={`${newLeadsKpis.last30}`} change="+22.1%" changeType="positive" icon="🌟" period="30 dias" />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Atendidos por Setor */}
              <div className="chart-container">
                <h2 className="text-xl font-semibold text-text-primary mb-6">Atendidos por Setor</h2>
                <SimpleBarChart items={attendedSectorItems} />
              </div>

              {/* Evolução de Leads */}
              <div className="chart-container">
                <h2 className="text-xl font-semibold text-text-primary mb-6">Evolução de Leads</h2>
                <Chart title="Evolução de Leads" data={leadsChartData} type="leads" />
              </div>
            </div>

            {/* Premium Data Table - Leads por Setor */}
            <div className="premium-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">Leads por Setor</h2>
                <div className="text-sm text-text-tertiary">
                  {Object.values(attendedBySector).reduce((a: number, b: number) => a + b, 0)} leads atendidos
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-subtle">
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                        Setor
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                        Quantidade
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                        Percentual
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {attendedSectorItems.map((sector, idx) => {
                      const total = Object.values(attendedBySector).reduce((a: number, b: number) => a + b, 0)
                      const percentage = total > 0 ? ((sector.value / total) * 100).toFixed(1) : '0.0'
                      const getPercentageColor = (pct: number) => {
                        if (pct >= 30) return 'bg-success-green/10 text-success-green border-success-green/20'
                        if (pct >= 20) return 'bg-warning-amber/10 text-warning-amber border-warning-amber/20'
                        return 'bg-primary-cyan/10 text-primary-cyan border-primary-cyan/20'
                      }
                      
                      return (
                        <tr key={idx} className="hover:bg-surface-hover transition-colors duration-200">
                          <td className="px-6 py-4 text-text-primary font-medium">
                            {sector.label}
                          </td>
                          <td className="px-6 py-4 text-text-secondary font-mono">
                            {sector.value}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPercentageColor(parseFloat(percentage))}`}>
                              {percentage}%
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
            <div className="premium-card border-warning-amber/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-warning-amber rounded-full" />
                <h3 className="text-lg font-semibold text-text-primary">Status de Desenvolvimento</h3>
              </div>
              <p className="text-text-secondary mb-2">
                Funcionalidades avançadas em desenvolvimento
              </p>
              <p className="text-sm text-text-tertiary">
                Análise preditiva, automação de campanhas e insights de IA serão implementados em breve
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
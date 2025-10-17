import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { supabase } from '@/lib/supabaseClient'

interface TableMeta {
  name: string
  count: number | null
  columns: string[]
  error?: string
}

async function inspectTable(name: string): Promise<TableMeta> {
  try {
    const countRes = await supabase
      .from(name)
      .select('*', { count: 'exact', head: true })

    const sampleRes = await supabase
      .from(name)
      .select('*')
      .limit(1)

    const columns = Array.isArray(sampleRes.data) && sampleRes.data[0]
      ? Object.keys(sampleRes.data[0])
      : []

    return { name, count: countRes.count ?? null, columns }
  } catch (e: any) {
    return { name, count: null, columns: [], error: e?.message || 'Erro ao consultar' }
  }
}

export default async function AdminTabelas() {
  const tables = ['leads-google', 'leads-closer-atacado', 'vendas_atacado']

  const metas: TableMeta[] = []
  for (const t of tables) {
    metas.push(await inspectTable(t))
  }

  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <div className="relative min-w-0 lg:pl-64">
        <Sidebar />
        <main className="flex-1 min-w-0 pt-16 px-3 sm:px-4 lg:px-8 xl:px-12 transition-all duration-300 overflow-x-hidden">
          <div className="w-full max-w-7xl mx-auto space-y-8">
            <div className="card mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="h2 text-white">Admin · Tabelas Supabase</h2>
                <span className="tiny text-[#666666]">Conectado via chave pública</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {metas.map((m) => (
                  <div key={m.name} className="glass rounded-xl p-6 border border-cyan-400/20">
                    <h3 className="h3 text-white mb-2">{m.name}</h3>
                    <div className="tiny text-[#888888] mb-4">{m.error ? `Erro: ${m.error}` : `Registros: ${m.count ?? '—'}`}</div>
                    <div>
                      <h4 className="tiny text-white mb-2">Colunas amostra</h4>
                      {m.columns.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {m.columns.map((c) => (
                            <span key={c} className="tiny bg-[#2A2A2A] text-[#CCCCCC] px-2 py-1 rounded-md">{c}</span>
                          ))}
                        </div>
                      ) : (
                        <div className="tiny text-[#666666]">—</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
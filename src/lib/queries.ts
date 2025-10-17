import supabase, { isSupabaseConfigured, getSupabaseConfigError } from '@/lib/supabaseClient'

const START_DATE_ISO = '2025-10-01T00:00:00.000Z'

// Tenta inferir campo de data para filtro em memória
function parseFlexibleDate(input: any): Date | null {
  if (!input) return null
  // Date nativo
  const d1 = new Date(input)
  if (!isNaN(d1.getTime())) return d1

  // Epoch (segundos ou ms)
  if (typeof input === 'number') {
    const ms = input > 1e12 ? input : input * 1000
    const d = new Date(ms)
    return isNaN(d.getTime()) ? null : d
  }
  const s = String(input).trim()
  if (/^\d{10,13}$/.test(s)) {
    const num = parseInt(s, 10)
    const ms = s.length >= 13 ? num : num * 1000
    const d = new Date(ms)
    return isNaN(d.getTime()) ? null : d
  }

  // dd/mm/yyyy [HH:MM[:SS]]
  const m = s.match(/^(\d{2})[\/\-](\d{2})[\/\-](\d{4})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?$/)
  if (m) {
    const [, dd, mm, yyyy, HH='0', MM='0', SS='0'] = m
    const d = new Date(Number(yyyy), Number(mm)-1, Number(dd), Number(HH), Number(MM), Number(SS))
    return isNaN(d.getTime()) ? null : d
  }
  return null
}

function getRowDate(row: any): Date | null {
  const candidates = ['created_at', 'timestamp', 'date', 'inserted_at', 'data', 'data_venda', 'dataVenda', 'dt_venda', 'data_pedido', 'pedido_data']
  for (const key of candidates) {
    if (row && row[key]) {
      const d = parseFlexibleDate(row[key])
      if (d) return d
    }
  }
  // Busca heurística por chaves com "date", "data" ou terminando com "_at"
  if (row && typeof row === 'object') {
    for (const key of Object.keys(row)) {
      if (/date|data|_at|created|updated|timestamp/i.test(key)) {
        const d = parseFlexibleDate(row[key])
        if (d) return d
      }
    }
  }
  return null
}

function afterStart(row: any): boolean {
  const d = getRowDate(row)
  if (!d) return true // se não houver data, não filtra para evitar perder dados
  return d >= new Date(START_DATE_ISO)
}

export type SectorKey = 'private_label' | 'atacado' | 'exportacao' | 'consumo_proprio' | 'nenhum'

export const sectorMap: Record<number, SectorKey> = {
  1: 'nenhum',
  2: 'private_label',
  3: 'atacado',
  4: 'exportacao',
  5: 'consumo_proprio',
}

export async function fetchLeadsGoogleRaw() {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase não configurado, retornando dados vazios:', getSupabaseConfigError())
    return []
  }
  
  const { data, error } = await supabase
    .from('leads-google')
    .select('*')
  if (error) throw error
  return (data || []).filter(afterStart)
}

export async function getQualifiedTotals() {
  const rows = await fetchLeadsGoogleRaw()
  const qualified = rows.filter((r: any) => r.qualified === true)
  return {
    total_qualified: qualified.length,
  }
}

export async function getQualifiedBySector() {
  const rows = await fetchLeadsGoogleRaw()
  const qualified = rows.filter((r: any) => r.qualified === true)
  const counts: Record<SectorKey, number> = {
    private_label: 0,
    atacado: 0,
    exportacao: 0,
    consumo_proprio: 0,
    nenhum: 0,
  }
  for (const r of qualified) {
    const sector = sectorMap[r.bot_stage as number] || 'nenhum'
    counts[sector]++
  }
  return counts
}

export async function getAttendedBySector() {
  const rows = await fetchLeadsGoogleRaw()
  // Excluir leads qualificados
  const attended = rows.filter((r: any) => [2,3,4,5].includes(Number(r.bot_stage)) && r.qualified !== true)
  const counts: Record<SectorKey, number> = {
    private_label: 0,
    atacado: 0,
    exportacao: 0,
    consumo_proprio: 0,
    nenhum: 0,
  }
  for (const r of attended) {
    const sector = sectorMap[r.bot_stage as number] || 'nenhum'
    counts[sector]++
  }
  return counts
}

// --- Marcos AI ---

const UF_BY_NAME: Record<string, string> = {
  'ACRE': 'AC','ALAGOAS': 'AL','AMAPÁ': 'AP','AMAPA': 'AP','AMAZONAS': 'AM','BAHIA': 'BA','CEARÁ': 'CE','CEARA': 'CE','DISTRITO FEDERAL': 'DF','ESPÍRITO SANTO': 'ES','ESPIRITO SANTO': 'ES','GOIÁS': 'GO','GOIAS': 'GO','MARANHÃO': 'MA','MARANHAO': 'MA','MATO GROSSO': 'MT','MATO GROSSO DO SUL': 'MS','MINAS GERAIS': 'MG','PARÁ': 'PA','PARA': 'PA','PARAÍBA': 'PB','PARAIBA': 'PB','PARANÁ': 'PR','PARANA': 'PR','PERNAMBUCO': 'PE','PIAUÍ': 'PI','PIAUI': 'PI','RIO DE JANEIRO': 'RJ','RIO GRANDE DO NORTE': 'RN','RIO GRANDE DO SUL': 'RS','RONDÔNIA': 'RO','RONDONIA': 'RO','RORAIMA': 'RR','SANTA CATARINA': 'SC','SÃO PAULO': 'SP','SAO PAULO': 'SP','SERGIPE': 'SE','TOCANTINS': 'TO'
}

function normalizeUF(input: string | null | undefined): string | null {
  if (!input) return null
  const s = input.trim().toUpperCase()
  if (s.length === 2) return s
  return UF_BY_NAME[s] || null
}

export async function fetchAtacadoRaw() {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase não configurado, retornando dados vazios:', getSupabaseConfigError())
    return []
  }
  
  const { data, error } = await supabase
    .from('leads-closer-atacado')
    .select('*')
  if (error) throw error
  return (data || []).filter(afterStart)
}

export async function getClientsByState() {
  const rows = await fetchAtacadoRaw()
  const counts: Record<string, { total: number, reposicao: number }> = {}
  for (const r of rows) {
    const uf = normalizeUF(r.company_state)
    if (!uf) continue
    if (!counts[uf]) counts[uf] = { total: 0, reposicao: 0 }
    counts[uf].total += 1
    if (r.reposicao === true) counts[uf].reposicao += 1
  }
  return counts
}

// --- Vendas Atacado (Marcos) ---
export async function fetchVendasAtacadoRaw() {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase não configurado, retornando dados vazios:', getSupabaseConfigError())
    return []
  }
  
  const { data, error } = await supabase
    .from('vendas_atacado')
    .select('*')
  if (error) throw error
  return (data || []).filter(afterStart)
}

function parseAmountBRL(input: any): number {
  if (typeof input === 'number') return input
  if (input == null) return 0
  let s = String(input).trim()
  // remove símbolos e espaços
  s = s.replace(/[Rr]\$\s?/g, '')
  s = s.replace(/\s+/g, '')
  // manter apenas dígitos, separadores e sinal
  s = s.replace(/[^0-9,.-]/g, '')
  // Se vírgula parecer separador decimal (pt-BR), normaliza
  const commaPos = s.lastIndexOf(',')
  const dotPos = s.lastIndexOf('.')
  if (commaPos !== -1 && (dotPos === -1 || commaPos > dotPos)) {
    s = s.replace(/\./g, '') // remove separadores de milhar
    s = s.replace(',', '.')   // vírgula vira decimal
  }
  const num = parseFloat(s)
  return isNaN(num) ? 0 : num
}

function getRowAmount(row: any): number {
  const candidates = ['valor', 'value', 'amount', 'total', 'price', 'valor_total', 'valorPedido', 'valor_pedido']
  for (const key of candidates) {
    const v = row?.[key]
    if (v == null) continue
    const num = parseAmountBRL(v)
    if (!isNaN(num) && num !== 0) return num
  }
  // Heurística: procurar chave com "valor"/"total" e tentar parse
  if (row && typeof row === 'object') {
    for (const key of Object.keys(row)) {
      if (/valor|total|amount|price/i.test(key)) {
        const num = parseAmountBRL(row[key])
        if (!isNaN(num) && num !== 0) return num
      }
    }
  }
  return 0
}

export async function getVendasAtacadoKpis() {
  const rows = await fetchVendasAtacadoRaw()
  // Use a fixed date to avoid oscillation - start of current day
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const now = today.getTime()
  
  const daysToMs = (d: number) => d * 24 * 60 * 60 * 1000
  const withinDays = (r: any, days: number) => {
    const d = getRowDate(r)
    if (!d) return false
    return d.getTime() >= (now - daysToMs(days))
  }
  const sum = (rs: any[]) => rs.reduce((acc, cur) => acc + getRowAmount(cur), 0)

  const todayTotal = sum(rows.filter(r => withinDays(r, 1)))
  const last7Total = sum(rows.filter(r => withinDays(r, 7)))
  const last15Total = sum(rows.filter(r => withinDays(r, 15)))
  const last30Total = sum(rows.filter(r => withinDays(r, 30)))

  return {
    todayTotal,
    last7Total,
    last15Total,
    last30Total,
  }
}

// --- Novos Leads (planejado) ---
export async function getNewLeadsKpis() {
  const rows = await fetchLeadsGoogleRaw()
  const filtered = rows.filter((r: any) => r.qualified !== true)
  // Use a fixed date to avoid oscillation - start of current day
  const todayDate = new Date()
  todayDate.setHours(0, 0, 0, 0)
  const now = todayDate.getTime()
  
  const daysToMs = (d: number) => d * 24 * 60 * 60 * 1000
  const withinDays = (r: any, days: number) => {
    const d = getRowDate(r)
    if (!d) return false
    return d.getTime() >= (now - daysToMs(days))
  }

  const today = filtered.filter(r => withinDays(r, 1)).length
  const last7 = filtered.filter(r => withinDays(r, 7)).length
  const last15 = filtered.filter(r => withinDays(r, 15)).length
  const last30 = filtered.filter(r => withinDays(r, 30)).length

  return { today, last7, last15, last30 }
}
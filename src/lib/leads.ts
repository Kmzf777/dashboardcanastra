import { fetchLeadsGoogleRaw, fetchAtacadoRaw } from '@/lib/queries'

export type BasicLead = {
  name: string
  number: string
}

export type BasicLeadAtacado = BasicLead & {
  reposicao: boolean
  active: boolean
}

function getRowName(row: any): string {
  const candidates = ['name','nome','client','cliente','company','company_name','fantasia','razao_social','lead_name','contact_name']
  for (const key of candidates) {
    const v = row?.[key]
    if (typeof v === 'string' && v.trim().length > 0) return v.trim()
  }
  // fallback: tenta combinar possíveis campos
  const combo = [row?.nome, row?.company_name, row?.fantasia].filter(Boolean).join(' ').trim()
  return combo || '—'
}

function parsePhone(raw: any): string {
  if (raw == null) return '—'
  if (typeof raw === 'number') return String(raw)
  let s = String(raw).trim()
  // remove sufixo de whatsapp como '@s.whatsapp.net' e similares
  if (s.includes('@')) s = s.split('@')[0]
  // normaliza espaços e caracteres
  s = s.replace(/\s+/g, '')
  // mantém dígitos e '+'
  s = s.replace(/[^0-9+]/g, '')
  // remove zeros à esquerda indevidos (exceto se iniciar com '+')
  if (!s.startsWith('+')) s = s.replace(/^0+/, '')
  return s || '—'
}

function getRowNumber(row: any): string {
  const candidates = ['number','phone','telefone','whatsapp','contact','contato','celular','msisdn','numero','número','phone_number']
  for (const key of candidates) {
    const v = row?.[key]
    if (v != null) return parsePhone(v)
  }
  // heurística: procura chave contendo 'phone', 'whats', 'tel'
  if (row && typeof row === 'object') {
    for (const key of Object.keys(row)) {
      if (/phone|whats|tel|cel/i.test(key)) {
        return parsePhone(row[key])
      }
    }
  }
  return '—'
}

export async function getLeadsGoogleBasic(limit = 50): Promise<BasicLead[]> {
  const rows = await fetchLeadsGoogleRaw()
  const items: BasicLead[] = rows.map((r: any) => ({ name: getRowName(r), number: getRowNumber(r) }))
  return items.slice(0, limit)
}

export async function getLeadsAtacadoBasic(limit = 50): Promise<BasicLeadAtacado[]> {
  const rows = await fetchAtacadoRaw()
  const items: BasicLeadAtacado[] = rows.map((r: any) => ({
    name: getRowName(r),
    number: getRowNumber(r),
    reposicao: r?.reposicao === true,
    active: r?.active === true,
  }))
  return items.slice(0, limit)
}
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

// Durante o build, as variáveis podem não estar disponíveis
// Usamos valores padrão para evitar falhas de build
const supabaseUrl = url || 'https://placeholder.supabase.co'
const supabaseAnonKey = anon || 'placeholder-key'

// Cliente único reutilizável (browser e server) para consultas públicas
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Função para verificar se o Supabase está configurado corretamente
export const isSupabaseConfigured = () => {
  return !!(url && anon)
}

// Função para obter erro de configuração
export const getSupabaseConfigError = () => {
  if (!url && !anon) {
    return 'Supabase: URL e ANON KEY não configurados. Verifique as variáveis de ambiente.'
  }
  if (!url) {
    return 'Supabase: URL não configurada. Defina NEXT_PUBLIC_SUPABASE_URL.'
  }
  if (!anon) {
    return 'Supabase: ANON KEY não configurada. Defina NEXT_PUBLIC_SUPABASE_ANON_KEY.'
  }
  return null
}

export default supabase
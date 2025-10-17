import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

if (!url || !anon) {
  // Evita falhas silenciosas quando o cliente for importado sem env configurado
  throw new Error('Supabase: variáveis de ambiente ausentes (URL ou ANON KEY).')
}

// Cliente único reutilizável (browser e server) para consultas públicas
export const supabase = createClient(url, anon)

export default supabase
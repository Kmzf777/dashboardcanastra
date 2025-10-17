'use client'

import { isSupabaseConfigured, getSupabaseConfigError } from '@/lib/supabaseClient'
import { ExclamationTriangleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

export default function SupabaseConfigWarning() {
  if (isSupabaseConfigured()) {
    return null // Não mostra nada se estiver configurado
  }

  const error = getSupabaseConfigError()

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
      <div className="flex items-start gap-4">
        <ExclamationTriangleIcon className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-amber-800 mb-2">
            ⚙️ Configuração Necessária
          </h3>
          <p className="text-amber-700 mb-4">
            {error || 'As variáveis de ambiente do Supabase não estão configuradas.'}
          </p>
          
          <div className="bg-amber-100 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
              <Cog6ToothIcon className="w-4 h-4" />
              Para configurar na Vercel:
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-amber-700">
              <li>Acesse o painel da Vercel</li>
              <li>Vá em <strong>Settings → Environment Variables</strong></li>
              <li>Adicione as seguintes variáveis:</li>
            </ol>
            
            <div className="mt-3 bg-white rounded border p-3 font-mono text-xs">
              <div className="mb-2">
                <strong>NEXT_PUBLIC_SUPABASE_URL</strong><br/>
                <span className="text-gray-600">https://your-project-id.supabase.co</span>
              </div>
              <div>
                <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY</strong><br/>
                <span className="text-gray-600">your-anon-key-here</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-amber-600">
            💡 <strong>Dica:</strong> Após configurar, faça um novo deploy para aplicar as mudanças.
          </p>
        </div>
      </div>
    </div>
  )
}
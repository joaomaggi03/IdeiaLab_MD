// Comunicação centralizada com a API IdeiaLab MD.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
const TOKEN_KEY = 'ideialab_token'
export function getToken() { return sessionStorage.getItem(TOKEN_KEY) }
export function getUsuario() { try { return JSON.parse(sessionStorage.getItem('ideialab_usuario')) } catch { return null } }
export function salvarSessao(resposta) { sessionStorage.setItem(TOKEN_KEY, resposta.token); sessionStorage.setItem('ideialab_usuario', JSON.stringify(resposta.usuario)) }
export function sair() { sessionStorage.removeItem(TOKEN_KEY); sessionStorage.removeItem('ideialab_usuario') }
export async function api(caminho, options = {}) {
  const token = getToken()
  const resposta = await fetch(`${API_URL}${caminho}`, {
    ...options,
    headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  })
  const dados = resposta.status === 204 ? null : await resposta.json().catch(() => null)
  if (!resposta.ok) {
    const erro = new Error(dados?.erro || `Erro HTTP ${resposta.status}`)
    erro.status = resposta.status
    throw erro
  }
  return dados
}

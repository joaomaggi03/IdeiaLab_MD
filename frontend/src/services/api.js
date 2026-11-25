// A API fica em uma única origem, configurável em frontend/.env.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
const TOKEN_KEY = 'ideialab_token'
const USUARIO_KEY = 'ideialab_usuario'

export function getToken() { return sessionStorage.getItem(TOKEN_KEY) }
export function getUsuario() {
  try { return JSON.parse(sessionStorage.getItem(USUARIO_KEY)) } catch { return null }
}
export function atualizarUsuario(usuario) {
  sessionStorage.setItem(USUARIO_KEY, JSON.stringify(usuario))
}
export function salvarSessao(resposta) {
  sessionStorage.setItem(TOKEN_KEY, resposta.token)
  atualizarUsuario(resposta.usuario)
}
export function sair() {
  sessionStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(USUARIO_KEY)
}

export async function api(caminho, options = {}) {
  const token = getToken()
  let resposta
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })
  } catch {
    throw new Error('Não foi possível conectar à API. Verifique se o back-end está ligado na porta 3001.')
  }
  const dados = resposta.status === 204 ? null : await resposta.json().catch(() => null)
  if (!resposta.ok) {
    // Não desconectar em tentativas de login com senha errada.
    if (resposta.status === 401 && token && !caminho.startsWith('/auth/')) {
      sair()
      window.location.replace('/login')
    }
    const erro = new Error(dados?.erro || `Erro HTTP ${resposta.status}`)
    erro.status = resposta.status
    throw erro
  }
  return dados
}

import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { api, getUsuario, sair } from '../../services/api'
import './Admin.css'
import logoIdeiaLab from '../../assets/logo-ideialab.png'

const statusDisponiveis = ['Em análise', 'Aprovada', 'Em execução', 'Concluída']
const iniciais = nome => (nome || 'U').trim().split(/\s+/).slice(0, 2).map(p => p[0]).join('').toUpperCase()

function obterClasseStatus(status) {
  const classes = {
    'Aprovada': 'admin-status-aprovada',
    'Em análise': 'admin-status-analise',
    'Em execução': 'admin-status-execucao',
    'Concluída': 'admin-status-concluida',
  }
  return classes[status] || ''
}

function Admin() {
  const navigate = useNavigate()
  const usuarioAtual = getUsuario()
  const [ideias, setIdeias] = useState([])
  const [categorias, setCategorias] = useState([])
  const [usuarias, setUsuarias] = useState([])
  const [busca, setBusca] = useState('')
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(true)

  async function carregar() {
    const [listaIdeias, listaCategorias, listaUsuarias] = await Promise.all([
      api('/ideias'), api('/categorias'), api('/usuarios'),
    ])
    setIdeias(listaIdeias)
    setCategorias(listaCategorias)
    setUsuarias(listaUsuarias)
  }

  useEffect(() => {
    let ativo = true
    Promise.all([api('/ideias'), api('/categorias'), api('/usuarios')])
      .then(([i,c,u]) => { if(ativo) { setIdeias(i); setCategorias(c); setUsuarias(u) } })
      .catch(e => { if(ativo) setErro(e.message) })
      .finally(() => { if(ativo) setCarregando(false) })
    return () => { ativo = false }
  }, [])

  async function executar(operacao, mensagemSucesso) {
    setErro(''); setMensagem('')
    try {
      await operacao()
      await carregar()
      setMensagem(mensagemSucesso)
    } catch(e) { setErro(e.message) }
  }

  const ideiasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return !termo ? ideias : ideias.filter(i =>
      `${i.titulo} ${i.autora?.nome || ''}`.toLowerCase().includes(termo)
    )
  }, [ideias, busca])

  function alterarStatus(ideia) {
    const indice = statusDisponiveis.indexOf(ideia.status)
    const status = statusDisponiveis[(indice + 1) % statusDisponiveis.length]
    executar(() => api(`/ideias/${ideia.id}`, {
      method:'PUT', body:JSON.stringify({status})
    }), `Status atualizado para ${status}.`)
  }

  function editarIdeia(ideia) {
    const titulo = window.prompt('Título da ideia:', ideia.titulo)
    if (titulo === null) return
    const descricao = window.prompt('Descrição:', ideia.descricao)
    if (descricao === null) return
    const publicoAlvo = window.prompt('Público-alvo:', ideia.publicoAlvo)
    if (publicoAlvo === null) return
    const categoriaId = window.prompt(`ID da categoria (${categorias.map(c=>`${c.id}: ${c.nome}`).join(', ')}):`, String(ideia.categoriaId))
    if (categoriaId === null) return
    executar(() => api(`/ideias/${ideia.id}`, { method:'PUT', body:JSON.stringify({
      titulo, descricao, publicoAlvo, categoriaId:Number(categoriaId)
    }) }), 'Ideia atualizada com sucesso.')
  }

  function excluirIdeia(ideia) {
    if (!window.confirm(`Excluir logicamente a ideia "${ideia.titulo}"?`)) return
    executar(() => api(`/ideias/${ideia.id}`, {method:'DELETE'}), 'Ideia excluída com sucesso.')
  }

  function novaCategoria() {
    const nome = window.prompt('Nome da nova categoria:')
    if (nome === null || !nome.trim()) return
    const descricao = window.prompt('Descrição (opcional):', '')
    if (descricao === null) return
    executar(() => api('/categorias', { method:'POST', body:JSON.stringify({
      nome:nome.trim(), ...(descricao.trim() ? {descricao:descricao.trim()} : {})
    }) }), 'Categoria cadastrada.')
  }

  function editarCategoria(categoria) {
    const nome = window.prompt('Nome da categoria:', categoria.nome)
    if (nome === null || !nome.trim()) return
    const descricao = window.prompt('Descrição:', categoria.descricao || '')
    if (descricao === null) return
    executar(() => api(`/categorias/${categoria.id}`, {method:'PUT', body:JSON.stringify({
      nome:nome.trim(), descricao:descricao.trim() || null
    }) }), 'Categoria atualizada.')
  }

  function excluirCategoria(categoria) {
    if (!window.confirm(`Excluir a categoria "${categoria.nome}"? Ela não pode estar vinculada a nenhuma ideia.`)) return
    executar(() => api(`/categorias/${categoria.id}`, {method:'DELETE'}), 'Categoria excluída.')
  }

  function alterarPerfil(u) {
    const perfil = u.perfil === 'admin' ? 'membro' : 'admin'
    if (!window.confirm(`Alterar o perfil de ${u.nome} para ${perfil}?`)) return
    executar(() => api(`/usuarios/${u.id}`, {method:'PUT', body:JSON.stringify({perfil})}), 'Permissão atualizada.')
  }

  function alterarAtivo(u) {
    const ativo = !u.ativo
    if (!window.confirm(`${ativo ? 'Ativar' : 'Desativar'} a conta de ${u.nome}?`)) return
    executar(() => api(`/usuarios/${u.id}`, {method:'PUT', body:JSON.stringify({ativo})}), 'Situação da conta atualizada.')
  }

  function encerrarSessao() { sair(); navigate('/login', {replace:true}) }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <Link to="/listagem" className="admin-brand">
          <img src={logoIdeiaLab} alt="Logo IdeiaLab MD" className="admin-logo" />
          <span className="admin-brand-name">IdeiaLab <span>MD</span></span>
        </Link>
        <nav className="admin-navigation">
          <Link to="/listagem" className="admin-nav-link">Ideias</Link>
          <Link to="/nova-ideia" className="admin-nav-link">Nova ideia</Link>
          <Link to="/perfil" className="admin-nav-link">Perfil</Link>
          <Link to="/admin" className="admin-nav-link admin-nav-active">Admin</Link>
          <button type="button" className="admin-nav-link" onClick={encerrarSessao} style={{border:0,background:'none',cursor:'pointer'}}>Sair</button>
        </nav>
        <div className="admin-user">
          <div className="admin-user-avatar">{iniciais(usuarioAtual?.nome)}</div>
          <div className="admin-user-info">
            <span className="admin-user-name">{usuarioAtual?.nome || 'Administração'}</span>
            <span className="admin-user-role">Administradora</span>
          </div>
        </div>
      </header>

      <main className="admin-content">
        <section className="admin-heading">
          <h1>Painel administrativo</h1>
          <p>Gerencie ideias, categorias e usuários do projeto.</p>
        </section>
        {carregando && <p role="status">Carregando dados...</p>}
        {erro && <p role="alert" style={{color:'crimson'}}>{erro}</p>}
        {mensagem && <p role="status" style={{color:'green'}}>{mensagem}</p>}

        <section className="admin-summary">
          <article className="admin-summary-card"><p>Total de ideias</p><strong>{ideias.length}</strong></article>
          <article className="admin-summary-card"><p>Aguardando análise</p><strong className="admin-number-warning">{ideias.filter(i=>i.status==='Em análise').length}</strong></article>
          <article className="admin-summary-card"><p>Usuárias ativas</p><strong className="admin-number-purple">{usuarias.filter(u=>u.ativo).length}</strong></article>
          <article className="admin-summary-card"><p>Categorias</p><strong className="admin-number-pink">{categorias.length}</strong></article>
        </section>

        <section className="admin-management">
          <div className="admin-ideas-panel">
            <div className="admin-panel-heading">
              <h2>Gerenciar ideias</h2>
              <input type="search" className="admin-search" placeholder="Buscar..." aria-label="Buscar ideias por título ou autora" value={busca} onChange={e=>setBusca(e.target.value)} />
            </div>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead><tr><th>Ideia</th><th>Categoria</th><th>Votos</th><th>Status</th><th>Ações</th></tr></thead>
                <tbody>
                  {ideiasFiltradas.map(ideia => (
                    <tr key={ideia.id}>
                      <td>
                        <div className="admin-idea-title">{ideia.titulo}</div>
                        <div className="admin-idea-author">{ideia.autora?.nome || 'Usuária'}</div>
                      </td>
                      <td>{ideia.categoria?.nome || 'Sem categoria'}</td>
                      <td className="admin-votes">{ideia.votos}</td>
                      <td>
                        <button type="button" className={`admin-status ${obterClasseStatus(ideia.status)}`} onClick={()=>alterarStatus(ideia)} title="Clique para avançar para o próximo status">
                          {ideia.status} <span>▾</span>
                        </button>
                      </td>
                      <td>
                        <button type="button" className="admin-edit-button" onClick={()=>editarIdeia(ideia)}>Editar</button>{' '}
                        <button type="button" className="admin-edit-button" onClick={()=>excluirIdeia(ideia)}>Excluir</button>
                      </td>
                    </tr>
                  ))}
                  {!ideiasFiltradas.length && <tr><td colSpan={5} className="admin-empty">Nenhuma ideia encontrada.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="admin-sidebar">
            <section className="admin-side-panel">
              <div className="admin-side-heading"><h2>Categorias</h2><button type="button" className="admin-new-category" onClick={novaCategoria}>+ Nova</button></div>
              <ul className="admin-category-list">
                {categorias.map(c => <li key={c.id}>
                  <span>{c.nome}</span>
                  <div className="admin-category-actions">
                    <button type="button" onClick={()=>editarCategoria(c)}>editar</button>
                    <span>·</span>
                    <button type="button" onClick={()=>excluirCategoria(c)}>excluir</button>
                  </div>
                </li>)}
                {!categorias.length && <li>Nenhuma categoria</li>}
              </ul>
            </section>

            <section className="admin-side-panel">
              <h2>Usuárias</h2>
              <ul className="admin-user-list">
                {usuarias.map((u, indice) => <li key={u.id}>
                  <div className={`admin-list-avatar admin-avatar-${(indice % 3) + 1}`}>{iniciais(u.nome)}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <span className="admin-list-user-name">{u.nome}</span>
                    <div style={{fontSize:12,opacity:.7}}>{u.ativo ? 'Ativa' : 'Inativa'}</div>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:5}}>
                      {u.id !== usuarioAtual?.id && <>
                        <button type="button" onClick={()=>alterarPerfil(u)} style={{cursor:'pointer'}}>{u.perfil==='admin'?'Remover admin':'Tornar admin'}</button>
                        <button type="button" onClick={()=>alterarAtivo(u)} style={{cursor:'pointer'}}>{u.ativo?'Desativar':'Ativar'}</button>
                      </>}
                    </div>
                  </div>
                  <span className={`admin-role-badge ${u.perfil === 'admin' ? 'admin-role-admin' : ''}`}>{u.perfil === 'admin' ? 'Admin' : 'Voluntária'}</span>
                </li>)}
                {!usuarias.length && <li>Nenhuma usuária cadastrada.</li>}
              </ul>
            </section>
          </aside>
        </section>
      </main>
    </div>
  )
}

export default Admin

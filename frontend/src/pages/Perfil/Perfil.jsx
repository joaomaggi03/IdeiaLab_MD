import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, getUsuario, atualizarUsuario, sair } from '../../services/api'
import './Perfil.css'
import logoIdeiaLab from '../../assets/logo-ideialab.png'

const iniciais = nome => (nome || 'U').trim().split(/\s+/).slice(0, 2).map(p => p[0]).join('').toUpperCase()

function Perfil() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(getUsuario())
  const [nome, setNome] = useState(getUsuario()?.nome || '')
  const [email, setEmail] = useState(getUsuario()?.email || '')
  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    api('/usuarios/me').then(u => {
      setUsuario(u); setNome(u.nome); setEmail(u.email); atualizarUsuario(u)
    }).catch(e => setErro(e.message))
  }, [])

  async function salvarAlteracoes(event) {
    event.preventDefault()
    setErro(''); setSucesso(''); setSalvando(true)
    try {
      const dados = { nome: nome.trim(), email: email.trim() }
      if (novaSenha) {
        if (!senhaAtual) throw new Error('Informe a senha atual para alterá-la.')
        dados.senhaAtual = senhaAtual
        dados.novaSenha = novaSenha
      }
      const u = await api('/usuarios/me', { method: 'PUT', body: JSON.stringify(dados) })
      atualizarUsuario(u)
      setUsuario(u)
      setSenhaAtual(''); setNovaSenha('')
      setSucesso('Dados atualizados com sucesso!')
    } catch (e) { setErro(e.message) } finally { setSalvando(false) }
  }

  function encerrarSessao() {
    sair()
    navigate('/login', { replace: true })
  }

  return (
    <div className="perfil-page">
      <header className="perfil-header">
        <Link to="/listagem" className="perfil-brand">
          <img src={logoIdeiaLab} alt="Logo IdeiaLab MD" className="perfil-logo" />
          <div className="perfil-brand-name"><span>IdeiaLab</span><span className="perfil-brand-md"> MD</span></div>
        </Link>
        <nav className="perfil-navigation">
          <Link to="/listagem" className="perfil-nav-link">Ideias</Link>
          <Link to="/nova-ideia" className="perfil-nav-link">Nova ideia</Link>
          {usuario?.perfil === 'admin' && <Link to="/admin" className="perfil-nav-link">Admin</Link>}
          <button type="button" onClick={encerrarSessao} className="perfil-nav-link" style={{background:'none', border:0, cursor:'pointer'}}>Sair</button>
        </nav>
        <div className="perfil-user">
          <div className="perfil-user-avatar">{iniciais(usuario?.nome)}</div>
          <div className="perfil-user-info">
            <span className="perfil-user-name">{usuario?.nome || 'Usuária'}</span>
            <span className="perfil-user-role">{usuario?.perfil === 'admin' ? 'Administradora' : 'Voluntária'}</span>
          </div>
        </div>
      </header>

      <main className="perfil-content">
        <div className="perfil-container">
          <section className="perfil-heading"><h1>Meus dados</h1><p>Atualize suas informações de conta.</p></section>
          <form className="perfil-form" onSubmit={salvarAlteracoes}>
            <div className="perfil-photo-section">
              <div className="perfil-large-avatar">{iniciais(usuario?.nome)}</div>
              <div className="perfil-photo-info"><span className="perfil-photo-name">{usuario?.nome || 'Usuária'}</span></div>
            </div>
            <div className="perfil-divider" />
            <div className="perfil-fields-row">
              <div className="perfil-field">
                <label htmlFor="perfil-nome">Nome completo</label>
                <input id="perfil-nome" name="nome" type="text" value={nome} onChange={e=>setNome(e.target.value)} required maxLength={150}/>
              </div>
              <div className="perfil-field">
                <label htmlFor="perfil-email">E-mail</label>
                <input id="perfil-email" name="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required maxLength={200}/>
              </div>
            </div>
            <div className="perfil-field">
              <label>Perfil de acesso</label>
              <div className="perfil-access-box">
                <span className="perfil-access-badge">{usuario?.perfil === 'admin' ? 'Administração' : 'Voluntária'}</span>
                <span className="perfil-access-description">Definido pela coordenação</span>
              </div>
            </div>
            <div className="perfil-divider" />
            <h2 className="perfil-password-title">Alterar senha</h2>
            <div className="perfil-fields-row">
              <div className="perfil-field">
                <label htmlFor="senha-atual">Senha atual</label>
                <input id="senha-atual" name="senhaAtual" type="password" value={senhaAtual} onChange={e=>setSenhaAtual(e.target.value)} autoComplete="current-password" placeholder="Somente para alterar a senha"/>
              </div>
              <div className="perfil-field">
                <label htmlFor="nova-senha">Nova senha</label>
                <input id="nova-senha" name="novaSenha" type="password" value={novaSenha} onChange={e=>setNovaSenha(e.target.value)} autoComplete="new-password" minLength={8} placeholder="Mínimo de 8 caracteres"/>
              </div>
            </div>
            {erro && <p role="alert" style={{color:'crimson'}}>{erro}</p>}
            {sucesso && <p role="status" style={{color:'green'}}>{sucesso}</p>}
            <div className="perfil-form-actions">
              <button type="button" className="perfil-cancel-button" onClick={()=>navigate('/listagem')}>Cancelar</button>
              <button type="submit" className="perfil-save-button" disabled={salvando}>{salvando ? 'Salvando...' : 'Salvar alterações'}</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
export default Perfil

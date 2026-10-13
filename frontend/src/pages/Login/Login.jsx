import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, salvarSessao } from '../../services/api'
import './Login.css'
import logoIdeiaLab from '../../assets/logo-ideialab.png'


// =====================================================
// COMPONENTE - LOGIN
// Tela principal de autenticação do IdeiaLab MD
// =====================================================

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  async function entrar(event) {
    event.preventDefault()
    setErro(''); setEnviando(true)
    try {
      const dados = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, senha }) })
      salvarSessao(dados)
      navigate('/listagem', { replace: true })
    } catch (e) { setErro(e.message) } finally { setEnviando(false) }
  }
  return (
    // ===================================================
    // ESTRUTURA PRINCIPAL DA PÁGINA
    // ===================================================

    <main className="login-page">

      {/* =================================================
          PAINEL ESQUERDO
          Identidade visual e apresentação do projeto
          ================================================= */}

      <section className="login-brand-panel">

        {/* =================================================
            CABEÇALHO
            Logo + nome da aplicação
            ================================================= */}

        <header className="login-brand-header">

          {/* Logo do IdeiaLab MD */}
          <img
            className="login-brand-logo"
            src={logoIdeiaLab}
            alt="Logo IdeiaLab MD"
          />

          {/* Nome da aplicação */}
          <span className="login-brand-name">IdeiaLab MD</span>

        </header>

        {/* =================================================
            CONTEÚDO PRINCIPAL
            Título + descrição + benefícios
            ================================================= */}

        <div className="login-brand-content">

          {/* =================================================
              TÍTULO
              ================================================= */}

          <h1 className="login-brand-title">
            Banco de ideias do
            <br />
            projeto Meninas
            <br />
            Digitais
          </h1>

          {/* =================================================
              DESCRIÇÃO
              ================================================= */}

          <p className="login-brand-description">
            Centralize, discuta, vote e priorize as ideias de
            oficinas, palestras e dinâmicas — tudo em um
            único lugar.
          </p>

          {/* =================================================
              BENEFÍCIOS
              Principais funcionalidades apresentadas
              ================================================= */}

          <div className="login-brand-benefits">

            {/* -------------------------------------------------
                BENEFÍCIO 1
                ------------------------------------------------- */}

            <div className="login-benefit">
              <span className="login-benefit-number">1</span>
              <span>Cadastre novas ideias em segundos</span>
            </div>

            {/* -------------------------------------------------
                BENEFÍCIO 2
                ------------------------------------------------- */}

            <div className="login-benefit">
              <span className="login-benefit-number">2</span>
              <span>Vote nas propostas e veja o ranking</span>
            </div>

            {/* -------------------------------------------------
                BENEFÍCIO 3
                ------------------------------------------------- */}

            <div className="login-benefit">
              <span className="login-benefit-number">3</span>
              <span>Acompanhe o status de cada atividade</span>
            </div>

          </div>

        </div>

        {/* =================================================
            RODAPÉ
            Informações institucionais
            ================================================= */}

        <footer className="login-brand-footer">
          UTFPR · Projeto de Extensão Meninas Digitais
        </footer>

      </section>

      {/* =================================================
            PAINEL DIREITO
            Area destinada ao login
            ================================================= */}
      <section className="login-form-panel">
        {/* =================================================
            CONTAINER DO FORMULÁRIO
            Área central com os conteúdos do login
            ================================================= */}
        
        <form className='login-form-container' onSubmit={entrar}>
          {/*------ CABEÇALHO DO FORMULARIO ------*/}

          <div className='login-form-header'>
            {/*Título principal*/}
            <h2 className='login-form-title'>Entrar</h2>

            {/*Descrição*/}
            <p className='login-form-subtitle'>Acesse sua conta para continuar</p>
          </div>

          {/* =================================================
            CAMPO DE EMAIL
            ================================================= */}
          <div className='login-form-field'>
            {/*Label do campo*/}
            <label className='login-form-label'htmlFor='email'>E-mail</label>

            {/*Campo de entrada*/}
            <input id='email' className='login-form-input' type='email' placeholder='voce@email.com' value={email} onChange={e => setEmail(e.target.value)} required value={email} onChange={e => setEmail(e.target.value)} required>
            </input>
          </div>
          
          {/* =================================================
            CAMPO DE SENHA
            ================================================= */}
          <div className='login-password-group'>
            {/*Campo de senha*/}
            <div className='login-form-field'>
              <label className='login-form-label'htmlFor='password'>Senha</label>
              <input id='password'className='login-form-input'type='password'placeholder='••••••••' value={senha} onChange={e => setSenha(e.target.value)} required value={senha} onChange={e => setSenha(e.target.value)} required>
              </input>
            </div>

            {/*Link para recuperar senha*/}
            <div className='login-forgot-password-wrapper'>
              <span className='login-forgot-password' title='Recuperação de senha ainda não implementada'>Esqueci minha senha</span>
            </div>
            
          </div>

          {/* =================================================
            BOTÃO DE LOGIN
            ================================================= */}
          {erro && <p role='alert' style={{color:'crimson'}}>{erro}</p>}
          <button className='login-submit-button'type='submit' disabled={enviando}>{enviando ? 'Entrando...' : 'Entrar'}</button>

          {/* =================================================
            DIVISOR
            ================================================= */}

          <div className='login-divider'>
            <span className='login-divider-line'></span>
            <span className='login-divider-text'>ou</span>
            <span className='login-divider-line'></span>
          </div>
          
          {/* =================================================
            CADASTRO
            ================================================= */}
          <div className='login-signup'>
            <span className='login-signup-text'>Não tem uma conta?</span>
            <a className='login-signup-link' href='/cadastro'>Cadastre-se</a>
          </div>
          

        </form>
        
      </section>

    </main>
  )
}


// =====================================================
// EXPORTAÇÃO DO COMPONENTE
// =====================================================

export default Login
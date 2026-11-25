import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import './Cadastro.css'
import logoIdeiaLab from '../../assets/logo-ideialab.png'

function Cadastro(){
    const navigate = useNavigate()
    const [erro, setErro] = useState('')
    const [enviando, setEnviando] = useState(false)
    async function cadastrar(event) {
      event.preventDefault()
      const dados = new FormData(event.currentTarget)
      if (dados.get('senha') !== dados.get('confirmarSenha')) { setErro('As senhas não coincidem.'); return }
      setEnviando(true); setErro('')
      try {
        await api('/auth/cadastro', { method:'POST', body: JSON.stringify({ nome:dados.get('nome'), email:dados.get('email'), senha:dados.get('senha') }) })
        navigate('/login', { replace:true })
      } catch (e) { setErro(e.message) } finally { setEnviando(false) }
    }
    return(
        <main className='cadastro-page'>
            {/* =====================================================
                CARD PRINCIPAL
                Área central onde ficará o formulário
                ===================================================== */}

            <form className='cadastro-card' onSubmit={cadastrar}>
                {/*------ Cabeçalho ------*/}
                
                <header className='cadastro-header'>
                    <img className='cadastro-logo' src={logoIdeiaLab} alt='Logo IdeiaLab MD'></img>

                    {/*------ Textos do cabeçalho ------*/}
                    
                    <div className='cadastro-header-text'>
                        <h1 className='cadastro-title'>Criar conta</h1>
                        <p className='cadastro-subtitle'>Junte-se à equipe do IdeiaLab MD</p>
                    </div>

                </header>

                {/*================================
                    CAMPO DE NOME
                ==================================*/}

                <div className='cadastro-field'>
                    <label className='cadastro-label' htmlFor='nome'>Nome completo</label>
                    <input id='nome' name='nome' required className='cadastro-input' type='text' placeholder='Seu nome'></input>
                </div>

                {/*================================
                    CAMPO DE EMAIL
                ==================================*/}

                <div className='cadastro-field'>
                    <label className='cadastro-label' htmlFor='email'>E-mail</label>
                    <input id='email' name='email' required className='cadastro-input' type='email' placeholder='voce@email.com'></input>
                </div>

                {/*================================
                    CAMPOS DE SENHA
                ==================================*/}

                <div className='cadastro-password-row'>

                    <div className='cadastro-field'>
                        <label className='cadastro-label' htmlFor='senha'>Senha</label>
                        <input id='senha' name='senha' required className='cadastro-input' type='password' placeholder='••••••••'></input>
                    </div>

                    {/*------ confirma senha ------*/}
                    <div className='cadastro-field'>
                        <label className='cadastro-label' htmlFor='confirmar-senha'>Confirmar senha</label>
                        <input id='confirmar-senha' name='confirmarSenha' required className='cadastro-input' type='password' placeholder='••••••••'></input>
                    </div>

                </div>

                {/*================================
                    CHECKBOX: DIRETRIZES
                ==================================*/}

                <label className='cadastro-terms'>
                    <input className='cadastro-checkbox' type='checkbox' required></input>
                    <span className='cadastro-terms-text'>Concordo com as diretrizes de uso do projeto de extensão</span>
                </label>

                {/*================================
                    BOTAO DE CADASTRO
                ==================================*/}
                {erro && <p role='alert' style={{color:'crimson'}}>{erro}</p>}
                <button className='cadastro-button' type='submit' disabled={enviando}>{enviando ? 'Cadastrando...' : 'Cadastrar'}</button>

                {/*================================
                    RODAPÉ
                ==================================*/}
                <div className='cadastro-footer'>
                    <span className='cadastro-footer-text'>Já tem uma conta?</span>
                    <a className='cadastro-footer-link' href='/login'>Entrar</a>
                </div>

            </form>

        </main>
    )
}

export default Cadastro
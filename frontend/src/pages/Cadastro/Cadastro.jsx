import './Cadastro.css'
import logoIdeiaLab from '../../assets/logo-ideialab.png'

function Cadastro(){
    return(
        <main className='cadastro-page'>
            {/* =====================================================
                CARD PRINCIPAL
                Área central onde ficará o formulário
                ===================================================== */}

            <section className='cadastro-card'>
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
                    <input id='nome' className='cadastro-input' type='text' placeholder='Seu nome'></input>
                </div>

                {/*================================
                    CAMPO DE EMAIL
                ==================================*/}

                <div className='cadastro-field'>
                    <label className='cadastro-label' htmlFor='email'>E-mail</label>
                    <input id='email' className='cadastro-input' type='email' placeholder='voce@email.com'></input>
                </div>

                {/*================================
                    CAMPOS DE SENHA
                ==================================*/}

                <div className='cadastro-password-row'>

                    <div className='cadastro-field'>
                        <label className='cadastro-label' htmlFor='senha'>Senha</label>
                        <input id='senha' className='cadastro-input' type='password' placeholder='••••••••'></input>
                    </div>

                    {/*------ confirma senha ------*/}
                    <div className='cadastro-field'>
                        <label className='cadastro-label' htmlFor='confirmar-senha'>Confirmar senha</label>
                        <input id='confirmar-senha' className='cadastro-input' type='password' placeholder='••••••••'></input>
                    </div>

                </div>

                {/*================================
                    CHECKBOX: DIRETRIZES
                ==================================*/}

                <label className='cadastro-terms'>
                    <input className='cadastro-checkbox' type='checkbox'></input>
                    <span className='cadastro-terms-text'>Concordo com as diretrizes de uso do projeto de extensão</span>
                </label>

                {/*================================
                    BOTAO DE CADASTRO
                ==================================*/}
                <button className='cadastro-button' type='submit'>Cadastrar</button>

                {/*================================
                    RODAPÉ
                ==================================*/}
                <div className='cadastro-footer'>
                    <span className='cadastro-footer-text'>Já tem uma conta?</span>
                    <a className='cadastro-footer-link' href='/login'>Entrar</a>
                </div>

            </section>

        </main>
    )
}

export default Cadastro
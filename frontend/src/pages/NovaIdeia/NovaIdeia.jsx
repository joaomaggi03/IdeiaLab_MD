import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import {Link, useNavigate} from 'react-router-dom'
import './NovaIdeia.css'
import logoIdeiaLab from '../../assets/logo-ideialab.png'

// =====================================================
// TELA DE CADASTRO DE NOVA IDEIA
// Os dados serão conectados à API posteriormente.
// =====================================================

function NovaIdeia(){
    const navigate = useNavigate()
    const [categorias, setCategorias] = useState([])
    const [erro, setErro] = useState('')
    const [salvando, setSalvando] = useState(false)
    useEffect(() => { api('/categorias').then(setCategorias).catch(e => setErro(e.message)) }, [])

    //volta para a tela de listagem ao cancelar o cadastro
    function cancelarCadastro(){
        navigate('/listagem')
    }

    //validação com o back será implementado depois
    async function cadastrarIdeia(event){
        event.preventDefault()
        const dados = new FormData(event.currentTarget)
        setErro(''); setSalvando(true)
        try {
            const ideia = await api('/ideias', { method:'POST', body:JSON.stringify({
                titulo:dados.get('titulo'), descricao:dados.get('descricao'),
                publicoAlvo:dados.get('publicoAlvo'), categoriaId:Number(dados.get('categoria'))
            }) })
            navigate(`/detalhe/${ideia.id}`)
        } catch(e) { setErro(e.message) } finally { setSalvando(false) }
    }

    return(
        <div className='nova-ideia-page'>
            {/* =================================================
                HEADER
            ================================================= */}

            <header className='nova-ideia-header'>
                {/*------ Logo e nome do projeto ------*/}
                <Link to='/listagem' className='nova-ideia-brand'>
                    <img src={logoIdeiaLab} alt='Logo IdeiaLab MD' className='nova-ideia-logo'/>
                    <div className='nova-ideia-brand-name'>
                        <span>IdeiaLab</span>
                        <span className='nova-ideia-brand-md'>MD</span>
                    </div>
                </Link>

                {/*------ Navegação principal ------*/}
                <nav className='nova-ideia-navigation'>
                    <Link to='/listagem' className='nova-ideia-nav-link'>Ideias</Link>
                    <Link to='/nova-ideia' className='nova-ideia-nav-link active'>Nova ideia</Link>
                    <Link to='/admin' className='nova-ideia-nav-link'>Admin</Link>
                </nav>

                {/*------ Usuario representado no prototipo ------*/}
                <div className='nova-ideia-user'>
                    <div className='nova-ideia-user-avatar'>MA</div>
                    <div className='nova-ideia-user-info'>
                        <span className='nova-ideia-user-name'>Marina Alves</span>
                        <span className='nova-ideia-user-role'>Voluntária</span>
                    </div>
                </div>
            </header>

            {/* =================================================
                CONTEUDO PRINCIPAL
            ================================================= */}
            <main className='nova-ideia-content'>
                <div className='nova-ideia-container'>
                    {/*------ Link para voltar ------*/}
                    <Link to='/listagem' className='nova-ideia-back-link'>← Voltar para ideias</Link>

                    {/*------ Título e descrição da página ------*/}
                    <section className='nova-ideia-page-heading'>
                        <h1>Cadastrar nova ideia</h1>
                        <p>Descreva sua proposta de atividade para o
                            projeto Meninas Digitais.
                        </p>
                    </section>

                    {/* =================================================
                        FORMULÁRIO
                    ================================================= */}
                    <form className='nova-ideia-form' onSubmit={cadastrarIdeia}>
                        {/*------Campo: título ------*/}
                        <div className='nova-ideia-field'>
                            <label htmlFor='titulo-ideia'>Título da ideia</label>
                            <input id='titulo-ideia' name='titulo' 
                            type='text' placeholder='Ex: Oficina de introdução ao Scratch'
                            required/>
                        </div>

                        {/*------Campo: descrição ------*/}
                        <div className='nova-ideia-field'>
                            <label htmlFor='descricao-ideia'>Descrição</label>
                            <textarea id='descricao-ideia' name='descricao'
                            placeholder='Explique a atividade, os objetivos e como ela seria realizada...'
                            required/>
                        </div>

                        {/*------ Categoria e publico alvo ------*/}
                        <div className='nova-ideia-fields-row'>
                            <div className='nova-ideia-field'>
                                <label htmlFor='categoria-ideia'>Categoria</label>
                                <select id='categoria-ideia' name='categoria' 
                                defaultValue='' required>
                                    <option value='' disabled>Selecione a categoria</option>
                                    {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                                </select>
                            </div>

                            <div className='nova-ideia-field'>
                                <label htmlFor='publico-ideia'>Público-alvo</label>
                                <input id='publico-ideia' name='publicoAlvo'
                                type='text'
                                placeholder='Ex.: 11 a 14 anos' required></input>
                            </div>
                        </div>

                        {/*------ Aviso sobre o status inicial*/}
                        <div className='nova-ideia-status-notice'>
                            <span className='nova-ideia-status-badge'>Em análise</span>
                            <p>Toda nova ideia começa com o status
                                &quot;Em análise&quot; até ser avaliada
                                pela coordenação.
                            </p>
                        </div>

                        {erro && <p role='alert' style={{color:'crimson'}}>{erro}</p>}
                        {/*Botões do formulário*/}
                        <div className='nova-ideia-form-actions'>
                            <button type='button' className='nova-ideia-cancel-button' onClick={cancelarCadastro}>Cancelar</button>
                            <button type='submit' className='nova-ideia-submit-button' disabled={salvando}>{salvando ? 'Salvando...' : 'Cadastrar ideia'}</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}
export default NovaIdeia

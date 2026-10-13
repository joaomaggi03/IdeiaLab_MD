import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, getUsuario } from '../../services/api'
import {Link} from 'react-router-dom'
import './Detalhe.css'
import logoIdeiaLab from '../../assets/logo-ideialab.png'

function transformarIdeia(i) { return {
  ...i, categoria:i.categoria?.nome || 'Sem categoria', autora:i.autora?.nome || '',
  iniciaisAutora:(i.autora?.nome || 'U').slice(0,2).toUpperCase(),
  data:new Date(i.createdAt).toLocaleDateString('pt-BR')
} }

function Detalhe(){
    const { id } = useParams()
    const [ideia,setIdeia] = useState(null)
    const [comentarios,setComentarios] = useState([])
    const [meuVoto,setMeuVoto] = useState(false)
    const [texto,setTexto] = useState('')
    const [erro,setErro] = useState('')
    const usuario = getUsuario()
    useEffect(() => {
        if (!id) return
        Promise.all([api(`/ideias/${id}`),api(`/ideias/${id}/comentarios`),api(`/ideias/${id}/votos`)])
          .then(([i,c,v]) => { setIdeia(transformarIdeia(i)); setComentarios(c); setMeuVoto(v.meuVoto) })
          .catch(e => setErro(e.message))
    },[id])
    async function votar() {
        try {
            const v = await api(`/ideias/${id}/votos`, {method:meuVoto ? 'DELETE':'POST', ...(!meuVoto ? {body:'{}'}:{})})
            setMeuVoto(v.meuVoto);setIdeia(i => ({...i,votos:v.votos}));setErro('')
        } catch(e) {setErro(e.message)}
    }
    async function comentar() {
        try {
            await api(`/ideias/${id}/comentarios`, {method:'POST',body:JSON.stringify({texto})})
            setComentarios(await api(`/ideias/${id}/comentarios`));setTexto('');setErro('')
        } catch(e) {setErro(e.message)}
    }
    if (!ideia) return <main style={{padding:32}}>{erro || 'Carregando ideia...'}</main>
    return(
        <div className='detalhe-page'>
            <header className='detalhe-header'>
                {/*Logo + nome*/}
                <img src={logoIdeiaLab} alt='Logo IdeiaLab MD' className='detalhe-logo'/>
                <div className='detalhe-brand-name'>
                    <span>IdeiaLab</span>
                    <span className='detalhe-brand-md'>MD</span>
                </div>

                {/*------ Navegação ------*/}
                <nav className='detalhe-navigation'>
                    <Link to='/listagem' className='detalhe-nav-link active'>Ideias</Link>
                    <Link to='/nova-ideia' className='detalhe-nav-link'>Nova ideia</Link>
                    <Link to='/admin' className='detalhe-nav-link'>Admin</Link>
                </nav>

                {/*------ Usuario ------*/}
                <div className='detalhe-user'>
                    <div className='detalhe-user-avatar'>{(usuario?.nome || 'U').slice(0,2).toUpperCase()}</div>
                    <div className='detalhe-user-info'>
                        <span className='detalhe-user-name'>{usuario?.nome || 'Usuária'}</span>
                        <span className='detalhe-user-role'>{usuario?.perfil === 'admin' ? 'Administração' : 'Voluntária'}</span>
                    </div>
                </div>
            </header>

            {/* =====================================================
                CONTEUDO PRINCIPAL
            ===================================================== */}
            <main className='detalhe-content'>
                {/*------ Voltar ------*/}
                <Link to='/listagem' className='detalhe-back-link'>← Voltar para ideias</Link>

                {/* =====================================================
                    AREA PRINCIPAL
                ===================================================== */}

                {erro && <p role='alert' style={{color:'crimson'}}>{erro}</p>}
                <div className='detalhe-main-area'>
                    {/*------ COLUNA ESQUERDA ------*/}
                    <section className='detalhe-left-column'>
                       {/* =====================================================
                            CARD PRINCIPAL
                        ===================================================== */} 
                        <article className='detalhe-idea-card'>
                            {/*------ Categoria + status ------*/}
                            <div className='detalhe-idea-tags'>
                                <span className='detalhe-category-tag'>{ideia.categoria}</span>
                                <span className='detalhe-status-tag'>{ideia.status}</span>
                            </div>

                            {/*------ Titulo ------*/}
                            <h1 className='detalhe-idea-title'>{ideia.titulo}</h1>

                            {/*------ Autora ------*/}
                            <div className='detalhe-author'>
                                <div className='detalhe-author-avatar'>{ideia.iniciaisAutora}</div>
                                <div className='detalhe-author-text'>
                                    <span>Cadastrada por{' '}</span>
                                    <strong>{ideia.autora}</strong>
                                    <span>{' · '}{ideia.data}</span>
                                </div>

                            </div>

                            {/*------ Descrição ------*/}
                            <p className='detalhe-idea-description'>{ideia.descricao}</p>

                            {/*------ Informações principais ------*/}
                            <div className='detalhe-idea-meta'>
                                <div className='detalhe-meta-item'>
                                    <span className='detalhe-meta-label'>Público-alvo</span>
                                    <strong>{ideia.publicoAlvo}</strong>
                                </div>

                                <div className='detalhe-meta-item'>
                                    <span className='detalhe-meta-label'>Categoria</span>
                                    <strong>{ideia.categoria}</strong>
                                </div>

                                
                                <div className='detalhe-meta-item'>
                                    <span className='detalhe-meta-label'>Código</span>
                                    <strong>{ideia.codigo}</strong>
                                </div>
                            </div>
                        </article>

                        {/* =====================================================
                            CARD COMENTARIOS
                        ===================================================== */} 
                        <section className='detalhe-comments-card'>
                            {/*------ Título ------*/}
                            <h2 className='detalhe-comments-title'>
                                Comentários{' '}
                                <span>({comentarios.length})</span>
                            </h2>

                            {/*------ Novo comentario ------*/}
                            <div className='detalhe-comment-form'>
                                <div className='detalhe-comment-avatar'>{(usuario?.nome || 'U').slice(0,2).toUpperCase()}</div>
                                <div className='detalhe-comment-form-content'>
                                    <textarea placeholder='Escreva um comentário...' value={texto} onChange={e => setTexto(e.target.value)} />
                                    <div className='detalhe-comment-button-wrapper'>
                                        <button type='button' className='detalhe-comment-button' onClick={comentar} disabled={!texto.trim()}>Comentar</button>
                                    </div>
                                </div>
                            </div>

                            {/*------ Divisor ------*/}
                            <div className='detalhe-comment-divider'></div>

                            {/*------ Comentários existentes ------*/}
                            <div className='detalhe-comments-list'>
                                {comentarios.map((comentario)=>(
                                    <article key={comentario.id} className='detalhe-comment'>
                                        <div className='detalhe-comment-avatar'>{(comentario.usuario?.nome || 'U').slice(0,2).toUpperCase()}</div>
                                        <div className='detalhe-comment-content'>
                                            <div className='detalhe-comment-header'>
                                                <strong>{comentario.usuario?.nome || 'Usuária'}</strong>
                                                <span>· {new Date(comentario.createdAt).toLocaleDateString('pt-BR')}</span>
                                            </div>

                                            <p>{comentario.texto}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                    </section>

                    {/* =====================================================
                            SIDEBAR
                    ===================================================== */} 

                    <aside className='detalhe-sidebar'>
                        {/* =====================================================
                            CARD VOTAÇÃO
                        ===================================================== */}

                        <div className='detalhe-vote-card'>
                            <span className='detalhe-vote-label'>Priorize esta ideia</span>
                            <strong className='detalhe-vote-number'>{ideia.votos}</strong>
                            <span className='detalhe-vote-info'>votos</span>
                            <button type='button' className='detalhe-vote-button' onClick={votar}>{meuVoto ? 'Retirar meu voto' : '▲ Votar nesta ideia'}</button>
                            <span className='detalhe-vote-note'>
                                Cada pessoa pode votar uma vez por ideia
                            </span>
                        </div>

                        {/* =====================================================
                            CARD INFORMACOES
                        ===================================================== */}
                        <div className='detalhe-info-card'>
                            <h2>Informações</h2>
                            <div className='detalhe-info-row'>
                                <span>Status</span>
                                <strong className='detalhe-info-status'>{ideia.status}</strong>
                            </div>

                            <div className='detalhe-info-row'>
                                <span>Categoria</span>
                                <strong>{ideia.categoria}</strong>
                            </div>

                            <div className='detalhe-info-row'>
                                <span>Público-alvo</span>
                                <strong>{ideia.publicoAlvo}</strong>
                            </div>

                            <div className='detalhe-info-row'>
                                <span>Autora</span>
                                <strong>{ideia.autora}</strong>
                            </div>

                            <div className='detalhe-info-row'>
                                <span>Cadastro</span>
                                <strong>{ideia.data}</strong>
                            </div>
                        </div>
                            
                    </aside>
                </div>
            </main>
        </div>
    )
}
export default Detalhe


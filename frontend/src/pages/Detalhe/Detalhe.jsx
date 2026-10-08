import {Link} from 'react-router-dom'
import './Detalhe.css'
import logoIdeiaLab from '../../assets/logo-ideiaLab.png'

// =====================================================
// DADOS FICTÍCIOS
// =====================================================
// Estes dados representam uma ideia cadastrada.
// Posteriormente, serão recebidos através da API.
// =====================================================

const ideia = {
  categoria: 'Oficinas',
  status: 'Aprovada',
  titulo: 'Oficina de introdução ao Scratch',
  autora: 'Marina Alves',
  iniciaisAutora: 'MA',
  data: '12/set/2026',
  descricao:
    'Atividade prática de 2 horas em que as participantes constroem seus primeiros jogos usando a programação em blocos do Scratch. A proposta é apresentar conceitos de lógica — sequência, repetição e eventos — de forma lúdica, com um projeto que cada menina leva pronto para casa. Ideal para o primeiro contato com programação.',
  publicoAlvo: '11 a 14 anos',
  codigo: '#IDL-0042',
  votos: 42,
}


// =====================================================
// COMENTÁRIOS FICTÍCIOS
// =====================================================

const comentarios = [
  {
    id: 1,
    iniciais: 'BC',
    nome: 'Bruna Costa',
    data: '13/set',
    cor: 'roxo',
    texto:
      'Ótima ideia! Podemos reservar o laboratório 2, que já tem o Scratch instalado nos computadores.',
  },

  {
    id: 2,
    iniciais: 'LS',
    nome: 'Letícia Souza',
    data: '13/set',
    cor: 'rosa',
    texto:
      'Sugiro dividir em duas turmas pequenas para dar atenção individual. Posso ajudar como monitora.',
  },

  {
    id: 3,
    iniciais: 'AP',
    nome: 'Ana Paula Reis',
    data: '14/set',
    cor: 'rosa-claro',
    texto:
      'Combina bem com o kit de lógica que propus — dá pra usar como aquecimento antes da oficina.',
  },
]

function Detalhe(){
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
                    <div className='detalhe-user-avatar'>MA</div>
                    <div className='detalhe-user-info'>
                        <span className='detalhe-user-name'>Marina Alves</span>
                        <span className='detalhe-user-role'>Voluntária</span>
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
                                <span>(8)</span>
                            </h2>

                            {/*------ Novo comentario ------*/}
                            <div className='detalhe-comment-form'>
                                <div className='detalhe-comment-avatar'>MA</div>
                                <div className='detalhe-comment-form-content'>
                                    <textarea placeholder='Escreva um comentário...' />
                                    <div className='detalhe-comment-button-wrapper'>
                                        <button type='button' className='detalhe-comment-button'>Comentar</button>
                                    </div>
                                </div>
                            </div>

                            {/*------ Divisor ------*/}
                            <div className='detalhe-comment-divider'></div>

                            {/*------ Comentários existentes ------*/}
                            <div className='detalhe-comments-list'>
                                {comentarios.map((comentario)=>(
                                    <article key={comentario.id} className='detalhe-comment'>
                                        <div className={`detalhe-comment-avatar ${comentario.cor}`}>{comentario.iniciais}</div>
                                        <div className='detalhe-comment-content'>
                                            <div className='detalhe-comment-header'>
                                                <strong>{comentario.nome}</strong>
                                                <span>· {comentario.data}</span>
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
                            <span className='detalhe-vote-info'>votos · 2º no ranking</span>
                            <button type='button' className='detalhe-vote-button'>▲ Votar nesta ideia</button>
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
                                <strong className='detalhe-info-status'>Aprovada</strong>
                            </div>

                            <div className='detalhe-info-row'>
                                <span>Categoria</span>
                                <strong>Oficinas</strong>
                            </div>

                            <div className='detalhe-info-row'>
                                <span>Público-alvo</span>
                                <strong>11-14 anos</strong>
                            </div>

                            <div className='detalhe-info-row'>
                                <span>Autora</span>
                                <strong>Marina Alves</strong>
                            </div>

                            <div className='detalhe-info-row'>
                                <span>Cadastro</span>
                                <strong>12/set/2026</strong>
                            </div>
                        </div>
                            
                    </aside>
                </div>
            </main>
        </div>
    )
}
export default Detalhe


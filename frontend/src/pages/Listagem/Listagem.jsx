import { Link } from 'react-router-dom'
import './Listagem.css'

import logoIdeiaLab from '../../assets/logo-ideialab.png'

// =====================================================
// DADOS FICTÍCIOS
// =====================================================
// Estes dados servem apenas para montar e testar a
// interface.
//
// Posteriormente, serão substituídos pelos dados reais
// recebidos através da API do backend.
// =====================================================

const ideiasExemplo = [
  {
    id: 1,
    votos: 42,
    categoria: 'Oficinas',
    status: 'Aprovada',
    titulo: 'Oficina de introdução ao Scratch',
    descricao:
      'Atividade prática para as participantes criarem seus primeiros jogos com blocos de programação.',
    autor: 'Marina Alves',
    data: '12/set',
    comentarios: 8,
  },

  {
    id: 2,
    votos: 37,
    categoria: 'Palestras',
    status: 'Em análise',
    titulo: 'Mulheres pioneiras na Computação',
    descricao:
      'Roda de conversa apresentando trajetórias de mulheres que marcaram a história da tecnologia.',
    autor: 'Bruna Costa',
    data: '11/set',
    comentarios: 5,
  },

  {
    id: 3,
    votos: 29,
    categoria: 'Dinâmicas',
    status: 'Em execução',
    titulo: 'Construindo um site em grupo',
    descricao:
      'Dinâmica colaborativa em que as meninas montam uma página simples usando HTML e CSS.',
    autor: 'Letícia Souza',
    data: '10/set',
    comentarios: 3,
  },

  {
    id: 4,
    votos: 21,
    categoria: 'Materiais',
    status: 'Em análise',
    titulo: 'Kit de materiais sobre lógica de programação',
    descricao:
      'Conjunto de cartas e desafios impressos para trabalhar lógica sem precisar de computador.',
    autor: 'Ana Paula Reis',
    data: '09/set',
    comentarios: 2,
  },
]


function Listagem() {
  return (
    <div className="listagem-page">

      {/* =====================================================
          CABEÇALHO
      ===================================================== */}

      <header className="listagem-header">

        {/* Logo + nome do sistema */}
        <div className="listagem-brand">

          <img
            src={logoIdeiaLab}
            alt="Logo IdeiaLab MD"
            className="listagem-logo"
          />

          <div className="listagem-brand-name">
            <span>IdeiaLab</span>
            <span className="listagem-brand-md"> MD</span>
          </div>

        </div>


        {/* =================================================
            NAVEGAÇÃO PRINCIPAL
        ================================================= */}

        <nav className="listagem-navigation">

          <Link
            to="/listagem"
            className="listagem-nav-link active"
          >
            Ideias
          </Link>

          <Link
            to="/nova-ideia"
            className="listagem-nav-link"
          >
            Nova ideia
          </Link>

          <Link
            to="/admin"
            className="listagem-nav-link"
          >
            Admin
          </Link>

        </nav>


        {/* =================================================
            USUÁRIO LOGADO
        ================================================= */}

        <div className="listagem-user">

          <div className="listagem-user-avatar">
            MA
          </div>

          <div className="listagem-user-info">

            <span className="listagem-user-name">
              Marina Alves
            </span>

            <span className="listagem-user-role">
              Voluntária
            </span>

          </div>

        </div>

      </header>


      {/* =====================================================
          CONTEÚDO PRINCIPAL
      ===================================================== */}

      <main className="listagem-content">


        {/* =================================================
            CABEÇALHO DA PÁGINA
        ================================================= */}

        <div className="listagem-page-header">

          <div className="listagem-page-title">

            <h1>
              Ideias
            </h1>

            <p>
              28 ideias cadastradas · 12 aprovadas
            </p>

          </div>


          {/* Botão Nova ideia */}
          <Link to='/nova-ideia' className='listagem=new-idea-button'>Nova ideia</Link>

        </div>


        {/* =================================================
            BUSCA, FILTROS E ORDENAÇÃO
        ================================================= */}

        <div className="listagem-filters">


          {/* Campo de busca */}

          <div className="listagem-search">

            <input
              type="text"
              placeholder="Buscar ideias..."
              aria-label="Buscar ideias"
            />

          </div>


          {/* Filtros por categoria */}

          <div className="listagem-category-filters">

            <button
              type="button"
              className="listagem-filter-button active"
            >
              Todas
            </button>

            <button
              type="button"
              className="listagem-filter-button"
            >
              Oficinas
            </button>

            <button
              type="button"
              className="listagem-filter-button"
            >
              Palestras
            </button>

            <button
              type="button"
              className="listagem-filter-button"
            >
              Dinâmicas
            </button>

          </div>


          {/* Divisor visual */}

          <div className="listagem-filter-divider" />


          {/* Ordenação */}

          <div className="listagem-sort">

            <span className="listagem-sort-label">
              Ordenar:
            </span>

            <button
              type="button"
              className="listagem-sort-button"
            >
              Mais votadas ▾
            </button>

          </div>

        </div>


        {/* =================================================
            ÁREA PRINCIPAL
            Lista de ideias + Sidebar
        ================================================= */}

        <div className="listagem-main-area">


          {/* =================================================
              LISTA DE IDEIAS
          ================================================= */}

          <section className="listagem-ideas-list">

            {ideiasExemplo.map((ideia) => (

              <article
                className="listagem-idea-card"
                key={ideia.id}
              >


                {/* Área de votação */}

                <div className="listagem-vote-box">

                  <span className="listagem-vote-arrow">
                    ▲
                  </span>

                  <span className="listagem-vote-number">
                    {ideia.votos}
                  </span>

                  <span className="listagem-vote-label">
                    votos
                  </span>

                </div>


                {/* Conteúdo da ideia */}

                <div className="listagem-idea-content">


                  {/* Categoria + status */}

                  <div className="listagem-idea-tags">

                    <span className="listagem-category-tag">
                      {ideia.categoria}
                    </span>

                    <span
                      className={`listagem-status-tag status-${ideia.status
                        .toLowerCase()
                        .replace(' ', '-')}`}
                    >
                      {ideia.status}
                    </span>

                  </div>


                  {/* Título */}

                  <Link to='/detalhe' className='listagem-idea-title'>{ideia.titulo}</Link>

                  {/* Descrição */}

                  <p className="listagem-idea-description">
                    {ideia.descricao}
                  </p>


                  {/* Informações adicionais */}

                  <div className="listagem-idea-footer">

                    <div className="listagem-idea-author">

                      <span>
                        Por&nbsp;
                      </span>

                      <strong>
                        {ideia.autor}
                      </strong>

                      <span>
                        {' · '}{ideia.data}
                      </span>

                    </div>


                    <span className="listagem-idea-comments">
                      💬 {ideia.comentarios} comentários
                    </span>

                  </div>

                </div>

              </article>

            ))}

          </section>


          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="listagem-sidebar">

            {/* Ranking */}

            <div className="listagem-sidebar-card">
              <div className='listagem-sidebar-header'>
                  <h3>
                    🏆 Ranking
                  </h3>
                  <span>Mais votadas</span>
              </div>

              <div className='listagem-ranking-list'>
                  <div className='listagem-ranking-item'>
                    <span className='listagem-ranking-position destaque'>1</span>
                    <span className='listagem-ranking-title'>Oficina de introdução ao Scratch</span>
                    <span className='listagem-ranking-votes'>42</span>
                  </div>

                  <div className='listagem-ranking-item'>
                    <span className='listagem-ranking-position destaque-2'>2</span>
                    <span className='listagem-ranking-title'>Mulheres pioneiras na Computação</span>
                    <span className='listagem-ranking-votes'>37</span>  
                  </div>

                  <div className='listagem-ranking-item'>
                    <span className='listagem-ranking-position destaque-3'>3</span>
                    <span className='listagem-ranking-title'>Construindo um site em grupo</span>
                    <span className='listagem-ranking-votes'>29</span>  
                  </div>

                  <div className='listagem-ranking-item'>
                    <span className='listagem-ranking-position destaque-4'>4</span>
                    <span className='listagem-ranking-title'>Kit materiais de lógica</span>
                    <span className='listagem-ranking-votes'>21</span>  
                  </div>
              </div>
            </div>


            {/* Status */}

            <div className="listagem-sidebar-card">
              <div className='listagem-status-header'>
                <h3>
                  Status das ideias
                </h3>
              </div>

              <div className='listagem-status-list'>
                <div className='listagem-status-item'>
                  <span className='status-analysis'>● Em análise</span>
                  <strong>9</strong>
                </div>

                <div className='listagem-status-item'>
                  <span className='status-approved'>● Aprovada</span>
                  <strong>12</strong>
                </div>

                <div className='listagem-status-item'>
                  <span className='status-running'>● Em execução</span>
                  <strong>4</strong>
                </div>

                <div className='listagem-status-item'>
                  <span className='status-completed'>● Concluída</span>
                  <strong>3</strong>
                </div>
              </div>
            </div>

          </aside>

        </div>

      </main>

    </div>
  )
}

export default Listagem
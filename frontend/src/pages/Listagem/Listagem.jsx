import { useEffect, useState } from 'react'
import { api, getUsuario } from '../../services/api'
import { Link } from 'react-router-dom'
import './Listagem.css'

import logoIdeiaLab from '../../assets/logo-ideialab.png'

function Listagem() {
  const [ideias, setIdeias] = useState([])
  const [ranking, setRanking] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoria, setCategoria] = useState('')
  const [busca, setBusca] = useState('')
  const [erro, setErro] = useState('')
  const usuario = getUsuario()
  useEffect(() => {
    Promise.all([api('/ideias/ranking'), api('/categorias')])
      .then(([itens, cats]) => { setIdeias(itens);setRanking(itens);setCategorias(cats) })
      .catch(e => setErro(e.message))
  }, [])
  const filtradas = ideias.filter(i => (!categoria || String(i.categoriaId) === categoria) && i.titulo.toLowerCase().includes(busca.toLowerCase()))

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
            {(usuario?.nome || 'U').slice(0,2).toUpperCase()}
          </div>

          <div className="listagem-user-info">

            <span className="listagem-user-name">
              {usuario?.nome || "Usuária"}
            </span>

            <span className="listagem-user-role">
              {usuario?.perfil === 'admin' ? 'Administração' : 'Voluntária'}
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
              {ideias.length} ideias cadastradas · {ideias.filter(i => i.status === 'Aprovada').length} aprovadas
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
              value={busca} onChange={e => setBusca(e.target.value)}
              value={busca} onChange={e => setBusca(e.target.value)}
            />

          </div>


          {/* Filtros por categoria */}

          <div className="listagem-category-filters">
            <button type="button" className={`listagem-filter-button ${!categoria ? 'active' : ''}`} onClick={() => setCategoria('')}>Todas</button>
            {categorias.map(c => <button key={c.id} type="button" className={`listagem-filter-button ${categoria === String(c.id) ? 'active' : ''}`} onClick={() => setCategoria(String(c.id))}>{c.nome}</button>)}
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

            {erro && <p role="alert" style={{color:'crimson'}}>{erro}</p>}
            {filtradas.map((ideia) => (

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
                      {ideia.categoria?.nome || 'Sem categoria'}
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

                  <Link to={`/detalhe/${ideia.id}`} className='listagem-idea-title'>{ideia.titulo}</Link>

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
                        {ideia.autora?.nome || 'Usuária'}
                      </strong>

                      <span>
                        {' · '}{new Date(ideia.createdAt).toLocaleDateString('pt-BR')}
                      </span>

                    </div>


                    <span className="listagem-idea-comments">
                      💬 Ver comentários
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
                {ranking.slice(0,4).map((i, index) => (
                  <div key={i.id} className='listagem-ranking-item'>
                    <span className='listagem-ranking-position'>{index + 1}</span>
                    <Link to={`/detalhe/${i.id}`} className='listagem-ranking-title'>{i.titulo}</Link>
                    <span className='listagem-ranking-votes'>{i.votos}</span>
                  </div>
                ))}
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
                  <strong>{ideias.filter(i => i.status === 'Em análise').length}</strong>
                </div>

                <div className='listagem-status-item'>
                  <span className='status-approved'>● Aprovada</span>
                  <strong>{ideias.filter(i => i.status === 'Aprovada').length}</strong>
                </div>

                <div className='listagem-status-item'>
                  <span className='status-running'>● Em execução</span>
                  <strong>{ideias.filter(i => i.status === 'Em execução').length}</strong>
                </div>

                <div className='listagem-status-item'>
                  <span className='status-completed'>● Concluída</span>
                  <strong>{ideias.filter(i => i.status === 'Concluída').length}</strong>
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

import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import './Admin.css'
import logoIdeiaLab from '../../assets/logo-ideialab.png'

// Dados temporários das ideias exibidas no painel.
const ideiasIniciais = [
  {
    id: 1,
    titulo: 'Oficina de introdução ao Scratch',
    autora: 'Marina Alves',
    categoria: 'Oficinas',
    votos: 42,
    status: 'Aprovada',
  },
  {
    id: 2,
    titulo: 'Mulheres pioneiras na Computação',
    autora: 'Bruna Costa',
    categoria: 'Palestras',
    votos: 37,
    status: 'Em análise',
  },
  {
    id: 3,
    titulo: 'Construindo um site em grupo',
    autora: 'Letícia Souza',
    categoria: 'Dinâmicas',
    votos: 29,
    status: 'Em execução',
  },
  {
    id: 4,
    titulo: 'Kit de materiais de lógica',
    autora: 'Ana Paula Reis',
    categoria: 'Materiais',
    votos: 21,
    status: 'Em análise',
  },
  {
    id: 5,
    titulo: 'Bate-papo com profissionais de TI',
    autora: 'Carla Dias',
    categoria: 'Palestras',
    votos: 18,
    status: 'Concluída',
  },
]

// Dados temporários das usuárias.
const usuarias = [
  { id: 1, iniciais: 'CS', nome: 'Coordenação MD', perfil: 'Admin' },
  { id: 2, iniciais: 'MA', nome: 'Marina Alves', perfil: 'Voluntária' },
  { id: 3, iniciais: 'BC', nome: 'Bruna Costa', perfil: 'Voluntária' },
]

// Classes CSS para representar visualmente cada status.
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
  const [ideias, setIdeias] = useState(ideiasIniciais)
  const [busca, setBusca] = useState('')

  // Filtra a lista conforme o título ou a autora digitada.
  const ideiasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase()

    if (!termo) return ideias

    return ideias.filter((ideia) =>
      `${ideia.titulo} ${ideia.autora}`
        .toLowerCase()
        .includes(termo)
    )
  }, [ideias, busca])

  // Permite trocar o status de uma ideia.
  function alterarStatus(id) {
    const statusDisponiveis = [
      'Em análise',
      'Aprovada',
      'Em execução',
      'Concluída',
    ]

    setIdeias((listaAtual) =>
      listaAtual.map((ideia) => {
        if (ideia.id !== id) return ideia

        const indiceAtual = statusDisponiveis.indexOf(ideia.status)
        const proximoIndice =
          (indiceAtual + 1) % statusDisponiveis.length

        return {
          ...ideia,
          status: statusDisponiveis[proximoIndice],
        }
      })
    )
  }

  // Mantém os números do resumo coerentes com os dados exibidos.
  const totalIdeias = 28
  const aguardandoAnalise = 9
  const usuariasAtivas = 14
  const totalCategorias = 4

  return (
    <div className="admin-page">
      <header className="admin-header">
        <Link to="/listagem" className="admin-brand">
          <img
            src={logoIdeiaLab}
            alt="Logo IdeiaLab MD"
            className="admin-logo"
          />

          <span className="admin-brand-name">
            IdeiaLab <span>MD</span>
          </span>
        </Link>

        <nav className="admin-navigation">
          <Link to="/listagem" className="admin-nav-link">
            Ideias
          </Link>

          <Link to="/nova-ideia" className="admin-nav-link">
            Nova ideia
          </Link>

          <Link
            to="/admin"
            className="admin-nav-link admin-nav-active"
          >
            Admin
          </Link>
        </nav>

        <div className="admin-user">
          <div className="admin-user-avatar">CS</div>

          <div className="admin-user-info">
            <span className="admin-user-name">Coordenação MD</span>
            <span className="admin-user-role">Administradora</span>
          </div>
        </div>
      </header>

      <main className="admin-content">
        <section className="admin-heading">
          <h1>Painel administrativo</h1>
          <p>
            Gerencie ideias, categorias e usuários do projeto.
          </p>
        </section>

        <section className="admin-summary">
          <article className="admin-summary-card">
            <p>Total de ideias</p>
            <strong>{totalIdeias}</strong>
          </article>

          <article className="admin-summary-card">
            <p>Aguardando análise</p>
            <strong className="admin-number-warning">
              {aguardandoAnalise}
            </strong>
          </article>

          <article className="admin-summary-card">
            <p>Usuárias ativas</p>
            <strong className="admin-number-purple">
              {usuariasAtivas}
            </strong>
          </article>

          <article className="admin-summary-card">
            <p>Categorias</p>
            <strong className="admin-number-pink">
              {totalCategorias}
            </strong>
          </article>
        </section>

        <section className="admin-management">
          <div className="admin-ideas-panel">
            <div className="admin-panel-heading">
              <h2>Gerenciar ideias</h2>

              <input
                type="search"
                className="admin-search"
                placeholder="Buscar..."
                aria-label="Buscar ideias por título ou autora"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
              />
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Ideia</th>
                    <th>Categoria</th>
                    <th>Votos</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {ideiasFiltradas.map((ideia) => (
                    <tr key={ideia.id}>
                      <td>
                        <div className="admin-idea-title">
                          {ideia.titulo}
                        </div>
                        <div className="admin-idea-author">
                          {ideia.autora}
                        </div>
                      </td>

                      <td>{ideia.categoria}</td>

                      <td className="admin-votes">
                        {ideia.votos}
                      </td>

                      <td>
                        <button
                          type="button"
                          className={`admin-status ${obterClasseStatus(ideia.status)}`}
                          onClick={() => alterarStatus(ideia.id)}
                          title="Clique para avançar para o próximo status"
                        >
                          {ideia.status} <span>▾</span>
                        </button>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="admin-edit-button"
                          onClick={() =>
                            window.alert(
                              `A edição da ideia "${ideia.titulo}" será implementada na próxima etapa.`
                            )
                          }
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}

                  {ideiasFiltradas.length === 0 && (
                    <tr>
                      <td colSpan={5} className="admin-empty">
                        Nenhuma ideia encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="admin-sidebar">
            <section className="admin-side-panel">
              <div className="admin-side-heading">
                <h2>Categorias</h2>
                <button
                  type="button"
                  className="admin-new-category"
                  onClick={() =>
                    window.alert(
                      'O cadastro de categorias será implementado na próxima etapa.'
                    )
                  }
                >
                  + Nova
                </button>
              </div>

              <ul className="admin-category-list">
                {['Oficinas', 'Palestras', 'Dinâmicas', 'Materiais'].map(
                  (categoria) => (
                    <li key={categoria}>
                      <span>{categoria}</span>
                      <div className="admin-category-actions">
                        <button
                          type="button"
                          onClick={() =>
                            window.alert(`Editar categoria: ${categoria}`)
                          }
                        >
                          editar
                        </button>
                        <span>·</span>
                        <button
                          type="button"
                          onClick={() =>
                            window.alert(
                              `A exclusão de "${categoria}" será implementada depois.`
                            )
                          }
                        >
                          excluir
                        </button>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </section>

            <section className="admin-side-panel">
              <h2>Usuárias</h2>

              <ul className="admin-user-list">
                {usuarias.map((usuaria, index) => (
                  <li key={usuaria.id}>
                    <div
                      className={`admin-list-avatar admin-avatar-${index + 1}`}
                    >
                      {usuaria.iniciais}
                    </div>

                    <span className="admin-list-user-name">
                      {usuaria.nome}
                    </span>

                    <span
                      className={`admin-role-badge ${
                        usuaria.perfil === 'Admin'
                          ? 'admin-role-admin'
                          : ''
                      }`}
                    >
                      {usuaria.perfil}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </section>
      </main>
    </div>
  )
}

export default Admin
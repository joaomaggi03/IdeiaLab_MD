
import { Link, useNavigate } from 'react-router-dom'
import './Perfil.css'

import logoIdeiaLab from '../../assets/logo-ideialab.png'

function Perfil() {
  const navigate = useNavigate()

  // Cancela a edição e retorna para a listagem.
  function cancelarAlteracoes() {
    navigate('/listagem')
  }

  // Por enquanto, impede o envio e o recarregamento da página.
  // O salvamento real será implementado posteriormente.
  function salvarAlteracoes(event) {
    event.preventDefault()
  }

  return (
    <div className="perfil-page">
      {/* Cabeçalho principal */}
      <header className="perfil-header">
        <Link to="/listagem" className="perfil-brand">
          <img
            src={logoIdeiaLab}
            alt="Logo IdeiaLab MD"
            className="perfil-logo"
          />

          <div className="perfil-brand-name">
            <span>IdeiaLab</span>
            <span className="perfil-brand-md"> MD</span>
          </div>
        </Link>

        <nav className="perfil-navigation">
          <Link to="/listagem" className="perfil-nav-link">
            Ideias
          </Link>

          <Link to="/nova-ideia" className="perfil-nav-link">
            Nova ideia
          </Link>

          <Link to="/admin" className="perfil-nav-link">
            Admin
          </Link>
        </nav>

        <div className="perfil-user">
          <div className="perfil-user-avatar">MA</div>

          <div className="perfil-user-info">
            <span className="perfil-user-name">Marina Alves</span>
            <span className="perfil-user-role">Voluntária</span>
          </div>
        </div>
      </header>

      {/* Conteúdo da página */}
      <main className="perfil-content">
        <div className="perfil-container">
          <section className="perfil-heading">
            <h1>Meus dados</h1>
            <p>Atualize suas informações de conta.</p>
          </section>

          <form
            className="perfil-form"
            onSubmit={salvarAlteracoes}
          >
            {/* Foto e nome do usuário */}
            <div className="perfil-photo-section">
              <div className="perfil-large-avatar">MA</div>

              <div className="perfil-photo-info">
                <span className="perfil-photo-name">
                  Marina Alves
                </span>

                <button
                  type="button"
                  className="perfil-change-photo"
                  onClick={() => {}}
                >
                  Alterar foto
                </button>
              </div>
            </div>

            <div className="perfil-divider" />

            {/* Nome e e-mail */}
            <div className="perfil-fields-row">
              <div className="perfil-field">
                <label htmlFor="perfil-nome">
                  Nome completo
                </label>

                <input
                  id="perfil-nome"
                  name="nome"
                  type="text"
                  defaultValue="Marina Alves"
                  required
                />
              </div>

              <div className="perfil-field">
                <label htmlFor="perfil-email">E-mail</label>

                <input
                  id="perfil-email"
                  name="email"
                  type="email"
                  defaultValue="marina.alves@email.com"
                  required
                />
              </div>
            </div>

            {/* Perfil de acesso */}
            <div className="perfil-field">
              <label>Perfil de acesso</label>

              <div className="perfil-access-box">
                <span className="perfil-access-badge">
                  Voluntária
                </span>

                <span className="perfil-access-description">
                  Definido pela coordenação
                </span>
              </div>
            </div>

            <div className="perfil-divider" />

            {/* Alteração de senha */}
            <h2 className="perfil-password-title">
              Alterar senha
            </h2>

            <div className="perfil-fields-row">
              <div className="perfil-field">
                <label htmlFor="senha-atual">
                  Senha atual
                </label>

                <input
                  id="senha-atual"
                  name="senhaAtual"
                  type="password"
                  placeholder="••••••••"
                />
              </div>

              <div className="perfil-field">
                <label htmlFor="nova-senha">Nova senha</label>

                <input
                  id="nova-senha"
                  name="novaSenha"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Ações do formulário */}
            <div className="perfil-form-actions">
              <button
                type="button"
                className="perfil-cancel-button"
                onClick={cancelarAlteracoes}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="perfil-save-button"
              >
                Salvar alterações
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Perfil
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro'
import Listagem from './pages/Listagem/Listagem'
import Detalhe from './pages/Detalhe/Detalhe'
import NovaIdeia from './pages/NovaIdeia/NovaIdeia'
import Perfil from './pages/Perfil/Perfil'
import Admin from './pages/Admin/Admin'

function App() {
  return (
    <Routes>
      {/*Tela de login*/}
      <Route path="/login" element={<Login />} />
      {/*Tela de cadastro*/}
      <Route path='/cadastro' element={<Cadastro />}/>
      {/* Redireciona a página inicial para o Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/*Tela de listagem*/}
      <Route path='/listagem' element={<Listagem />}/>
      {/*Tela de detalhe*/}
      <Route path='/detalhe' element={<Detalhe />}/>
      {/*Tela de Nova Ideia*/}
      <Route path='/nova-ideia' element={<NovaIdeia />}/>
      {/*Tela de Perfil*/}
      <Route path='/perfil' element={<Perfil />}/>
      {/*Tela de Admin*/}
      <Route path='/admin' element={<Admin />}/>
    </Routes>
  )
}

export default App
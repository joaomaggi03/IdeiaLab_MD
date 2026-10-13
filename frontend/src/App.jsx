import { Navigate, Route, Routes } from 'react-router-dom'

import { RotaProtegida } from './services/auth'

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
      <Route path='/listagem' element={<RotaProtegida><Listagem /></RotaProtegida>}/>
      {/*Tela de detalhe*/}
      <Route path='/detalhe/:id' element={<RotaProtegida><Detalhe /></RotaProtegida>}/>
      {/*Tela de Nova Ideia*/}
      <Route path='/nova-ideia' element={<RotaProtegida><NovaIdeia /></RotaProtegida>}/>
      {/*Tela de Perfil*/}
      <Route path='/perfil' element={<RotaProtegida><Perfil /></RotaProtegida>}/>
      {/*Tela de Admin*/}
      <Route path='/admin' element={<RotaProtegida admin><Admin /></RotaProtegida>}/>
    </Routes>
  )
}

export default App
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro'
import Listagem from './pages/Listagem/Listagem'
import Detalhe from './pages/Detalhe/Detalhe'

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
    </Routes>
  )
}

export default App
import { Navigate } from 'react-router-dom'
import { getToken, getUsuario } from './api'
export function RotaProtegida({ children, admin = false }) {
  if (!getToken()) return <Navigate to="/login" replace />
  if (admin && getUsuario()?.perfil !== 'admin') return <Navigate to="/listagem" replace />
  return children
}

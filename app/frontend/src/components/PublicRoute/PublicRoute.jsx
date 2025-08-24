import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children, isAuth, redirectTo = '/home' }) => {
  if (isAuth) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}

export default PublicRoute
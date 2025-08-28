import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './components/context/context'
import Layout from './components/layout/layout'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import HomePage from './pages/HomePage/HomePage'
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import BookingPage from './pages/BookingPage/BookingPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import PublicRoute from './components/PublicRoute/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
function App() {
  const {isAuth} = useAuth()
  return (
    <div>
      <Layout >
        <Routes>
          <Route path='/' element={<Navigate to='/home' replace/>}/>
          <Route path='/home' element={<HomePage />}/>
          <Route path='/login' element={
            <PublicRoute isAuth={isAuth} redirectTo='/home'>
              <LoginPage />
            </PublicRoute>
          }/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/movie/:slug/:id' element={<MovieDetailPage />}/>
          <Route path='/profile' element={
            <ProtectedRoute isAuth={isAuth} redirectTo='/home'>
              <ProfilePage />
            </ProtectedRoute>
          }/>
          <Route path='/booking' element={<BookingPage />}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Routes>
      </Layout>
    </div>
  )
}

export default App

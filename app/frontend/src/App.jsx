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
import AdminPanel from './pages/AdminPage/AdminPage'
import RedirectPage from './pages/RedirectPage/RedirectPage'
function App() {
  const {isAuth, user, loading} = useAuth()
  // console.log(Boolean(user))
  console.log(loading)
  return (
    <div>
      <Layout >
        <Routes>
          <Route path='/' element={<RedirectPage />}/>
          <Route path='/admin' element={
            <ProtectedRoute isAuth={isAuth} loading={loading} redirectTo='/home'>
              {user?.role == 'admin' ? <AdminPanel /> : <NotFoundPage />}
            </ProtectedRoute>
          }/>
          <Route path='/home' element={<HomePage />}/>
          <Route path='/login' element={
            <PublicRoute isAuth={isAuth} redirectTo='/'>
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
          <Route path='/booking/:slug/:id' element={<BookingPage />}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Routes>
      </Layout>
    </div>
  )
}

export default App

import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/layout'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import HomePage from './pages/HomePage/HomePage'
import MovileDetailPage from './pages/MovieDetailPage/MovileDetailPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import BookingPage from './pages/BookingPage/BookingPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
function App() {
  return (
    <div>
      <Layout >
        <Routes>
          <Route path='/' element={<Navigate to='/home' replace/>}/>
          <Route path='/home' element={<HomePage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/movie/:id' element={<MovileDetailPage />}/>
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/booking' element={<BookingPage />}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Routes>
      </Layout>
    </div>
  )
}

export default App

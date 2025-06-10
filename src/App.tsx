import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import UploadingImage from './pages/UploadingImage'
import LandingPage from './pages/LandingPage'
import Products from './pages/Products'
import Login from './pages/Login'
import SignupPage from './pages/SignupPage'
import ErrorPage from './pages/ErrorPage'
import UserProfile from './pages/UserProfile'
import DoctorPage from './pages/DoctorPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route index element={<LandingPage />} />
            <Route path='upload' element={<UploadingImage />} />
            <Route path='products' element={<Products />} />
            <Route path='profile' element={<UserProfile />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignupPage />} />
            <Route path='doctor' element={<DoctorPage />} />
            <Route path='*' element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { Button } from './components/ui/button'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import UploadingImage from './pages/UploadingImage'
import LandingPage from './pages/LandingPage'
import Products from './pages/Products'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route index element={<LandingPage />} />
            <Route path='upload' element={<UploadingImage />} />
            <Route path='products' element={<Products />} />
            <Route path='*' element={<div>404 Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

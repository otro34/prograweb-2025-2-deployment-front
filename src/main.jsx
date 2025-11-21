import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AboutUs from './routes/AboutUsPage.jsx'
import Login from './routes/LoginPage.jsx'
import ProductosPage from './routes/ProductosPage.jsx'
import TiendasPage from './routes/TiendasPage.jsx'
import { UserProvider } from './context/UserContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />

  },
  {
    path: "inicio",
    element: <App />
  },
  {
    path: "acerca",
    element: <AboutUs />
  },
  {
    path:"/mantenimiento/productos",
    element: <ProductosPage />
  },
  {
    path:"/mantenimiento/tiendas",
    element: <TiendasPage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  </StrictMode>,
)

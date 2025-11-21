
import './App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import GameCard from './components/GameCard/GameCard';
import productosApi from './api/productosApi.js'

function App() {

  const [ textoBusqueda, setTextoBusqueda ] = useState('')
  const [ productos, setProductos ] = useState([])
  const [ user, setUser ] = useState({})

  const handleOnLoad = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    if (usuario?.token) {
          const rawProducts = await productosApi.findAll(usuario.token)
          setProductos(rawProducts)
    }

  }

  const navigate = useNavigate()

  useEffect(() => {
    const autenticar = () => {
      const usuario = JSON.parse(localStorage.getItem("usuario"))

      if (!usuario) {
        console.log("No está autenticado!")
        navigate("/")
      }
    }

    autenticar()
    handleOnLoad()
  },[])

  useEffect(() => {
    if (textoBusqueda === '')
      handleOnLoad()
    else if (textoBusqueda.length > 3)
      handleBuscar()
  },[textoBusqueda])

  const handleCerrarSesion = () => {
    localStorage.removeItem("usuario")
    navigate("/")
  }


  const handleBuscar = async () => {
    const rawProducts = await productosApi.findAll()
    const filtrados = 
    rawProducts.filter((item) => item.titulo.toLowerCase().includes(textoBusqueda.toLowerCase()));
    setProductos(filtrados)
  }
  
  return (
  <>
  <header>
  <h1>Venta de Garage</h1>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad veniam quaerat corrupti dolores 
      nesciunt rem eaque quidem, consectetur aliquam ratione veritatis accusantium delectus 
      officia harum nisi maiores dolorum, quod numquam?</p>
  </header>
  <nav>
    <a href="/acerca">Acerca de mi</a> 
     - <a href="/mantenimiento/productos">Mantenimiento de productos</a>
     - <a href="/mantenimiento/tiendas">Mantenimiento de tiendas</a>
  </nav>
  <main>
    <section>
      <input 
        type="text" 
        placeholder='Busca por nombre...'
        value={textoBusqueda}
        onChange={(event) => setTextoBusqueda(event.target.value)}
        />
      <button onClick={() => handleBuscar()}>BUSCAR</button>
    </section>
    <section className="sectionGames" >
      {
        productos.length > 0 ? productos.map((item) => {
          return (
            <GameCard {...item} />
          )
        }) : <h2>NO HAY RESULTADOS.</h2>
      }
    </section>
    <footer>
      <button onClick={() => handleCerrarSesion()}>Cerrar Sesion</button>
    </footer>
  </main>
  
  </>
  
  )
}

export default App

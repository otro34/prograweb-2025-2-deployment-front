import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormularioProducto from "./FormularioProducto/FormularioProducto"
import './Productos.css'
import productosApi from '../../api/productosApi'

const Productos = () => {

    const [ showForm, setShowForm ] = useState(false)
    const [ productos, setProductos ] = useState([])
    const [ productoSeleccionado, setProductoSeleccionado] = useState(null)

    const navigate = useNavigate()

    const handleOnLoad = async () => {
        const usuario = JSON.parse(localStorage.getItem("usuario"))

        const productosOriginales = await productosApi.findAll(usuario.token)
        setProductos(productosOriginales)
    }

    useEffect(() => {
        handleOnLoad()
    }, [])

    const handleSubmit = async (producto) => {
        if (producto.id == 0) {
            await productosApi.create(producto)
            alert('Producto Agregado!')    
        } else {
            await productosApi.update(producto)
            alert('Producto modificado!')
        }
        handleOnLoad()
        setShowForm(!showForm)
    }

    const handleRegresar = () => {
        navigate("/inicio")
    }

    const handleModificar = (producto) => {
        setShowForm(!showForm)
        setProductoSeleccionado(producto);
    }

    return (
        <>
            <h1>Mantenimiento de Productos</h1>

            <button onClick={() => setShowForm(!showForm)}>+ Nuevo Producto</button>
            <button onClick={() => handleRegresar() }>Regresar</button>
            <br/><br/>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Categoria</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map((p) => {
                            return(
                                <tr>
                                    <td>{p.id}</td>
                                    <td>{p.titulo}</td>
                                    <td>{p.descripcion}</td>
                                    <td>{p.precio}</td>
                                    <td>{p.categoria}</td>
                                    <td><button onClick={() => handleModificar(p)}>Modificar</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {showForm && <FormularioProducto onSubmit={handleSubmit} productoSeleccionado={productoSeleccionado} />}
        </>
        

    )
}

export default Productos
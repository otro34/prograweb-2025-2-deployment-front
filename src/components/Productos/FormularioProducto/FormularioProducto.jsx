import { useState, useEffect } from 'react'
import './FormularioProducto.css'

const FormularioProducto = ({ onSubmit, productoSeleccionado }) => {

    const productoDefault = {
        id: 0,
        titulo: "",
        descripcion: "",
        precio: 0,
        categoria: "",
        img:""
    }

    const [ producto, setProducto ] = useState(productoDefault)

    useEffect(() => {
        if (productoSeleccionado) {
            setProducto(productoSeleccionado)
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(producto)
    }

    return ( 
        <form>
            <h2>{productoSeleccionado ? "Modificar Producto" : "Agregar Producto"}</h2>
            <label>Titulo</label>
            <br></br>
            <input type="text" value={producto.titulo} className='cajaTextoFormulario' 
                onChange={(e) => setProducto({...producto, titulo: e.target.value})}/>
            <br></br>
            <label>Descripcion</label>
            <br></br>
            <input type="text" value={producto.descripcion} className='cajaTextoFormulario' 
                onChange={(e) => setProducto({...producto, descripcion: e.target.value})}/>
            <br></br>
            <label>Precio</label>
            <br></br>
            <input type="text" value={producto.precio} className='cajaTextoFormulario' 
                onChange={(e) => setProducto({...producto, precio: e.target.value})}/>
            <br></br>
            <label>Categoria</label>
            <br></br>
            <input type="text" value={producto.categoria} className='cajaTextoFormulario' 
                onChange={(e) => setProducto({...producto, categoria: e.target.value})}/>
            <br></br>
            <label>URL de Imagen</label>
            <br></br>
            <input type="text" value={producto.img} className='cajaTextoFormulario' 
                onChange={(e) => setProducto({...producto, img: e.target.value})}/>
            <br/><br/>
            <button onClick={(e)=>handleSubmit(e)}>GUARDAR</button>
        </form>
    )
}

export default FormularioProducto
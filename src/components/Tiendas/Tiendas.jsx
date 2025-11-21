import { useState, useEffect } from 'react'
import tiendasApi from '../../api/tiendaApi.js';

const Tiendas = () => {

    const [tiendas, setTiendas] = useState([])

    const handleOnLoad = async () =>  {
        const rawTiendas = await tiendasApi.findAll();
        setTiendas(rawTiendas);
    }   

    useEffect(() => {
        handleOnLoad()
    },[])

 return (
    <>
        <h2>Listado de Tiendas</h2>
        <table>
            <thead>
                <th>ID</th>
                <th>Nombre de Tienda</th>
                <th>Dirección</th>
            </thead>
            <tbody>
                {tiendas.map(item => {
                    return <tr>
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.direccion}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </>
 )
}

export default Tiendas
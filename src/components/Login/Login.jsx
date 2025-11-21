import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext';

const Login = () => {

    const navigate = useNavigate()

    const [ usuario, setUsuario ] = useState('')
    const [ password, setPassword ] = useState('')
    const { user, login } = useUser()

    const handleLogin = async () => {
        
        if (await login(usuario, password)) {
            navigate('/inicio')
        }
        else
            alert('Usuario o password incorrecto!')
    }

    return (
        <>
            <h1>Venta de Garage</h1>
            <h2>Inicio de Sesion</h2>
            <label>Usuario:</label>
            <br/>
            <input type="text" id="usuario" value={usuario} 
                onChange={(e) => setUsuario(e.target.value)}/>
            <br/>
            <label>Password:</label>
            <br/>
            <input type="password" id="password" value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            <button onClick={() => handleLogin()}>INGRESAR</button>
        
        </>
    )
}

export default Login;
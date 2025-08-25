import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Loader from "../../components/loader/loader"

const LoginPage = ({setIsAuth})=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch("http://localhost:3000/users/login", 
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            )
            const json = await response.json()
            if(!response.ok){
                setError(json.message)
                return
            }
            console.log("Login exitoso");
            localStorage.setItem('token', json.token);
            setIsAuth(true)
        } catch (err) {
            console.log(err)
            setError("No se pudo conectar al servidor")
        }
        finally{
            setLoading(false)
        }
    }

    return(
        <div className="login-form-container">
            <h2>Login form</h2>
            <form action="" method="post">
                <label htmlFor="email-login">Email</label>
                <input type="email" name="email" id="email-login" value={email} onChange={(e)=>setEmail(e.target.value)} required/>

                <label htmlFor="password-login">Password</label>
                <input type="password" name="password" id="password-login" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                {loading ? <Loader /> : <button onClick={(e)=>handleSubmit(e)}>Submit</button>}
                {error && <p className="error">{error}</p>}
            </form>
            <div>
                <p>¿No estas registrado? <Link to="/register">Registrate aqui</Link></p>
            </div>
        </div>
    )
}

export default LoginPage
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Loader from "../../components/loader/loader"
import { useAuth } from "../../components/context/context"

const LoginPage = ()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { Login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        
        const result = await Login({email, password})

        if(result.success){
            console.log("logueado")
            return
        }else{
            setError(result.message)
        }
        setLoading(false)
        return null
    }

    return(
        <div className="login-form-container">
            <h2>Login form</h2>
            <form action="" method="post">
                <label htmlFor="email-login">Email</label>
                <input type="email" name="email" id="email-login" value={email} onChange={(e)=>setEmail(e.target.value)} required/>

                <label htmlFor="password-login">Password</label>
                <input type="password" name="password" id="password-login" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                {loading ? 
                    <div className="loader-container">
                        <Loader /> 
                    </div>
                : <button onClick={(e)=>handleSubmit(e)}>Submit</button>}
                {error && <p className="error">{error}</p>}
            </form>
            <div>
                <p>¿No estas registrado? <Link to="/register">Registrate aqui</Link></p>
            </div>
        </div>
    )
}

export default LoginPage
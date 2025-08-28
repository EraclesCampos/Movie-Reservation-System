import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Loader from "../../components/loader/loader"

const RegisterPage = ({setIsAuth})=>{
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch("http://localhost:3000/users/register", 
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
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
            console.log("Registro exitoso")
            navigate("/login")
        } catch (err) {
            console.log(err)
            setError("No se pudo conectar al servidor")
        }
        finally{
            setLoading(false)
        }
    }

    return(
        <div className="register-form-container">
            <h2>Register from</h2>
            <form action="" method="post">
                <label htmlFor="name-register">Username</label>
                <input type="text" name="name" id="name-register" value={name} onChange={(e)=>setName(e.target.value)} required/>

                <label htmlFor="email-register">Email</label>
                <input type="email" name="email" id="email-register" value={email} onChange={(e)=>setEmail(e.target.value)} required/>

                <label htmlFor="password-register">Password</label>
                <input type="password" name="password" id="password-register" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                {loading ? 
                    <div className="loader-container">
                        <Loader />
                    </div>
                 : <button onClick={(e)=>handleSubmit(e)}>Submit</button>}
                {error && <p className="error">{error}</p>}
            </form>
            <div>
                <p>¿Ya estas registrado? <Link to="/login">Inicia sesion aqui</Link></p>
            </div>
        </div>
    )
}

export default RegisterPage
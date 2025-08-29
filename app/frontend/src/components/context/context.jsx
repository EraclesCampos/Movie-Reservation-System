import { createContext, useState, useEffect, useContext } from "react";

export const AppContext = createContext()

export const useAuth = () => {
    const context = useContext(AppContext)
    
    return context
}

export const AppProvider = ({children})=>{
    // const [isAuth, setIsAuth] = useState(localStorage.getItem('token') || false)
    const [user, setUser] = useState(localStorage.getItem('user') || null)
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        verifyUser()
    },[])
    
    const verifyUser = ()=>{
        const tokenSaved = localStorage.getItem("token")
        const userSaved = JSON.parse(localStorage.getItem("user"))

        if(tokenSaved && userSaved){
            setUser(userSaved)
        }
        setLoading(false)
    }
    const Login = async ({email, password})=>{
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
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message || 'Error en el login')
            }

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))

            setUser(data.user)

            return{success: true, user: data.user}
        } catch (err) {
            return{
                success: false,
                message: err.message || "Error en el login"
            }
        }finally{
            setLoading(false)
        }
    }

    const Logout = ()=>{
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

    const value = {
        user,
        Login,
        Logout,
        isAuth: Boolean(user),
        loading
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
import { AppContext } from "../../components/context/context"
import { useContext } from "react"

const ProfilePage = ()=>{
    const {isAuth, setIsAuth} = useContext(AppContext)

    const CerrarSesion = ()=>{
        localStorage.removeItem("token")
        setIsAuth(false)
    }
    return(
        <>
            <h1>Profile Page</h1>
            <button onClick={CerrarSesion}>Cerrar sesion</button>
        </>
    )
}
export default ProfilePage
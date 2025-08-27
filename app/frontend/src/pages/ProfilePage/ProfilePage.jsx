import { useAuth } from "../../components/context/context"

const ProfilePage = ()=>{
    const {Logout} = useAuth()

    const CerrarSesion = ()=>{
        Logout()
    }
    return(
        <>
            <h1>Profile Page</h1>
            <button onClick={CerrarSesion}>Cerrar sesion</button>
        </>
    )
}
export default ProfilePage
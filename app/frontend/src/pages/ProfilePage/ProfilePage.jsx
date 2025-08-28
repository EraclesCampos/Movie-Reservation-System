import { useAuth } from "../../components/context/context"

const ProfilePage = ()=>{
    const {Logout, user} = useAuth()

    const CerrarSesion = ()=>{
        Logout()
    }
    return(
        <>
            <h1>Profile Page</h1>
            <div className="user-data-container">
                <ul>
                    <li>{user.name}</li>
                    <li>{user.email}</li>
                    <li>{user.role}</li>
                </ul>
            </div>
            <button onClick={CerrarSesion}>Cerrar sesion</button>
        </>
    )
}
export default ProfilePage
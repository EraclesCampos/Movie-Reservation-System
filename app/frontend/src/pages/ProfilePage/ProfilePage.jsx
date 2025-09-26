import { useAuth } from "../../components/context/context"
import { Link } from "react-router-dom"
import "./ProfilePage.css"

const ProfilePage = () => {
    const { Logout, user } = useAuth()
    const isAdmin = user.role === "admin"

    return(
        <div className="profile-container">
            <div className="profile-header">
                <h1>Mi Perfil</h1>
                <div className="user-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                </div>
            </div>

            <div className="profile-content">
                <section className="user-info-card">
                    <h2>Informacion Personal</h2>
                    <div className="user-details">
                        <div className="detail-item">
                            <span className="label">Nombre:</span>
                            <span className="value">{user.name}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Email:</span>
                            <span className="value">{user.email}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Rol:</span>
                            <span className={`role-badge ${user.role}`}>
                                {user.role}
                            </span>
                        </div>
                    </div>
                </section>

                <section className="actions-section">
                    <h2>Acciones</h2>
                    <div className="action-buttons">
                        <Link to="/reservations" className="action-button">
                            Ver Mis Reservaciones
                        </Link>
                        <button className="action-button red">Eliminar cuenta</button>
                        {isAdmin && (
                            <Link to="/admin" className="action-button admin">
                                Panel de Administración
                            </Link>
                        )}
                    </div>
                </section>

            </div>

            <div className="profile-footer">
                <button onClick={() => Logout()} className="logout-btn">
                    Cerrar sesion
                </button>
            </div>
        </div>
    )
}

export default ProfilePage
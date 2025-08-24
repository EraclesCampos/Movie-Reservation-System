import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/context'
import './header.css' 

const Header = () => {
    const { isAuth, setIsAuth } = useContext(AppContext)
    return (
        <header className="header">
            <div className="header-left">
                <Link to="/home" className="logo">MiCine</Link>
                <nav>
                <ul>
                    <li><Link to="/home">Inicio</Link></li>
                    <li><Link to="/home">Cartelera</Link></li>
                </ul>
                </nav>
            </div>
            <div className="header-right">
                {isAuth ? 
                <Link to={"/profile"}>
                    <img className='header-icon-profile' src="https://tickets-static-content.cinepolis.com/Tickets_Assets/Host/icons/IconProfile.svg" alt="iconProfile" />
                </Link>
                : <Link to="/login">
                <button>Iniciar sesión</button>
                </Link>}
            </div>
        </header>
    )
}

export default Header
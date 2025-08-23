import { Link } from 'react-router-dom'
import './header.css' 

const Header = () => {
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
                <Link to="/login">
                <button>Iniciar sesión</button>
                </Link>
            </div>
        </header>
    )
}

export default Header
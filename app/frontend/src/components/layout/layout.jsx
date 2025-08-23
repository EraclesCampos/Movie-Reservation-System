import Header from '../header/header'
import Footer from '../footer/Footer'
import './layout.css'
const Layout = ({ children }) =>{
    return (
        <div className='layout'>
            <Header />

            <main className='main'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
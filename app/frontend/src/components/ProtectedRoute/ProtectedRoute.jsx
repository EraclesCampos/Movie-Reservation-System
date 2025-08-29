import { Navigate } from "react-router-dom";
import Loader from "../loader/loader";

const ProtectedRoute = ({ children, isAuth, loading, redirectTo })=>{
    if (loading) return <Loader />

    if(!isAuth){
        console.log("isAuth es: " + isAuth + "redirigiendo a: "+redirectTo)
        return <Navigate to={redirectTo} replace />
    }
    return children
}

export default ProtectedRoute
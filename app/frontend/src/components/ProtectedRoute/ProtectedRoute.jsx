import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuth, redirectTo = '/login' })=>{
    if(!isAuth){
        return <Navigate to={redirectTo} replace />
    }
    return children
}

export default ProtectedRoute
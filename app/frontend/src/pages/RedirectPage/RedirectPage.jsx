import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../components/context/context"

export default function RedirectPage() {
  const { isAuth, user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('en el redirect')
    if(loading) return;
    if (!isAuth) return navigate("/login", { replace: true })
    const role = user?.role
    return navigate(role === 'admin' ? '/admin' : "/home", {replace: true})
  }, [isAuth, user, navigate, loading])

  return null
}

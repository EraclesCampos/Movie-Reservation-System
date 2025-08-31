import { useState, useEffect } from "react"
export const getMovies = ()=>{
    const [movies, setMovies] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    // const navigate = useNavigate()
    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true)
            try {
                const response = await fetch("http://localhost:3000/movies/")
                const json = await response.json()
                if(response.ok) setMovies(json)
                else setError(json.message) 
            } catch (err) {
                console.log(err)
                setError("No se pudo conectar al servidor")
            }
            finally{
                setLoading(false)
            }
        }
        fetchData()
    }, [reload])

    const loadMovies = ()=> setReload(!reload)

    return{
        movies,
        error,
        loading,
        loadMovies
    }
}


import { useState, useEffect } from "react"
export const getShowtimes = ()=>{
    const [showtimes, setShowtimes] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    // const navigate = useNavigate()
    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true)
            try {
                const response = await fetch("http://localhost:3000/showtimes/get-all")
                const json = await response.json()
                console.log("json:")
                console.log(json)
                if(response.ok) setShowtimes(json)
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

    const loadShowtimes = ()=> setReload(!reload)

    return{
        showtimes,
        error,
        loading,
        loadShowtimes
    }
}


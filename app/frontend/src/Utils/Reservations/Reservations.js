import {useState, useEffect} from 'react'

export const useReservations = (id)=>{
    const [reservaciones, setReservaciones] = useState([])
    const [groupedReservaciones, setGroupedReservaciones] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const groupReservations = ()=>{
            //Agrupar reservaciones por id de reservacion
            const grouped = reservaciones.reduce((acc, curr)=>{
                const existing = acc.find(r => r.reservation_id === curr.reservation_id)
                if(existing){
                    existing.seats.push(curr.seat_row + curr.number_seat)
                } else {
                    acc.push({...curr, seats: [curr.seat_row + curr.number_seat]})
                }
                return acc
            }, [])
            setGroupedReservaciones(grouped)
        }
        if(reservaciones.length > 0){
            groupReservations()
        }
    }, [reservaciones])
    useEffect(()=>{
        const fetchData = async ()=>{
            const token = localStorage.getItem("token")
            try {
                const result = await fetch(`http://localhost:3000/reservations/get-reservations/${id}`,
                    {
                        headers: { "Authorization": `Bearer ${token}` },
                        method: "GET",
                    }
                )
                const data = await result.json()
                if(!result.ok){
                    throw new Error("Error de servidor")
                }
                setReservaciones(data)
            } catch (error) {
                console.error("Error", error.message)
                setError("Error de servidor")
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    }, [id])
    return{
        reservaciones,
        groupedReservaciones,
        error,
        loading
    }
}
import { useEffect, useState } from "react"

export const useSeats = (room_id)=>{
    const [seats, setSeats] = useState(null)
    const [reservedSeats, setReservedSeats] = useState(null)
    const [errorSeats,setErrorSeats] = useState(null)
    const [loadingSeats, setLoadingSeats] = useState(true)

    useEffect(()=>{
        if (!room_id) return
        const token = localStorage.getItem("token")
        const fetchSeats = async ()=>{
            try{
                const response = await fetch(`http://localhost:3000/seats/get-seats?room_id=${room_id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        method: "GET",

                    }
                )
                const dataSeats = await response.json()
                console.log(dataSeats)
                if(!response.ok){
                    throw new Error(dataSeats.message)
                }
                setSeats(dataSeats)
            }catch(e){
                // console.log(e)
                setErrorSeats(e.message)
            }
        }
        const fetchReservedSeats = async ()=>{
            try{
                const response = await fetch(`http://localhost:3000/seats/get-reserved-seats?room_id=${room_id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        method: "GET",

                    }
                )
                const dataReservedSeats = await response.json()
                if(!response.ok){
                    throw new Error(dataReservedSeats.message)
                }
                setReservedSeats(dataReservedSeats)
            }catch(e){
                // console.log(e)
                setErrorSeats(e.message)
            }
        }
        const fetchAll = async ()=>{
            setLoadingSeats(true)
            await Promise.all([fetchSeats(), fetchReservedSeats()])
            setLoadingSeats(false)
        }
        fetchAll()
    },[room_id])
    return{
        seats,
        reservedSeats,
        errorSeats,
        loadingSeats
    }
}
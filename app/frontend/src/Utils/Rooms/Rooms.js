import { useEffect, useState } from "react"

export const getRooms = ()=>{
    const [rooms, setRooms] = useState(null)
    const [error, setError] = useState(null)
    const [reload, setReload] = useState(false)
    useEffect(()=>{
        const fetchData = async ()=>{
            const token = localStorage.getItem("token")
            try {
                const result = await fetch("http://localhost:3000/rooms/get-all",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        method: "GET",

                    }
                )
                if(!result.ok){
                    throw new Error("Error de servidor")
                }
                const data = await result.json()
                setRooms(data)
            } catch (error) {
                console.error("Error", error.message)
                setError("Error de servidor")
            }
        }
        fetchData()
    }, [reload])
    const loadRooms = ()=>setReload(!reload)
    return {rooms, error, loadRooms}
}

export const createRoom = async ({ name, capacity })=>{
    const token = localStorage.getItem("token")
    try {   
        const result = await fetch("http://localhost:3000/rooms/create-room",
            {
                headers: { Authorization: `Bearer ${token}` },
                method: "POST",
                body: {
                    name,
                    capacity,
                }
            }
        )
        const res = await result.json()
        return res
    } catch (error) {
        console.error(error)
    }
}

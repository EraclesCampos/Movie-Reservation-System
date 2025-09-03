
export const getRooms = async ()=>{
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
        return (data)
    } catch (error) {
        console.error("Error", error.message)
        
    }
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

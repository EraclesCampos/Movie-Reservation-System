import { useEffect, useState } from "react"

export const Users = ()=>{
    const [users, setUsers] =  useState([])
    useEffect(()=>{
        const fecthData = async ()=>{
            const token = localStorage.getItem("token")
            try {
                const response = await fetch("http://localhost:3000/users/get-users",{
                    headers: {"Authorization": `Bearer ${token}`}
                })
                const data = await response.json()
                setUsers(data)
            } catch (error) {
                // console.log(error)
            }
        }
        fecthData()
    },[])
    return(
        <div className="data-admin-panel">
            <div className="admin-header">
                <h2>Admin Users</h2>
            </div>
            <div className="users-table-container">
            {users?.length > 0  ?
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, _)=>(
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.role !== 'admin' ? <button>Hacer admin</button> : <p>Ya es admin</p>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            : <p>Aun no hay usuarios</p>}
            </div> 
        </div>
    )
}
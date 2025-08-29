import { useState } from "react";
import { useAuth } from "../../components/context/context";
import slugify from 'react-slugify'

const AdminPanel = ()=>{
    const [selected, setSelected] = useState('Movies')
    const handleClick = (e)=>{
        const value = e.target.value
        setSelected(value)
    }
    return(
        <div className="admin-panel-container">
            <h1>Admin panel</h1>
            <div className="panel-links-container">
                <button onClick={(e)=>handleClick(e)} value={'Movies'}>Movies</button>
                <button onClick={(e)=>handleClick(e)} value={'Showtimes'}>Showtimes</button>
                <button onClick={(e)=>handleClick(e)} value={'Users'}>Users</button>
            </div>
            <div>
                <h2>{selected}</h2>
            </div>
        </div>
    )
}

export default AdminPanel

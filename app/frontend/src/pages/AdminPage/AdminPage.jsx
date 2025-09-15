import { useEffect, useState } from "react";
import { useAuth } from "../../components/context/context";
import slugify from 'react-slugify'
import { getMovies } from "../../Utils/Movies/Movies.js";
import Loader from "../../components/loader/loader";
import { Movies } from "../../components/Admin/Movies/Movies.jsx";
import { Showtimes } from "../../components/Admin/Showtimes/Showtimes.jsx";
import { Rooms } from "../../components/Admin/Rooms/Rooms.jsx";
import { Seats } from "../../components/Admin/Seats/Seats.jsx";
import { Users } from "../../components/Admin/Users/Users.jsx";

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
                <button onClick={(e)=>handleClick(e)} value={'Rooms'}>Rooms</button>
                <button onClick={(e)=>handleClick(e)} value={'Seats'}>Seats</button>
                <button onClick={(e)=>handleClick(e)} value={'Users'}>Users</button>
            </div>
            <div>
                {selected === "Movies" && <Movies />}
                {selected === "Showtimes" && <Showtimes />}
                {selected === "Rooms" && <Rooms />}
                {selected === "Seats" && <Seats />}
                {selected === "Users" && <Users />}
            </div>
        </div>
    )
}

export default AdminPanel

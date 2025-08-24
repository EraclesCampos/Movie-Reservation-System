import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({children})=>{
    const [isAuth, setIsAuth] = useState(localStorage.getItem('token') || false)
    return(
        <AppContext.Provider value={{isAuth, setIsAuth}}>
            {children}
        </AppContext.Provider>
    )
}
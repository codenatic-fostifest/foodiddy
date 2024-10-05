import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";


export interface GlobalContextType {
    user : AuthT;
    setUser : Dispatch<SetStateAction<any>>;
    isLoggedIn : boolean;
    setLoggedIn : Dispatch<SetStateAction<boolean>>;
    isLoading : boolean;
}

const GlobalContext = createContext<GlobalContextType|null>(null)


const GlobalProvider = ({ children } : { children : React.ReactNode }) => {
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    
    useEffect(()=>{
        const checkSession = async () => {
            supabase.auth.onAuthStateChange((_event, session) => {
                if (session) {
                    setUser(session?.user)
                    console.log(session?.user)
                    router.replace("/home")  
                } else {
                    setUser(null)
                    router.replace("/")
                }
            })
        }
        
        checkSession()
    },[])

    return (
    <GlobalContext.Provider
    value={{
        user,
        setUser,
            isLoggedIn,
            setLoggedIn,
            isLoading
        }}
        >
        {children}
    </GlobalContext.Provider>)
};

export const useGlobalContext = () => useContext(GlobalContext)

export default GlobalProvider

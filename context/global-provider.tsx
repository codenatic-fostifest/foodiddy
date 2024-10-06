import { UserType } from "@/types/user";
import { supabase } from "@/utils/supabase";
import { UserMetadata } from "@supabase/supabase-js";
import { router } from "expo-router";
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";


export interface GlobalContextType {
    user : UserMetadata | UserType | null;
    setUser : Dispatch<SetStateAction<UserMetadata | UserType | null>>;
    isLoading : boolean;
}

const GlobalContext = createContext<GlobalContextType|null>(null)


const GlobalProvider = ({ children } : { children : React.ReactNode }) => {
    const [isLoading, setLoading] = useState(true)
    const [user, setUser] = useState<UserMetadata | UserType | null>(null)
    
    useEffect(()=>{
        const checkSession = async () => {
            supabase.auth.onAuthStateChange((_event, session) => {
                if (session) {
                    setUser(session?.user.user_metadata)
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
            isLoading
        }}
        >
        {children}
    </GlobalContext.Provider>)
};

export const useGlobalContext = () => useContext(GlobalContext)

export default GlobalProvider

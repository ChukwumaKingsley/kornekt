import { createContext, useContext, useState } from "react";

type AuthUser = {
    user: any | null;
    token: any | null;    
}
export type UserContextType = {
    user: AuthUser | null;
    saveDetails: (user: AuthUser | null) => void;
}

type UsercontProviderType = {
    children: React.ReactNode
}


const UserContext = createContext({} as UserContextType);

export function useUser() {
    return useContext(UserContext)
}

export const UserContextProvider = ({ children }: UsercontProviderType) => {
    const [user, setUser] = useState<AuthUser | null>(null)

    function saveDetails(details: AuthUser | null) {
        console.log('Successful')
        setUser(details);
        window.location.href = "/home";
    }

    return <UserContext.Provider value={{user, saveDetails }}>{children}</UserContext.Provider>
}
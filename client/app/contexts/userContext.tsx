'use client';

import { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
    user: any;
    setUser: (user: any) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);

    if (!context) {
        return {
            user: null,
            loggedIn: false
        };
    }

    return {
        user: context.user,
        setUser: context.setUser,
        loggedIn: !!context.user
    };
}

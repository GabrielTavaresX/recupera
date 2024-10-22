import { IAuthenticated, IUser } from "../services/data/User";
import React, {createContext, useState, useCallback, ReactNode, useEffect, Dispatch, SetStateAction} from "react";
import { api } from "../services/api";
import { apiUser } from "../services/data";
import { isAfter, parseISO } from "date-fns";
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface IAuthContextData {
    signIn(credentials: IUser): Promise<void>
    signOut(): Promise<void>
    user?: IAuthenticated
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
}

export interface IProvider {
    children: ReactNode
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

const AuthProvider = ({children}: IProvider) => {
    const [auth, setAuth] = useState<IAuthenticated>({} as IAuthenticated)
    const [loading, setLoading] = useState(false)

    const signIn = useCallback(async ({email, password}: IUser) => {
        const response = await apiUser.login({email, password})
        const user = response.data
        api.defaults.headers.common.Authorization = `Bearer ${user.token ? user.token.token: ""}`
        setAuth({...user})
        await AsyncStorage.setItem("user", JSON.stringify({...user}))
    }, [])

    const removeLocalStorage = useCallback(async () => {
        await AsyncStorage.removeItem("user")
    }, [])

    const signOut = useCallback(async () => {
        setAuth({} as IAuthenticated)
        await removeLocalStorage()
        delete api.defaults.headers.common.Authorization
    }, [])

    const loadUserStorageData = useCallback(async () => {
        const user = await AsyncStorage.getItem("user")

        if (user) {
            const userParse = JSON.parse(user) as IAuthenticated
            if (isAfter(parseISO(userParse.token.expires_at), new Date())) {
                api.defaults.headers.common.Authorization = `Bearer ${userParse.token}`
                setAuth({...userParse})
                return true
            } else {
                await removeLocalStorage()
                return false
            }
        } else {
            return false
        }

    }, [])

    useEffect(() => {
        loadUserStorageData()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                user: auth,
                loading,
                setLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, AuthContext}
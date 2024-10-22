import {api} from "../../api";

export interface IUser {
    name?: string
    email?: string
    password?: string
}

export interface IResponseUser {
    name?: string
    email?: string
    created_at: string
    update_at: string
    id: number
}

export interface IAuthenticated {
    user: IResponseUser
    token: {
        token: string
        expires_at: string
    }
}

class UserData {
    register(data: IUser) {
        return api.post<IResponseUser>('/register', data)
    }
    login(data: IUser) {
        return api.post<IAuthenticated>('/login', data)
    }
}

export default new UserData()
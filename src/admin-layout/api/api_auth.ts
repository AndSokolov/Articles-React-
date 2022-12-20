import { AuthDataI, UserI } from "../../shared/types/types";
import { isAuthenticated, setToken } from "../service/auth-service";
import axios from "axios";
import { API_KEY, AUTH_API_URL } from "../constants/constants";


export const authInstance = axios.create({
    baseURL: AUTH_API_URL
});

export const adminApi = {
    login(user: UserI): Promise<boolean> {
        user.returnSecureToken = true;
        return authInstance.post<AuthDataI>(`accounts:signInWithPassword?key=${API_KEY}`, user).then(response => {
                setToken(response.data);
                return isAuthenticated();
            }
        );
    }
}


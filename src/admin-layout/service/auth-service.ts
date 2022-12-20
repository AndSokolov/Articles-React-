import { AuthDataI } from "../../shared/types/types";

export function setToken(authData: AuthDataI | null) {
    if (authData) {
        const expDate = new Date(new Date().getTime() + +authData.expiresIn * 1000);
        localStorage.setItem('fbToken', authData.idToken);
        localStorage.setItem('fbExpiresIn', expDate.toString());
    } else {
        localStorage.clear();
    }

    window.dispatchEvent(new Event('storage'));
}

export function getToken(): string | null {
    const expDate = new Date(localStorage.getItem('fbExpiresIn') as string);
    if (new Date() > expDate) {
        logout();
        return null;
    }
    return localStorage.getItem('fbToken');
}

export function isAuthenticated(): boolean {
    return !!getToken();
}

export function logout() {
    setToken(null);
}

export function hasAuthToken() {
   return !!localStorage.getItem('fbToken');
}

import React from "react";

export interface UserI {
    email: string;
    password: string;
    returnSecureToken?: boolean;
}

export interface AuthDataI {
    displayName: string;
    idToken: string;
    expiresIn: string;
}

export interface PostsI {
    [key: string]: PostI
}

export interface PostI {
    id: string;
    author?: string;
    context?: string;
    date?: string;
    title?: string;
    key?: React.Key
}

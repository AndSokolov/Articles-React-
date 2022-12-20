import { Navigate } from "react-router-dom";
import React from "react";
import { isAuthenticated } from "../service/auth-service";

export function withAuthRedirect<RC>(ReactComponent: React.ComponentType<RC>) {

    return (props: RC) => {
        if (!isAuthenticated()) {
            return <Navigate to='/admin/login'/>
        }

        return <ReactComponent {...props}/>
    };
}

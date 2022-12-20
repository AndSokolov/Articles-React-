import React from "react";
import { NavLink } from 'react-router-dom'
import { logout } from "../../service/auth-service";
import style from "./Navbar.module.scss"

export const NavBar: React.FC<{}> = () => {
    return (
        <div className={style.navBar}>
            <div className={style.mainLinks}>
                <NavLink to="/admin/dashboard" style={({isActive}) => isActive ? {color: '#ffbecf'} : {}}>
                    Dashboard
                </NavLink>
                <NavLink to="/admin/create-post" style={({isActive}) => isActive ? {color: '#ffbecf'} : {}}>
                    Create post
                </NavLink>
            </div>
            <div className={style.redirectLinks}>
                <NavLink to="/" style={({isActive}) => isActive ? {color: '#ffbecf'} : {}}>
                    Main page
                </NavLink>
                <NavLink to="/admin/login" onClick={logout}>
                    Out
                </NavLink>
            </div>
        </div>
    );
};


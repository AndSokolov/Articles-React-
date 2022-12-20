import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom'
import style from "./AdminWrap.module.scss"
import { NavBar } from "../NavBar/NavBar";
import { Header } from "antd/lib/layout/layout";
import { hasAuthToken } from "../../service/auth-service";

export const AdminWrap: React.FC<{}> = () => {
    const [isAuth, setIsAuth] = useState<boolean>(() => hasAuthToken());

    const storageListener = () => {
        setIsAuth(hasAuthToken());
    }

    useEffect(() => {
        window.addEventListener('storage', storageListener)
        return () => {
            window.removeEventListener('storage', storageListener)
        }
    } , [])

    return (
        <div>
            <Header className={style.navBar}>
                <h1>ADMIN PANEL</h1>
                {isAuth ? <NavBar/> : ''}
            </Header>
            <div className={style.content}>
                <Outlet/>
            </div>
        </div>
    );
};


import React from "react";
import { Link, Outlet } from 'react-router-dom'
import style from './MainWrap.module.scss'

export const MainWrap: React.FC<{}> = () => {
    return (
        <div className={style.container}>
            <header><h1>BLOG</h1> <Link to={'/admin'}>Admin</Link></header>
            <div>
                <Outlet />
            </div>
        </div>
    );
}


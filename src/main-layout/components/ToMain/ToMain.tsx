import React from "react";
import { Link } from "react-router-dom";
import style from './ToMain.module.scss'

const ToMain: React.FC<{}> = ()=>{

    return <div className={style.container}>
        <Link to={'/posts'}><div>{'To main'}</div></Link>
    </div>
}

export default ToMain;

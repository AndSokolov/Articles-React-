import React, { FC } from "react";
import { PostI } from "../../../shared/types/types";
import ToMain from "../ToMain/ToMain";
import style from './Post.module.scss'
import { Divider } from "antd";

interface Props {
    post: PostI
}

const Post: FC<Props> = (props) => {

    return (
        <div>
            <h2 className='content-title'>Post</h2>
            <ToMain/>
            <div className={style.content}>
                <div className={style.header}>
                    <div><span className={style.label}>Title: </span> <span>{props.post?.title}</span></div>
                    <div>
                        <span className={style.author}><span className={style.label}>Author: </span>{props.post?.author}</span>
                        <span><span className={style.label}>Date: </span> {props.post?.date}</span>
                    </div>
                </div>
                <Divider></Divider>
                <div className={'ql-editor'} dangerouslySetInnerHTML={{__html: props.post?.context as string}}></div>
            </div>
        </div>
    );
}

export default Post;

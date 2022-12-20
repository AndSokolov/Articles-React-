import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { AppStateType, useAppDispatch } from "../../../shared/redux/store";
import { getPost } from "../../../shared/redux/posts-reducer";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Button, notification } from "antd";
import { postsAdminApi } from "../../api/api";
import { PostI } from "../../../shared/types/types";
import style from './EditPost.module.scss'


const EditPost: React.FC<{}> = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const [context, setContext] = useState<string | undefined>();

    const post: PostI = useSelector((state: AppStateType) => {
        if (!state.posts.posts.hasOwnProperty(id as string)) {
            dispatch(getPost(id as string));
        }
        return state.posts?.posts[id as string]
    });

    useEffect(() => {
        setContext(post?.context);
    }, [post])


    const updatePost = () => {
      const newPost: PostI = {...post, context, date: new Date().toString()}
        postsAdminApi.updatePost(newPost).then(() => {
            showNotification(newPost.id);
        })
    }

    const showNotification = (id: string) => {
        notification.info({
            message: `Post: ${id}`,
            description: (
                <>
                    <div>Post has been updated</div>
                    <div>See all posts on the <a href={'/admin/dashboard'}>Dashboard page</a></div>
                </>

            ),
            placement: "bottomRight",
            duration: 3
        });
    }

    return (
        <div className={style.post}>
            <h2>Edit Post: <span className={style.postId}>{post?.id}</span></h2>
            <div className={style.content}>
                <ReactQuill theme="snow" value={context} onChange={setContext}/>
                <Button type="primary" onClick={updatePost}>Update</Button>
            </div>
        </div>
    );
};

export default withAuthRedirect(EditPost);

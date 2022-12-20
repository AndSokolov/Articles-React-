import React, { FC } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getPost } from "../../../shared/redux/posts-reducer";
import Post from "./Post";
import { AppStateType } from "../../../shared/redux/store";
import { PostsI } from "../../../shared/types/types";


interface Props {
    posts: PostsI
    getPost(id: string | undefined): void;
}

const ContainerPost: FC<Props> = (props) => {
    const {id} = useParams();
    const post = props.posts[id as string]

    useEffect(() => {
        if (!props.posts.hasOwnProperty(id as string)) {
            props.getPost(id);
        }
    },[])

    return <Post post = {post}/>;
}

const mapStateToProps = (state: AppStateType) => ({
    posts: state.posts.posts,
});
export default connect(mapStateToProps, {getPost})(ContainerPost) ;

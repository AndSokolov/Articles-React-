import axios from "axios";
import { PostI, PostsI } from "../types/types";
import { dateTransform } from "../service/utils";
import { BASE_API_URL } from "../constants/constants";

export const mainInstance = axios.create({
    baseURL: BASE_API_URL,
});

export const postsApi = {
    getPosts(): Promise<PostsI> {
        return mainInstance.get<PostsI>('posts.json').then(response => mapPosts(response.data));
    },

    getPostById(id: string): Promise<PostI> {
        return mainInstance.get<PostI>(`posts/${id}.json`).then(response => mapPost(response.data, id));
    }
}


function mapPosts(posts: PostsI): PostsI {
    if (posts) {
        for (const [key, post] of Object.entries(posts)) {
            mapPost(post, key);
        }
    }
    return posts;
}

function mapPost(post: PostI, id: string): PostI {
    if (post) {
        post.id = id;
        post.key = id;
        if (typeof post.date === 'string') {
            post.date = dateTransform(post.date);
        }
    }
    return post
}

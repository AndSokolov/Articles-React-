import axios from "axios";
import { PostI } from "../../shared/types/types";
import { getToken } from "../service/auth-service";
import { BASE_API_URL } from "../../shared/constants/constants";

const mainInstance = axios.create({
    baseURL: BASE_API_URL,
});

const getConfig = () => ({ params: { auth: getToken() }});

export const postsAdminApi = {

    createPost(post: PostI): Promise<PostI> {
        return mainInstance.post<PostI>(`posts.json`, post, getConfig()).then(response => response.data);
    },

    updatePost(post: PostI): Promise<PostI> {
        return mainInstance.patch<PostI>(`posts/${post.id}.json`, post, getConfig()).then(response => response.data);
    },

    removePost(id: string): Promise<PostI> {
        return mainInstance.delete<PostI>(`posts/${id}.json`, getConfig()).then(response => response.data);
    },

}

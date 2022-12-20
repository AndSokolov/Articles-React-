import { PostsI } from "../types/types";
import { postsApi } from "../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface InitialStateInterface{
    posts: PostsI;
}
const initialState: InitialStateInterface = {
    posts: {},
}

export const getPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => await postsApi.getPosts()
)

export const getPost = createAsyncThunk(
    'post/fetchByPostId',
    async (id: string) => {
        const post = await postsApi.getPostById(id);
        return {id, post};
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
        })
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.posts[action.payload.id] = action.payload.post;
        })
    },
})

export default postsSlice.reducer;

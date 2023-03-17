import { PostsI } from "../types/types";
import { postsApi } from "../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type ViewType = 'grid' | 'table';

export interface InitialStateInterface{
    posts: PostsI;
    postsShouldUpdate: boolean;
    viewType: ViewType
}
const initialState: InitialStateInterface = {
    posts: {},
    postsShouldUpdate: true,
    viewType: 'grid'
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
    reducers: {
        resetPostsShouldUpdate(state: InitialStateInterface) {
            state.postsShouldUpdate = true;
        },
        setViewType(state: InitialStateInterface, { payload }: { payload: ViewType }) {
            state.viewType = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.postsShouldUpdate = false;
        })
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.posts[action.payload.id] = action.payload.post;
        })
    },
})

export const { resetPostsShouldUpdate, setViewType } = postsSlice.actions;

export default postsSlice.reducer;

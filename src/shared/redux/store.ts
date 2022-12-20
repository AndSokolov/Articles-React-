import postsReducer from "./posts-reducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
    posts: postsReducer,
})

let store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware();
    },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export default store;

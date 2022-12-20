import "antd/dist/antd.css";
import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Posts from "./main-layout/components/Posts/Posts";
import ContainerPost from "./main-layout/components/Post/Post.container";
import Login from "./admin-layout/components/Login/Login";
import React from "react";
import Dashboard from "./admin-layout/components/Dashboard/Dashboard";
import { AdminWrap } from "./admin-layout/components/AdminWrap/AdminWrap";
import { MainWrap } from "./main-layout/components/MainWrap/MainWrap";
import CreatePost from "./admin-layout/components/CreatePost/CreatePost";
import EditPost from "./admin-layout/components/EditPost/EditPost";

const App: React.FC<{}> = () => {

  return (
      <div className="App">

          <Routes>
              <Route path='/' element={<MainWrap/>}>
                  <Route index element={<Navigate replace to="posts" />} />
                  <Route path='/posts' element={<Posts/>}/>
                  <Route path="/posts/:id" element={<ContainerPost/>}/>
              </Route>


              <Route path='/admin' element={<AdminWrap/>}>
                  <Route index element={<Navigate replace to="dashboard"/>}/>
                  <Route path='dashboard' element={<Dashboard/>}/>
                  <Route path='create-post' element={<CreatePost/>}/>
                  <Route path='post/:id/edit' element={<EditPost/>}/>
                  <Route path='login' element={<Login/>}/>
              </Route>
          </Routes>

      </div>
  );
}

export default App;

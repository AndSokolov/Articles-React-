import { Button, Divider, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getPosts, InitialStateInterface, setViewType, ViewType} from "../../../shared/redux/posts-reducer";
import { PostI } from "../../../shared/types/types";
import { AppstoreOutlined, TableOutlined } from "@ant-design/icons";
import './Posts.scss'
import Grid from "./Grid/Grid";

interface Props {
    posts: InitialStateInterface;
    viewType: ViewType;
    getPosts: () => void;
    setViewType: (type: ViewType) => void;
}

const Posts: React.FC<Props> = (props) => {

   useEffect(() => {
        props.getPosts();
    }, [])

    const navigate = useNavigate();
    const toPost = (id: string) => navigate('/posts/' + id)

    const [searchText, setSearchText] = useState<string>('');

    const posts: PostI[] = Object.values(props.posts)
    let dataSource: PostI[] = searchText ? posts.filter(item => Object.values(item).join('').includes(searchText)) : posts;

    const columns = [
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        }
    ];

    return <div className='posts-container'>
        <h2 className='content-title'>Posts</h2>
        <div className='content'>
            <div className='change-view'>
                <Button className={props.viewType === 'grid' ? 'active' : ''} icon={<AppstoreOutlined/> } onClick={(e) => {props.setViewType('grid');}} />
                <Button className={props.viewType === 'table' ? 'active' : ''} icon={<TableOutlined /> } onClick={() => {props.setViewType('table');}} />
            </div>
            <div className='search-bar'>
                <span className='label'>Search: </span>
                <Input className='input' placeholder="Find a post" allowClear onChange={e => {setSearchText(e.target.value)}}/>
            </div>
            <Divider/>
            {
                props.viewType === 'grid' ?
                    <Grid toPost={toPost} datasource={dataSource}/>
                    :
                    <Table dataSource={dataSource} columns={columns} onRow={(record) => ({ onClick: () => { toPost(record.id) }})} />
            }

        </div>
    </div>
}

const mapStateToProps = (state: any) => ({
    posts: state.posts.posts,
    viewType: state.posts.viewType
});

export default connect(mapStateToProps, {getPosts, setViewType})(Posts);


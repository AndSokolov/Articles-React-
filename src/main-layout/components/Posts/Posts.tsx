import { Button, Card, Divider, Input, List, Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts, InitialStateInterface } from "../../../shared/redux/posts-reducer";
import { PostI } from "../../../shared/types/types";
import { AppstoreOutlined, TableOutlined } from "@ant-design/icons";
import './Posts.scss'

interface Props {
    posts: InitialStateInterface,
    getPosts: () => void
}

const Posts: React.FC<Props> = (props) => {

   useEffect(() => {
        props.getPosts();
    }, [])

    const navigate = useNavigate();
    const toPost = (id: string) => navigate('/posts/' + id)

    const [searchText, setSearchText] = useState<string>('');
    const [isGrid, setIsGrid] = useState<boolean>(true);

    const posts: PostI[] = Object.values(props.posts)
    let dataSource = searchText ? posts.filter(item => Object.values(item).join('').includes(searchText)) : posts;

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
                <Button className={isGrid ? 'active' : ''} icon={<AppstoreOutlined/> } onClick={(e) => {setIsGrid(true)}} />
                <Button className={!isGrid ? 'active' : ''} icon={<TableOutlined /> } onClick={() => {setIsGrid(false)}} />
            </div>
            <div className='search-bar'>
                <span className='label'>Search: </span>
                <Input className='input' placeholder="Find a post" allowClear onChange={e => {setSearchText(e.target.value)}}/>
            </div>
            <Divider/>
            {
                isGrid ? <List
                        grid={{gutter: 40, column: 4}}
                        dataSource={dataSource}
                        renderItem={(post) => (
                            <List.Item onClick={() => {toPost(post.id)}}>
                                <Card title={post.title}>
                                    <div>Date: {post.date}</div>
                                    <div>Author: {post.author}</div>
                                </Card>
                            </List.Item>
                        )}
                    /> : <Table dataSource={dataSource} columns={columns} onRow={(record) => ({ onClick: () => { toPost(record.id) }})} />

            }

        </div>
    </div>
}

const mapStateToProps = (state: any) => ({
    posts: state.posts.posts,
});

export default connect(mapStateToProps, {getPosts})(Posts);

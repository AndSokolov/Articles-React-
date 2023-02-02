import React, { useEffect } from "react";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { AppStateType, useAppDispatch } from "../../../shared/redux/store";
import { getPosts } from "../../../shared/redux/posts-reducer";
import { useSelector } from "react-redux";
import { Button, Modal, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { PostI } from "../../../shared/types/types";
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { postsAdminApi } from "../../api/api";
import './Dashboard.scss'

const Dashboard: React.FC<{}> = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const postsState = useSelector((state: AppStateType) => state.posts);
    const { posts, postsShouldUpdate } = postsState;

    useEffect(() => {
        if (postsShouldUpdate) {
            dispatch(getPosts())
        }
    }, [postsShouldUpdate]);

    const dataSource = Object.values(posts);
    const { confirm } = Modal

    const toPost = (id: string) => navigate(`/admin/post/${id}/edit`);


    const handlerDelete = (e: React.MouseEvent<HTMLElement>, id: string | undefined) => {
        e.stopPropagation();

        confirm({
            title: 'Are you sure delete this post?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Data cannot be recovered',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                postsAdminApi.removePost(id as string).then(() => {
                    dispatch(getPosts())
                })
            },
        });
    }


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
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: unknown, post: PostI) => (
                <Space size="small">
                    <Button shape='circle' icon={ <DeleteOutlined /> } onClick={(e) => { handlerDelete(e, post.id) } } />
                </Space>
            ),
        },
    ];


    return (
        <div className='dashboard'>
            <h1>Dashboard</h1>
            <div>
                <Table dataSource={dataSource} columns={columns} onRow={(record) => ({ onClick: () => { toPost(record.id) }})} />
            </div>
        </div>

    );
};

export default withAuthRedirect(Dashboard);

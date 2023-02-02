import React, { useState } from "react";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { PostI } from "../../../shared/types/types";
import { postsAdminApi } from "../../api/api";
import ReactQuill from "react-quill";
import { Button, Form, Input, notification } from "antd";
import './CreatePost.scss'
import { resetPostsShouldUpdate } from "../../../shared/redux/posts-reducer";
import { useAppDispatch } from "../../../shared/redux/store";

const CreatePost: React.FC<{}> = () => {

    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [context, setContext] = useState<string | undefined>();
    const [quillError, setQuillError] = useState<boolean>(false);

    const createPost = (post: PostI) => {
        const newPost: PostI = {...post, date: new Date().toString()}
        postsAdminApi.createPost(newPost).then(() => {
            form.resetFields();
            showNotification();
            dispatch(resetPostsShouldUpdate());
        })
    }

    const showNotification = () => {
        notification.info({
            message: "Post created",
            description: (
                <>
                    <div>A new post was added</div>
                    <div>Open/change post on the <a href={'/admin/dashboard'}>Dashboard page</a></div>
                </>

            ),
            placement: "bottomRight",
            duration: 3
        });
    }

    return (
        <div>
            <h1>Create Post</h1>
            <div className='post-content'>
                <Form
                    form={form}
                    name="create-post"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                    initialValues={{remember: true}}
                    onFinish={createPost}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Author"
                        name="author"
                        rules={[{required: true, message: "Please input your name!"}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="title"
                        name="title"
                        rules={[{required: true, message: "Please input your title!"}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name="context" label="text" rules={[{required: true, message: ''}, {
                        message: 'Please input your text!',
                        validator: (_, value) => {
                            if (value && value !== '<p><br></p>') {
                                setQuillError(false);
                                return Promise.resolve();
                            } else {
                                setQuillError(true);
                                return Promise.reject('Please input your text!');
                            }
                        }
                    }]}>
                        <ReactQuill className={quillError ? 'ql-error' : ''} theme="snow" value={context}
                                    onChange={setContext}/>

                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default withAuthRedirect(CreatePost);

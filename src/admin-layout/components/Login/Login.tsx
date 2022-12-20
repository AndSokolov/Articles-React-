import React, {useState} from "react";
import { Button, Form, Input } from "antd";
import style from './Login.module.css'
import { UserI } from "../../../shared/types/types";
import { Navigate } from 'react-router-dom'
import { adminApi } from "../../api/api_auth";


const Login: React.FC = () => {

    let [isAuth, setIsAuth] = useState<boolean>(false);
    let [error, setError] = useState<string>('');

    const onFinish = async (user: UserI) => {
        try {
            setIsAuth(await adminApi.login(user));
        } catch(error) {
            setError((error as Error).message);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    if (isAuth) {
        return  <Navigate to='/admin/dashboard'/>
    }

    return (
        <Form
            name="login"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={style.login}
        >
            <Form.Item
                label="Username"
                name="email"
                rules={[{ required: true, message: "Please input your username!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
            >
                <Input.Password />
            </Form.Item>

            { error ? <div className={style.error}>{error}</div> : ''}

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;

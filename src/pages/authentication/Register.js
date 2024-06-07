import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import Roles from '../../constraint/Roles';

const Register = () => {

    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();


    const onFinish = async (values) => {
        setLoading(true);
        try {
            const data = await UserService.register({ 
                username : values.username,
                password : values.password,
                confirmPassword: values.confirmPassword,
                role: Roles.ROLE_USER
        });
            message.success(data);
            navigate('login');
        } catch (error) {
            console.log(error.response.data);
            form.setFields([
                {
                    name: 'username',
                    errors: [error.response.data]
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '10vh',
                padding: '20px',
            }}
        >
            <div style={{ maxWidth: '400px', width: '100%' }}>
                <h1>Register</h1>
                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 8,
                                message: 'Password must be at least 8 characters long!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="ConfirmPassword"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Register;

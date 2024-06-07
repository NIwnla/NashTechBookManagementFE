import React, { useEffect } from 'react';
import { Form, Input, Button, InputNumber, message } from 'antd';
import { useAuth } from '../../context/AuthContext';
import RequestService from '../../services/RequestService';
import { useNavigate } from 'react-router-dom';
import Roles from '../../constraint/Roles';

const { TextArea } = Input;

const RequestCreate = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { userId, userRole, setRequestCount } = useAuth();
    useEffect(() => {
        form.setFieldsValue({
            createUserId: userId,
        })
    }, [userId, form]);


    const onFinish = async (values) => {
        try {
            const result = await RequestService.createRequest(values);
            setRequestCount(prev => prev - 1)
            message.success(result);
            if (userRole === Roles.ROLE_SUPERUSER) {
                navigate('/requests')
            } else {
                navigate(`/requests/user/${userId}`)
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form
            form={form}
            name="Create request"
            onFinish={onFinish}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 8,
            }}
            style={{margin : '30px'}}
        >
            <Form.Item
                name="createUserId"
                label="Create User ID"
                hidden
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="title"
                label="Title"
                rules={[
                    {
                        required: true,
                        message: 'Please input the title!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="description"
                label="Description"
                rules={[
                    {
                        required: true,
                        message: 'Please input the description!',
                    },
                ]}
            >
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item
                name="borrowDays"
                label="Borrow Days"
                rules={[
                    {
                        required: true,
                        message: 'Please input the borrow days!',
                    },
                    {
                        type: 'number',
                        min: 1,
                        message: 'Borrow days must be a positive integer!',
                    },
                ]}
            >
                <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 4,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RequestCreate;

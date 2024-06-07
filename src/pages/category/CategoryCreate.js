import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CategoryService } from '../../services/CategoryService';

const CategoryCreate = () => {
    const [form] = Form.useForm()
    const { userId } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        form.setFieldsValue({
            createUserId: userId,
        })
    }, [userId, form])

    const onFinish = async (values) => {
        try {
            var result = await CategoryService.createCategory(values);
            message.success(result);
            navigate('/categories');
        } catch (error) {
            console.log(error);
            form.setFields([
                {
                    name: 'name',
                    errors: [error.response.data],
                },
            ]);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '15px' }}>
            <h2>Create category</h2>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="createUserId"
                    hidden
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Category Name"
                    rules={[{ required: true, message: 'Please input the category name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CategoryCreate;

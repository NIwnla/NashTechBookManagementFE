import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useAuth } from '../context/AuthContext';

const CategoryForm = (props) => {
    const [form] = Form.useForm()
    const { userId } = useAuth();
    useEffect(() => {
        form.setFieldsValue({
            [idType]: userId,
        })

        if(props.errorMessage){
            form.setFields([
                {
                    name: 'name',
                    errors: [props.errorMessage],
                },
            ]);
        }
    }, [userId])
    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>{props?.formTitle}</h2>
            <Form
            form={form}
                initialValues={props?.initialValues}
                onFinish={props?.onFinish}
                layout="vertical"
            >
                <Form.Item
                    name={idType}
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
                        {props?.buttonText}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};


export default CategoryForm;

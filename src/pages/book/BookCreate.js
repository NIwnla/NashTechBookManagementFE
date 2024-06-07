import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CategoryService } from '../../services/CategoryService';
import BookService from '../../services/BookService';
import { useAuth } from '../../context/AuthContext';

const { Option } = Select;
const { TextArea } = Input;

const BookCreate = () => {
    const [form] = Form.useForm()
    const { userId } = useAuth();
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        form.setFieldsValue({
            createUserId: userId,
        })
    }, [userId,form])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await CategoryService.getCategories({ paginate: false });
                setCategories(data.items)
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        fetchCategories();
    }, []);

    const handleCreate = async (values) => {
        try {
            const result = await BookService.createBook(values);
            message.success(result);
            navigate('/books')
        } catch (error) {
            form.setFields([
                {
                    name: 'title',
                    errors: [error.response.data],
                },
            ]);
        }
    };

    return (
        <div
            style={{
                alignItems: 'center',
                minHeight: '100vh',
                padding: '20px',
            }}
        >
            <div style={{ maxWidth: '600px' }}>
                <h1>Create Book</h1>
                <Form
                    form={form}
                    name="createBookForm"
                    onFinish={handleCreate}
                    style={{ marginTop: '20px' }}
                >
                    <Form.Item
                        name="createUserId"
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter the title' }]}
                    >
                        <Input style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Body"
                        name="body"
                        rules={[{ required: true, message: 'Please enter the body' }]}
                    >
                        <TextArea rows={4} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[
                            { required: true, message: 'Please enter the quantity' },
                            { type: 'number', min: 1, message: 'Quantity must be a positive integer' },
                        ]}
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Categories"
                        name="categoryIds"
                        rules={[{ required: true, message: 'Please select at least one category' }]}
                    >
                        <Select mode="multiple" placeholder="Select categories" style={{ width: '100%' }}>
                            {categories &&
                                categories.map(category => (
                                    <Option key={category.id} value={category.id}>
                                        {category.name}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default BookCreate;

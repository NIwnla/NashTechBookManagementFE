import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import BookService from '../../services/BookService';
import BookItemDetail from '../../components/BookItemDetail';
import TextArea from 'antd/es/input/TextArea';
import { CategoryService } from '../../services/CategoryService';
import { useAuth } from '../../context/AuthContext';

const { Option } = Select;

const UpdateBookForm = () => {
    const { userId } = useAuth();
    const { id } = useParams();
    const [book, setBook] = useState();
    const [categories, setCategories] = useState();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        form.setFieldsValue({
            updateUserId: userId,
            title: book?.title,
            body: book?.body,
            quantity: book?.quantity,
            categoryIds: book?.categories.map(category => category.id)
        })
    }, [book, form, userId])


    useEffect(() => {
        const fetchBook = async (id) => {
            try {
                const data = await BookService.getBookById(id);
                setBook(data)
            } catch (error) {
                console.error('Error fetching Books:', error);
            }
        }

        const fetchCategories = async () => {
            try {
                const data = await CategoryService.getCategories({ paginate: false });
                setCategories(data.items)
            } catch (error) {
                console.error('Error fetching Books:', error);
            }
        }


        fetchBook(id);
        fetchCategories();

    }, [id])


    const handleUpdate = async (values) => {
        try {
            const data = await BookService.updateBook(book?.id, values)
            console.log(data)
            navigate(`/books/${book?.id}`)
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
                marginLeft: '5%',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
                padding: '20px',
            }}
        >
            <div style={{ maxWidth: '400px' }}>
                <h1>Update Book</h1>
                <BookItemDetail book={book} />
                <Form
                    form={form}
                    name="updateBookForm"
                    onFinish={handleUpdate}
                    style={{ marginTop: '20px' }}
                >
                    <Form.Item
                        name="updateUserId"
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter the title' }]}
                    >
                        <Input style={{ width: '150%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Body"
                        name="body"
                        rules={[{ required: true, message: 'Please enter the body' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[
                            { required: true, message: 'Please enter the quantity' },
                            { type: 'number', min: 0, message: 'Quantity must be a positive integer' },
                        ]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Categories"
                        name="categoryIds"
                        rules={[{ required: true, message: 'Please select at least one category' }]}
                    >
                        <Select mode="multiple" placeholder="Select categories" style={{ width: '150%' }} >
                            {categories &&
                                categories.map(category => (
                                    <Option key={category.id} value={category.id} selected={true}>{category.name}</Option>
                                ))}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" >
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default UpdateBookForm;

import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryItem from '../../components/CategoryItem';
import { useAuth } from '../../context/AuthContext';
import { CategoryService } from '../../services/CategoryService';

const CategoryUpdate = () =>{
    const { userId } = useAuth();
    const { id } = useParams();
    const [category, setCategory] = useState();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        form.setFieldsValue({
            updateUserId: userId,
            name : category?.name
        })
    }, [userId, category, form])


    useEffect(() => {
        const fetchCategory = async (id) => {
            try {
                const data = await CategoryService.getCategoryById(id);
                console.log(data);
                setCategory(data)
            } catch (error) {
                console.error('Error fetching Books:', error);
            }
        }

        fetchCategory(id);

    }, [id])

    const handleUpdate = async (values) => {
        try {
            const data = await CategoryService.updateCategory(category?.id, values)
            console.log(data)
            navigate('/categories')
        } catch (error) {
            form.setFields([
                {
                    name: 'name',
                    errors: [error.response.data],
                },
            ]);
        }
    };

    return(
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
                <CategoryItem category={category} />
                <Form
                    form={form}
                    onFinish={handleUpdate}
                    layout="vertical"
                >
                    <Form.Item
                        name="updateUserId"
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
                            Update
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )

}

export default CategoryUpdate
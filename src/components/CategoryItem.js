import { Button, Card, Modal, message } from 'antd';
import React, { useState } from 'react';
import './CategoryItem.css';
import { useNavigate } from 'react-router-dom';
import { CategoryService } from '../services/CategoryService';

const CategoryItem = ({ category, showButton ,setNum}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onUpdate = async (id) => {
        navigate(`/categories/${id}/update`)
    }

    const onDelete = async (id) => {
        try {
            const data = await CategoryService.deleteCategory(id);
            message.success(data)
            setIsModalVisible(false);
            setNum(prev => ++prev);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card className="category-card" style={{ padding: '5px' }}>
            <h3>{category?.name}</h3>
            {showButton &&
                <div class="action" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <Button type="primary" onClick={() => onUpdate(category?.id)}>Update</Button>
                    <Button danger onClick={showModal}>Delete</Button>
                    <Modal
                        title="Delete category?"
                        visible={isModalVisible}
                        onOk={() => onDelete(category?.id)}
                        onCancel={handleCancel}
                    >
                    </Modal>
                </div>}

        </Card>
    );
};


export default CategoryItem;

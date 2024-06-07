import { Button, Modal, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookItemDetail from '../../components/BookItemDetail';
import BookService from '../../services/BookService';
import { useAuth } from '../../context/AuthContext';
import Roles from '../../constraint/Roles';


const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const { userRole } = useAuth();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchBook = async (id) => {
            try {
                const data = await BookService.getBookById(id);
                setBook(data)
            } catch (error) {
                console.error('Error fetching Books:', error);
            }
        }
        fetchBook(id);

    }, [id])


    const showAddDetailModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleUpdate = () => {
        navigate(`/books/${book?.id}/update`)
    };

    const handleDelete = async () => {
        try {
            const data = await BookService.deleteBook(id)
            message.success(data)
            setIsModalVisible(false);
            navigate('/books')
        } catch (error) {
            console.log(error);
        }
    };

    const handleMenu = () => {
        navigate('/books')
    };

    return (
        <div style={{ padding: '20px', display: 'block' }}>
            <h1>Book Detail</h1>
            <BookItemDetail book={book} />
            <div style={{ marginTop: '20px', display: 'flex' }}>
                {userRole === Roles.ROLE_SUPERUSER &&
                    <div>
                        <Button type="primary" onClick={handleUpdate} style={{ marginRight: '10px' }}>
                            Update
                        </Button>
                        <Button danger onClick={showAddDetailModal} style={{ marginRight: '10px' }}>
                            Delete
                        </Button>
                        <Modal
                            title="Delete book?"
                            visible={isModalVisible}
                            onOk={handleDelete}
                            onCancel={handleCancel}
                        >
                        </Modal>
                    </div>
                }
                <Button onClick={handleMenu} style={{ marginRight: '10px' }}>
                    Menu
                </Button>
            </div>
        </div>
    );
}
export default BookDetail;

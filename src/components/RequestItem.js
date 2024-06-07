import React, { useState } from 'react';
import { Card, Typography, Collapse, Modal, Select, Button, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import BookService from '../services/BookService';
import { useAuth } from '../context/AuthContext';
import { RequestDetailService } from '../services/RequestDetailService';
import Roles from '../constraint/Roles';
import RequestService from '../services/RequestService';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

const RequestItem = ({ request, setNum }) => {
    const {
        id,
        requesterName,
        approverName,
        title,
        description,
        dateRequested,
        expireDate,
        requestType,
        details
    } = request;
    const { userId, userRole, username } = useAuth();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [availableBooks, setAvailableBooks] = useState();


    const fetchAvailableBooks = async () => {
        try {
            var result = await BookService.getAvailableBooks({ requestId: id, userId: userId });
            setAvailableBooks(result);
        } catch (error) {
            console.log(error);
        }
    }

    const postRequestDetail = async () => {
        try {
            var result = await RequestDetailService.createRequestDetail({
                createUserId: userId,
                requestId: id,
                bookId: selectedBook
            })
            setNum(prev => ++prev);
            message.success(result);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteRequestDetail = async (id, userId) => {
        try {
            var result = await RequestDetailService.deleteRequestDetail({ id: id, userId: userId });
            setNum(prev => ++prev);
            message.success(result);
        } catch (error) {
            console.log(error);
        }
    }

    const approveRequest = async (approval) => {
        try {
            var result = await RequestService.approveRequest(id, {
                approverId: userId,
                requestId: id,
                approve: approval
            });
            setNum(prev => ++prev);
            message.success(result);
        } catch (error) {
            console.log(error);
        }
    }

    const returnBook = async (id, userId) => {
        try {
            var result = await RequestDetailService.returnBookRequestDetail({ id: id, userId: userId });
            setNum(prev => ++prev);
            message.success(result);
        } catch (error) {
            console.log(error);
        }
    }

    const showAddDetailModal = () => {
        fetchAvailableBooks();
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedBook(null);
        setAvailableBooks(null);
    };

    const handleAddDetail = () => {
        if (selectedBook) {
            postRequestDetail();

            setIsModalVisible(false);
            setSelectedBook(null);
            setAvailableBooks(null);

        }
    };

    const handleBookChange = (value) => {
        setSelectedBook(value);
    };

    const handleDeleteDetail = (id) => {
        deleteRequestDetail(id, userId)
    };
    const handleApprove = (approve) => {
        console.log(approve);
        approveRequest(approve)
    }

    const handleReturnBook = async (id) => {
        returnBook(id, userId)
        console.log(id);
    }


    return (
        <Card
            title={title}
            bordered
            style={{
                marginBottom: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
            }}
        >
            {userRole === Roles.ROLE_SUPERUSER && details.length > 0 && requestType === "Waiting" &&
                <div>
                    <Button
                        type='primary'
                        style={{ position: 'absolute', right: 5, top: 10 }}
                        onClick={() => handleApprove(true)}
                    >
                        Approve
                    </Button>

                    <Button
                        danger
                        style={{ position: 'absolute', right: 100, top: 10 }}
                        onClick={() => handleApprove(false)}
                    >
                        Reject
                    </Button>
                </div>
            }

            <Title level={4}>Requester: {requesterName}</Title>
            {console.log(approverName)}
            {approverName && <p><Text strong>Approver: </Text>{approverName}</p>}
            <p>
                <Text strong>Title: </Text>{title}
            </p>
            <p>
                <Text strong>Description: </Text>{description}
            </p>
            <p>
                <Text strong>Date Requested: </Text>{new Date(dateRequested).toLocaleString()}
            </p>
            <p>
                <Text strong>Expire Date: </Text>{new Date(expireDate).toLocaleString()}
            </p>
            <p>
                <Text strong>Request Type: </Text>{requestType}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Collapse style={{ flex: 1 }}>
                    <Panel header="Details" key="1">
                        {details.map(detail => (
                            <Card
                                key={detail.id}
                                type="inner"
                                title={detail.bookName}
                                bordered
                                style={{
                                    marginBottom: '10px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '8px',
                                }}
                            >
                                {detail.requestStatus === 'Requesting' && requesterName === username &&
                                    <Button
                                        danger
                                        style={{ position: 'absolute', right: 5, top: 10 }}
                                        onClick={() => handleDeleteDetail(detail.id)}
                                    >
                                        Delete
                                    </Button>
                                }
                                {(detail.requestStatus === 'Borrowing' || detail.requestStatus === 'Overdue') && userRole === Roles.ROLE_SUPERUSER &&
                                    <Button
                                        type="primary"
                                        style={{ position: 'absolute', right: 5, top: 10 }}
                                        onClick={() => handleReturnBook(detail.id)}
                                    >
                                        Book returned
                                    </Button>
                                }

                                <p>
                                    <Text strong>Request Status: </Text>{detail.requestStatus}
                                </p>
                            </Card>
                        ))}
                    </Panel>
                </Collapse>
                {details.length < 5 && username === requesterName && requestType === "Waiting" &&(
                    <PlusCircleOutlined
                        style={{ fontSize: '24px', marginLeft: '10px', cursor: 'pointer' }}
                        onClick={showAddDetailModal}
                    />
                )}
            </div>

            <Modal
                title="Borrow a book"
                visible={isModalVisible}
                onOk={handleAddDetail}
                onCancel={handleCancel}
            >
                <Select
                    showSearch
                    placeholder="Select a book"
                    onChange={handleBookChange}
                    style={{ width: '100%' }}
                >
                    {availableBooks?.map(book => (
                        <Option key={book.id} value={book.id}>{book.title}</Option>
                    ))}
                </Select>
            </Modal>
        </Card>
    );
};

export default RequestItem;

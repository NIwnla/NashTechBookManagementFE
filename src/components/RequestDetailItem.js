import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Spin, Button } from 'antd';
import RequestService from '../services/RequestService';

const { Title, Text } = Typography;

const detail = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRequestDetail = async () => {
            try {
                setIsLoading(true);
                const data = await RequestService.getRequestById(id);
                setRequestDetail(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching request detail:', error);
                setIsLoading(false);
            }
        };

        fetchRequestDetail();
    }, [id]);

    if (isLoading) {
        return <Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />;
    }

    if (!detail) {
        return <div>No request details found.</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card
                title={`Request Detail - ${detail.bookName}`}
                bordered
                style={{
                    width: '80%',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                }}
            >
                <Title level={4}>Book Name: {detail.bookName}</Title>
                <p>
                    <Text strong>Request Status: </Text>{detail.requestStatus}
                </p>
                <div style={{ marginTop: '20px' }}>
                    <Button type="primary" style={{ marginRight: '10px' }}>Update</Button>
                    <Button type="danger">Delete</Button>
                </div>
            </Card>
        </div>
    );
};

export default detail;

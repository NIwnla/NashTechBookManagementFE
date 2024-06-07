import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Select, Pagination, Spin, Button } from 'antd';
import { Link, useParams } from 'react-router-dom';
import RequestService from '../../services/RequestService';
import RequestItem from '../../components/RequestItem';
import { useAuth } from '../../context/AuthContext';

const { Search } = Input;
const { Option } = Select;

const RequestIndex = () => {
    const { requestCount } = useAuth();
    const { id } = useParams();
    const [requests, setRequests] = useState([]);
    const [paginatedList, setPaginatedList] = useState({});
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchType, setSearchType] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [num, setNum] = useState(0);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setIsLoading(true);
                const data = await RequestService.getRequests({ page, pageSize, title: searchTitle, type: searchType, userId: id });
                setPaginatedList(data);
                setRequests(data.items);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching requests:', error);
                setRequests([])
                setIsLoading(false);
            }
        };

        fetchRequests();
    }, [page, pageSize, searchTitle, searchType, id, num]);

    const onSearch = (value) => {
        setSearchTitle(value);
    };

    const onTypeChange = (value) => {
        setSearchType(value);
    };

    const onPageChange = (page, pageSize) => {
        setPage(page);
        setPageSize(pageSize);
    };

    return (
        <div style={{ margin: '5%' }}>
            <Row gutter={[16, 16]} justify="space-between">
                {requestCount > 0 && <Button type="primary" style={{ marginRight: 10 }}><Link to="/requests/create">Create</Link></Button>}
                <Col span={12}>
                    <Search
                        placeholder="Search by title"
                        enterButton
                        onSearch={onSearch}
                    />
                </Col>
                <Col span={8}>
                    <Select
                        placeholder="Select type"
                        style={{ width: '100%' }}
                        onChange={onTypeChange}
                    >
                        <Option value="">All</Option>
                        <Option value="0">InActive</Option>
                        <Option value="1">Rejected</Option>
                        <Option value="2">Accepted</Option>
                        <Option value="3">Waiting</Option>
                    </Select>
                </Col>
            </Row>
            <Spin spinning={isLoading}>
                <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                    {requests.map((request) => (
                        <Col key={request.id} span={24}>
                            <RequestItem request={request} setNum={setNum} />
                        </Col>
                    ))}
                </Row>
            </Spin>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Pagination
                    current={page}
                    pageSize={pageSize}
                    total={paginatedList.totalCount}
                    onChange={onPageChange}
                    showSizeChanger
                />
            </div>
        </div>
    );
};

export default RequestIndex;

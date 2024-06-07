import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Pagination, Spin } from 'antd';
import { CategoryService } from '../../services/CategoryService';
import CategoryItem from '../../components/CategoryItem';
import { useDebouncedCallback } from 'use-debounce';
import { Link } from 'react-router-dom';


const CategoryIndex = () => {
    const [categories, setCategories] = useState([]);
    const [paginatedList, setPaginatedList] = useState({});
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [num, setNum] = useState(1);
    const debounced = useDebouncedCallback(
        (value) => {
            setSearch(value);
        },
        1000
    );
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true);
                const data = await CategoryService.getCategories({ page, pageSize, search });
                setPaginatedList(data);
                setCategories(data.items)
                setIsLoading(false);
            } catch (error) {
                setCategories([])
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, [page, pageSize, search, num]);

    const onPageChange = (page, pageSize) => {
        setPage(page);
        setPageSize(pageSize);
    };

    return (
        <div style={{ margin: '5%' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Button type="primary" style={{ marginRight: 10 }}><Link to="/categories/create">Create</Link></Button>
                    <Input
                        placeholder="Search..."
                        onChange={(e) => debounced(e.target.value)}
                        style={{ width: 200, marginRight: 10 }}
                    />
                </div>
                <Pagination
                    showSizeChanger
                    onChange={onPageChange}
                    defaultCurrent={1}
                    total={paginatedList?.totalCount}
                />
            </div>
            <Spin spinning={isLoading}>
                <Row gutter={[16, 16]}>
                    {categories &&
                        categories.map((category, index) => (
                            <Col key={index} span={6}>
                                <CategoryItem category={category} showButton={true} setNum={setNum}/>
                            </Col>
                        ))}
                </Row>
            </Spin>
        </div>
    );
};

export default CategoryIndex;

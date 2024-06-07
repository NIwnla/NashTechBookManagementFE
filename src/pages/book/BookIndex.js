import { Button, Col, Input, Pagination, Row, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import BookItem from "../../components/BookItem";
import BookService from "../../services/BookService";
import { useAuth } from "../../context/AuthContext";
import Roles from "../../constraint/Roles";

const { Option } = Select;
const BookIndex = () => {
    const { userRole } = useAuth();
    const [paginatedList, setPaginatedList] = useState({});
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState('');
    const [order, setOrder] = useState('');
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const debounced = useDebouncedCallback(
        (value) => {
            setSearch(value);
        },
        1000
    );

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setIsLoading(true)
                const data = await BookService.getBooks({ page, pageSize, sort, order, search });
                setPaginatedList(data);
                setBooks(data.items);
                setIsLoading(false)
            } catch (error) {
                setBooks([])
                setIsLoading(false)
            }
        };

        fetchBooks();
    }, [page, pageSize, sort, order, search]);

    const onPageChange = (page, pageSize) => {
        setPage(page);
        setPageSize(pageSize);
    };

    const onSortChange = (value) => {
        setSort(value);
    };

    const onOrderChange = (value) => {
        setOrder(value);
    };

    return (
        <div style={{ margin: '5%' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    {userRole === Roles.ROLE_SUPERUSER && <Button type="primary" style={{ marginRight: 10 }}><Link to="/books/create">Create</Link></Button>}
                    <Input
                        placeholder="Search..."
                        onChange={(e) => debounced(e.target.value)}
                        style={{ width: 200, marginRight: 10 }}
                    />
                    <Select
                        placeholder="Sort by"
                        style={{ width: 120, marginRight: 10 }}
                        onChange={onSortChange}
                    >
                        <Option value="Quantity">Quantity</Option>
                        <Option value="Body">Body</Option>
                        <Option value="Title">Title</Option>
                    </Select>
                    <Select
                        placeholder="Order"
                        style={{ width: 120, marginRight: 10 }}
                        onChange={onOrderChange}
                    >
                        <Option value="ASC">Asc</Option>
                        <Option value="DESC">Desc</Option>
                    </Select>
                    <Button type="primary">Search</Button>
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
                    {books.map((book, index) => (
                        <Col key={index} span={6}>
                            <BookItem book={book} />
                        </Col>
                    ))}
                </Row>
            </Spin>
        </div>
    );
}
export default BookIndex
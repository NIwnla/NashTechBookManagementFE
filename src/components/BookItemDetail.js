import { Card } from "antd" 

const BookItemDetail = (props) => {
    const { Meta } = Card;
    const getCategoriesName = () => {
        if (props.book?.categories){
           return props.book?.categories.map(category => category.name);
        }
        return '';
    }
    return (
        <Card
            hoverable
            style={{ width: 500 }}
        >
            <Meta title={props.book?.title} description={`Category: ${getCategoriesName()}`} />
            <p>{props.book?.body}</p>
            <p>Quantity: {props.book?.quantity}</p>
        </Card>
    )
}

export default BookItemDetail
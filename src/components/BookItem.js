import { Link } from 'react-router-dom';
import './BookItem.css';
const BookItem = (props) => {
    const firstThreeCategories = props.book?.categories.slice(0, 3);
    const remainingCategories = props.book?.categories.slice(3);
    const categoriesName = firstThreeCategories.map(category => category.name)
    return (
        <Link to={`/books/${props.book?.id}`} className="book-link">
            <div className="book-container">
                <h2>{props.book?.title}</h2>
                <p>Categories: {categoriesName.join(', ')} {remainingCategories.length > 0 && ` +${remainingCategories.length}`}</p>
                <p>Quantity: {props?.book?.quantity}</p>
            </div>
        </Link>
    );
}
export default BookItem
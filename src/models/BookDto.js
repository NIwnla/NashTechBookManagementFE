class BookDto {
    constructor(id, title, body, quantity, categories = []) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.quantity = quantity;
        this.categories = categories;
    }
}

export default BookDto;

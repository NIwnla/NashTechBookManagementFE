import BookBorrowingRequestDetailDto from './BookBorrowingRequestDetailDto';

class BookBorrowingRequestDto {
    constructor(id, requesterName, title, description, dateRequested, expireDate, requestType, approverName = null, details = []) {
        this.id = id;
        this.requesterName = requesterName;
        this.approverName = approverName;
        this.title = title;
        this.description = description;
        this.dateRequested = dateRequested;
        this.expireDate = expireDate;
        this.requestType = requestType;
        this.details = details.map(detail => new BookBorrowingRequestDetailDto(detail.id, detail.bookName, detail.requestStatus));
    }
}

export default BookBorrowingRequestDto;

class PaginatedList {
    constructor(items, pageIndex, totalPages, totalCount, hasPreviousPage, hasNextPage) {
        this.items = items;
        this.pageIndex = pageIndex;
        this.totalPages = totalPages;
        this.totalCount = totalCount;
        this.hasNextPage = hasNextPage;
        this.hasPreviousPage = hasPreviousPage;
    }
}

export default PaginatedList;

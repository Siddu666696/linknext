import { useState } from 'react';

function UsePagination(initialLimit = 10, initialTotalCount = 0) {
    const [limit, setLimit] = useState(initialLimit);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(initialTotalCount);

    return {
        limit,
        setLimit,
        offset,
        setOffset,
        currentPage,
        setCurrentPage,
        totalCount,
        setTotalCount
    };
}

export default UsePagination;

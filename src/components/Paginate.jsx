import React from 'react';

const Paginate = ({ currentPage, pageNumbers, handlePreviousPage, handleNextPage, handlePageClick }) => {
    return (
        <div className="pagination">
            <button className="previous-next" onClick={handlePreviousPage}>
                Previous
            </button>

            {pageNumbers.map((number, index) => (
                <React.Fragment key={number}>
                    {index > 0 && pageNumbers[index - 1] !== number - 1 && <span>...</span>}
                    <button
                        className={number === currentPage ? "current-page" : ""}
                        onClick={() => handlePageClick(number)}
                    >
                        {number}
                    </button>
                </React.Fragment>
            ))}

            <button className="previous-next" onClick={handleNextPage}>
                Next
            </button>
        </div>
    );
};

export default Paginate;

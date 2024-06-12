import React from "react";

const Pagination = ({ currentPage, lastPage }) => {
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < lastPage ? currentPage + 1 : null;
    console.log(prevPage, nextPage);

    return (
        <div className="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between">
            <span className="text-xs text-gray-900 xs:text-sm">
                Showing page {currentPage} of {lastPage}
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
                {prevPage && (
                    <a
                        href={`/users?page=${prevPage}`}
                        className="px-4 py-2 text-sm font-semibold transition duration-150 bg-indigo-600 rounded-l text-indigo-50 hover:bg-indigo-500"
                    >
                        Prev
                    </a>
                )}
                {nextPage && (
                    <a
                        href={`/users?page=${nextPage}`}
                        className="px-4 py-2 text-sm font-semibold transition duration-150 bg-indigo-600 rounded-r text-indigo-50 hover:bg-indigo-500"
                    >
                        Next
                    </a>
                )}
            </div>
        </div>
    );
};

export default Pagination;

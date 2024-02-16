import Link from "next/link";
import { FC } from "react";

interface IPaginationBar {
  currentPage: number;
  totalPage: number;
}

const PaginationBar: FC<IPaginationBar> = ({ currentPage, totalPage }) => {
  const maxPage = Math.min(totalPage, Math.max(currentPage + 3, 10));
  const minPage = Math.max(1, Math.min(currentPage - 3, maxPage - 6));

  const numberPageItem: JSX.Element[] = [];

  for (let page = minPage; page <= maxPage; page++) {
    numberPageItem.push(
      <Link
        key={page}
        href={"?page=" + page}
        className={`join-item btn ${currentPage === page ? "btn-active pointer-events-none" : ""}`}
      >
        {page}
      </Link>,
    );
  }

  return (
    <>
      <div className="join block sm:hidden">
        {currentPage > 1 && (
          <Link className="btn join-item" href={"?page=" + (currentPage - 1)}>
            «
          </Link>
        )}
        <button className="join-item btn pointer-events-none">
          Page {currentPage}
        </button>
        {currentPage < totalPage && (
          <Link className="btn join-item" href={"?page=" + (currentPage + 1)}>
            »
          </Link>
        )}
      </div>
      <div className="join hidden sm:block">{numberPageItem}</div>
    </>
  );
};

export default PaginationBar;

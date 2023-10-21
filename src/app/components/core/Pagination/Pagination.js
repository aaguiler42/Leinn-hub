"use client";
import { createContext, useContext, useEffect, useState } from "react";

const paginationContext = createContext();

const PaginationContextProvider = ({ children }) => {
  const [page, setPage] = useState(1);

  return (
    <paginationContext.Provider value={{ page, setPage }}>
      {children}
    </paginationContext.Provider>
  );
};

const usePagination = () => {
  const { page, setPage, numberOfPages } = useContext(paginationContext);
  const nextPage = () => setPage(page + 1);
  const previousPage = () => setPage(page - 1);
  return { page, nextPage, previousPage, numberOfPages };
};

export default function Pagination({ children }) {
  return <PaginationContextProvider>{children}</PaginationContextProvider>;
}

const Page = ({
  pageNumber,
  children,
  canEnter,
  onLastPage,
  numberOfPages,
}) => {
  const { page, nextPage } = usePagination();

  useEffect(() => {
    if (page !== pageNumber) return;

    const onEnter = () => {
      if (!canEnter) {
        return;
      }

      if (page < numberOfPages) {
        nextPage();
        return;
      }

      onLastPage();
    };

    const onEnterWrapper = (e) => {
      if (e.key === "Enter") {
        onEnter();
      }
    };
    window.addEventListener("keydown", onEnterWrapper);

    return () => {
      window.removeEventListener("keydown", onEnterWrapper);
    };
  }, [canEnter, page, pageNumber, numberOfPages, onLastPage, nextPage]);

  if (page !== pageNumber) return null;

  return children;
};

Pagination.Page = Page;

const PaginationChange = ({ children }) => {
  const { page, nextPage, previousPage, numberOfPages } = usePagination();

  return children({ page, nextPage, previousPage, numberOfPages });
};

Pagination.Change = PaginationChange;

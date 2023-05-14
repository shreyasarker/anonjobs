import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";

const Paginate = (props) => {
  const router = useRouter();
  const [lastPage, setLastPage] = useState(1);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    setLastPage(props.data.meta.last_page);
    setSelected(props.data.meta.current_page);
  }, [props]);

  const handlePageChange = (e) => {
    const page = e.selected;
    const path = router.asPath
    const query = router.query
    query.page = page + 1;
    console.log(path);
    console.log(query);
    router.push({
      pathname: path,
      query: query,
    },
    path);
    
  };
  return (
    <ReactPaginate
      breakLabel="..."
      marginPagesDisplayed={2}
      pageCount={lastPage}
      previousLabel="< Prev"
      nextLabel="Next >"
      className="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      activeClassName="active"
      onPageChange={handlePageChange}
      forcePage={selected-1}
    />
  );
};

export default Paginate;

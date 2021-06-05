import { useState, useEffect } from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: 'white',
    height: '50px',
    background: 'black',
    padding: '0 20px',
  },
  item: {
    margin: '5px 10px',
    cursor: 'pointer',
  },
  selected: {
    margin: '5px',
    color: 'coral',
    fontSize: '1.22em',
    cursor: 'pointer',
  },
  perPageSelect: {
    margin: '0px 10px',
    borderRadius: '5px',
    background: 'black',
    color: 'white',
  },
  numberOfRows: {
    margin: '0px 10px',
  },
};

const Paginate = ({
  data,
  setData,
  itemsPerPage,
  setPerPage,
  perPageOptions,
  showNumberOfRowsIndicator = false,
  showFirstLastButton = false,
  showPageNumbers = false,
}) => {
  const [totalPages, setTotalPages] = useState(0);
  const [pageData, setPageData] = useState({});
  const [clickedOnNumber, setClickedOnNumber] = useState(0);
  const [firstIndexInPage, setFirstIndexInPage] = useState(0);

  useEffect(() => {
    let paginatedDataObject = {};

    let index = 0;
    let dataLength = data.length;
    let chunkArray = [];

    for (index = 0; index < dataLength; index += itemsPerPage) {
      let newChunk = data.slice(index, index + itemsPerPage);
      chunkArray.push(newChunk);
    }

    chunkArray.forEach((chunk, i) => {
      paginatedDataObject[i + 1] = chunk;
    });

    setTotalPages(chunkArray.length);
    setPageData(paginatedDataObject);
    setClickedOnNumber(1);
    setFirstIndexInPage(0);
  }, [data, itemsPerPage]);

  useEffect(() => {
    setData(pageData[`${clickedOnNumber}`] || []);
  }, [pageData, setData, clickedOnNumber]);

  const goToPage = (page) => {
    const numberPage = parseInt(page, 10);
    setFirstIndexInPage(
      itemsPerPage * (numberPage - 1) -
        (numberPage === 1 || numberPage === totalPages ? 0 : 1)
    );
    setClickedOnNumber(numberPage);
  };

  const goToFirstPage = () => {
    setFirstIndexInPage(0);
    setClickedOnNumber(1);
  };

  const goToLastPage = () => {
    setFirstIndexInPage(itemsPerPage * (totalPages - 1));
    setClickedOnNumber(totalPages);
  };

  const goToPreviousPage = () => {
    if (clickedOnNumber - 1 >= 1) {
      setClickedOnNumber(clickedOnNumber - 1);
      setFirstIndexInPage(itemsPerPage * (clickedOnNumber - 1) - itemsPerPage);
    }
  };

  const goToNextPage = () => {
    if (clickedOnNumber + 1 <= totalPages) {
      setClickedOnNumber(clickedOnNumber + 1);
      setFirstIndexInPage(itemsPerPage * (clickedOnNumber + 1) - itemsPerPage);
    }
  };

  const getSelectValue = (e) => {
    setClickedOnNumber(1);
    setPerPage(parseInt(e.target.value, 10));
  };

  return (
    <>
      {Object.keys(pageData).length > 0 && (
        <div style={styles.container}>
          {/* Select rows per Page */}
          <span>Filas por página</span>
          <select
            style={styles.perPageSelect}
            onChange={getSelectValue}
            name="perPage"
            defaultValue={itemsPerPage}
          >
            {perPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Rows in page indicator ( 1-10 de 25) */}
          {showNumberOfRowsIndicator && (
            <span style={styles.numberOfRows}>
              {firstIndexInPage + 1} -{' '}
              {clickedOnNumber === totalPages
                ? data.length
                : clickedOnNumber * itemsPerPage}{' '}
              de {data.length}
            </span>
          )}

          {/*Page numbers navigator ( 1 2 3 ...) */}
          {showPageNumbers &&
            Object.keys(pageData).map((page) => (
              <span
                style={
                  clickedOnNumber.toString() === page
                    ? styles.selected
                    : styles.item
                }
                key={page}
                onClick={() => goToPage(page)}
              >
                {page}
              </span>
            ))}

          {/*Pagination controls (<< < > >>) */}

          {showFirstLastButton && clickedOnNumber > 1 && (
            <span style={styles.item} onClick={goToFirstPage}>
              {' '}
              &lt;&lt;{' '}
            </span>
          )}
          {clickedOnNumber > 1 && (
            <span style={styles.item} onClick={goToPreviousPage}>
              {' '}
              &lt;{' '}
            </span>
          )}

          {clickedOnNumber < totalPages && (
            <span style={styles.item} onClick={goToNextPage}>
              {' '}
              &gt;{' '}
            </span>
          )}
          {showFirstLastButton && clickedOnNumber < totalPages && (
            <span style={styles.item} onClick={goToLastPage}>
              {' '}
              &gt;&gt;{' '}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default Paginate;

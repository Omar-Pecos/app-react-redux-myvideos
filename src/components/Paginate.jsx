import React, { useState, useEffect } from 'react';

/* interface PaginateProps {
  data: Array<any>;
  setData: Function;
  itemsPerPage: number;
}  */

const Paginate = ({
  data,
  setData,
  itemsPerPage,
  setPerPage,
  perPageOptions,
}) => {
  const [totalPages, setTotalPages] = useState(0);
  const [pageData, setPageData] = useState({});
  const [clickedOnNumber, setClickedOnNumber] = useState(0);

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
      margin: '5px',
      cursor: 'pointer',
    },
    selected: {
      margin: '5px',
      color: 'coral',
      fontSize: '1.22em',
      cursor: 'pointer',
    },
    perPageSelect: {
      marginLeft: '10px',
      background: 'black',
      color: 'white',
    },
  };

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

    console.log('itemsPerPage >', itemsPerPage);
    console.log(paginatedDataObject);

    setTotalPages(chunkArray.length);
    setPageData(paginatedDataObject);
    setClickedOnNumber(1);
  }, [data, itemsPerPage]);

  useEffect(() => {
    console.log(pageData);
    setData(pageData[`${clickedOnNumber}`] || []);
  }, [pageData, setData, clickedOnNumber]);

  const goToPage = (page) => {
    setClickedOnNumber(parseInt(page, 10));
  };

  const goToFirstPage = () => {
    setClickedOnNumber(1);
  };

  const goToLastPage = () => {
    setClickedOnNumber(totalPages);
  };

  const goToPreviousPage = () => {
    if (clickedOnNumber - 1 >= 1) {
      setClickedOnNumber(clickedOnNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (clickedOnNumber + 1 <= totalPages) {
      setClickedOnNumber(clickedOnNumber + 1);
    }
  };

  const getSelectValue = (e) => {
    setClickedOnNumber(1);
    setPerPage(parseInt(e.target.value, 10));
  };

  return (
    <>
      {Object.keys(pageData).length && (
        <div style={styles.container}>
          {clickedOnNumber > 1 && (
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

          {Object.keys(pageData).map((page) => (
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

          {clickedOnNumber < totalPages && (
            <span style={styles.item} onClick={goToNextPage}>
              {' '}
              &gt;{' '}
            </span>
          )}
          {clickedOnNumber < totalPages && (
            <span style={styles.item} onClick={goToLastPage}>
              {' '}
              &gt;&gt;{' '}
            </span>
          )}

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
        </div>
      )}
    </>
  );
};

export default Paginate;

import React, { useState } from 'react';
import Loading from '../components/Loading';
import Paginate from '../components/Paginate';

const datos = [
  { name: 'hola' + 1, number: 1 },
  { name: 'hola' + 2, number: 2 },
  { name: 'hola' + 3, number: 3 },
  { name: 'hola' + 4, number: 4 },
  { name: 'hola' + 5, number: 5 },
  { name: 'hola' + 6, number: 6 },
  { name: 'hola' + 7, number: 7 },
  { name: 'hola' + 8, number: 8 },
  { name: 'hola' + 9, number: 9 },
  { name: 'hola' + 10, number: 10 },
  { name: 'hola' + 11, number: 11 },
];

const Test: React.FC = () => {
  const [allData] = useState(datos);
  const [displayData, setData] = useState([]);
  const [perPage, setPerPage] = useState(3);

  return (
    <div>
      <h1>Test Page</h1>
      {displayData.length === 0 ? (
        <div style={{ padding: '5em' }}>
          No hay resultados para paginar :/
          <Loading />
        </div>
      ) : (
        displayData.map((dato: any) => (
          <div
            style={{ border: '2px solid plum', padding: '1em', margin: '1em' }}
            key={dato.number}
          >
            <h2>{dato.name}</h2>
            <h4>{dato.number}</h4>
          </div>
        ))
      )}
      <Paginate
        data={allData}
        setData={setData}
        itemsPerPage={perPage}
        setPerPage={setPerPage}
        perPageOptions={[1, 3, 5, 10, 20]}
        showNumberOfRowsIndicator={true}
        /* showFirstLastButton={true}
        showPageNumbers={true} */
      />
    </div>
  );
};

export default Test;

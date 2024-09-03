import React, { useState } from 'react';
import { RegisterCentro } from '../components/areas/RegisterCentro';
import GlobalTable from '../components/componets_globals/GlobalTable';
import UpdateCentro from '../components/areas/UpdateCentro';
import DeleteCentro from '../components/areas/DeleteCentro';
import CardComponent from '../components/CardComponent';
import { Input } from '@nextui-org/react';

export const CentrosPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    'id',
    'nombre',
    'municipio_nombre',
    'date_created',
    'date_modified',
  ];

  return (
    <>
      <main className='w-full p-3 h-screen'>
        <div className='my-5 flex flex-col py-5'>
          <CardComponent title="Modulo Centros" />
          <RegisterCentro />
          <div className='w-full flex  mt-5'>
            <input 
              type="text" 
              placeholder='Buscar movimientos...' 
              className='h-[40px] border-gray-400 border p-3 w-56 rounded-lg  text-lg ' 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
            />
          </div>
          <GlobalTable 
            columns={columns} 
            dataEndpoint="centro/" 
            searchTerm={searchTerm}
            updateComponent={UpdateCentro}
            deleteComponent={DeleteCentro}
          />
        </div>
      </main>
    </>
  );
};

export default CentrosPage;

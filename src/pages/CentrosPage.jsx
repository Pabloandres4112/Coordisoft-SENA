import React, { useState } from 'react';
import { RegisterCentro } from '../components/areas/RegisterCentro';
import GlobalTable from '../components/componets_globals/GlobalTable';
import UpdateCentro from '../components/areas/UpdateCentro';
import DeleteCentro from '../components/areas/DeleteCentro';
import CardComponent from '../components/CardComponent';

export const CentrosPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshTable, setRefreshTable] = useState(false); // Estado para refrescar la tabla

  const columns = [
    'id',
    'nombre',
    'municipio_nombre',
    'date_created',
    'date_modified',
  ];
  const columnNames = {
    'id':'ID',
    'nombre':'Nombre Centro',
    'municipio_nombre':'Municipio',
    'date_created':'decha de creacion',
    'date_modified':'fecha',
  };

  const handleRefresh = () => {
    setRefreshTable(prev => !prev); // Cambiar el estado para refrescar la tabla
  };

  return (
    <>
      <main className='w-full p-3 h-screen'>
        <div className='my-5 flex flex-col py-5'>
          <CardComponent title="Modulo Centros" />
          <RegisterCentro onSuccess={handleRefresh} /> {/* Pasar función de refresco */}
          <div className='w-full flex mt-5'>
            <input 
              type="text" 
              placeholder='Buscar centros...' 
              className='h-[40px] border-gray-400 border p-3 w-56 rounded-lg text-lg' 
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
            refreshTrigger={refreshTable} // Pasar estado de refresco
          />
        </div>
      </main>
    </>
  );
};

export default CentrosPage;

import React from 'react';
import { RegisterArea } from '../components/areas/RegisterArea';
import GlobalTable from '../components/componets_globals/GlobalTable';
import UpdateArea from '../components/areas/UpdateArea';
import DeleteArea from '../components/areas/DeleteArea'; // Asegúrate de importar correctamente el componente DeleteArea
import CardComponent from '../components/CardComponent';


export const AreasPage = () => {
  const columns = [
    'id',
    'nombre_area',
    'date_created',
    'date_modified'
  ];



  return (
    <>
      <main className='w-full p-3 h-screen'>
        <div className='my-5 flex flex-col py-5'>

          <CardComponent title="Modulo Areas"  />
          <RegisterArea />
          <GlobalTable 
            columns={columns} 
            dataEndpoint="area/" 
            updateComponent={UpdateArea} 
            deleteComponent={DeleteArea} 
          />
        </div>

      </main>
    </>
  );
};

export default AreasPage;

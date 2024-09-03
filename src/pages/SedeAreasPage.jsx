import React, { useState } from 'react';
import RegisterAreaSede from '../components/areas/RegisterAreaSede';
import GlobalTable from '../components/componets_globals/GlobalTable';
import UpdateAreaSede from '../components/areas/UpdateAreaSede'; 
import DeleteAreaSede from '../components/areas/DeleteAreaSede'; 
import CardComponent from '../components/CardComponent';

export const SedeAreasPage = () => {
  const columns2 = [
    'id',
    'sede_area',
    'area_AreaSede',
    'persona_administra',
    'date_created',
    'date_modified'
  ];
  const [searchTerm, setSearchTerm] = useState(''); 

  return (
    <>
      <main className='w-full px-7'>
        <div className='my-5 flex flex-col py-5'>
          
          <CardComponent title="Modulo Area Sede" />
          <RegisterAreaSede />
          <div className='w-full flex mt-5'>
            <input 
              type="text" 
              placeholder='Buscar usuarios...' 
              className='h-[40px] border-gray-400 border p-3 w-56 rounded-lg text-lg' 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          <GlobalTable 
            columns={columns2} 
            dataEndpoint="areaSede/" 
            searchTerm={searchTerm} // Pasar searchTerm a GlobalTable
            updateComponent={UpdateAreaSede} 
            deleteComponent={DeleteAreaSede} 
          />
        </div>
      </main>
    </>
  );
};

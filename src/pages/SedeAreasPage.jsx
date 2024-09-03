import React from 'react';
import RegisterAreaSede from '../components/areas/RegisterAreaSede';
import GlobalTable from '../components/componets_globals/GlobalTable';
import UpdateAreaSede from '../components/areas/UpdateAreaSede'; // Asegúrate de importar correctamente el componente UpdateAreaSede
import DeleteAreaSede from '../components/areas/DeleteAreaSede'; // Asegúrate de importar correctamente el componente DeleteAreaSede
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


  return (
    <>
         <main className='w-full px-7'>
 
        <div className='my-5 flex flex-col py-5'>

            <CardComponent title="Modulo Area Sede"/>
          <RegisterAreaSede />
          <GlobalTable 
            columns={columns2} 
            dataEndpoint="areaSede/" 
            updateComponent={UpdateAreaSede} 
            deleteComponent={DeleteAreaSede} 
          />
        </div>
      </main>
    </>
  )
}





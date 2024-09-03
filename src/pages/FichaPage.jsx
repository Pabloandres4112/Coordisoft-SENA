import React, { useState } from 'react';
import GlobalTable from '../components/componets_globals/GlobalTable';
import CardComponent from '../components/CardComponent';
import RegistroFicha from '../components/ficha/RegistroFicha';
import DeleteFicha from '../components/ficha/DelectFicha';

export const FichaPage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for searchTerm
  const [refreshTable, setRefreshTable] = useState(false); // State for triggering table refresh

  // Define the columns to match the API response
  const columns = [
    'id',
    'persona_ficha.username',
    'persona_ficha.email',
    'persona_ficha.Cedula_persona',
    'persona_ficha.Edad_persona',
    'persona_ficha.Telefono_persona',
    'persona_ficha.first_name',
    'persona_ficha.last_name',
    'programa.nombre_programa',
    'programa.area_programa.nombre_area',
    'date_created',
    'date_modified',
  ];

  const handleRefresh = () => {
    setRefreshTable(prev => !prev); // Toggle the refresh state
  };

  return (
    <main className='w-full p-3 h-screen'>
      <div className='my-5 flex flex-col py-5'>
        <CardComponent title="Modulo Fichas" />
        <RegistroFicha onRegisterSuccess={handleRefresh} /> {/* Pass the refresh function */}
        <div className='w-full flex mt-5'>
          <input 
            type="text" 
            placeholder='Buscar fichas...' 
            className='h-[40px] border-gray-400 border p-3 w-56 rounded-lg text-lg' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
        </div>
        <GlobalTable 
          columns={columns} 
          dataEndpoint="ficha/" 
          searchTerm={searchTerm} // Pass the search term
          updateComponent={null} // Update component (if needed)
          deleteComponent={DeleteFicha} // Delete component (if needed)
          refreshTrigger={refreshTable} // Pass the refresh trigger
        />
      </div>
    </main>
  );
};

export default FichaPage;

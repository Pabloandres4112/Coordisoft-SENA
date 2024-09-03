// UserPage.jsx
import React from 'react';
import GlobalTable from '../components/componets_globals/GlobalTable';
import ViewUserModal from '../components/user/ModalUser';
import CardComponent from '../components/CardComponent';
import RegisterUser from '../components/user/registerUser';

const UserPage = () => {
  const columns = ["id", "username", "email"];  // Ensure these match the API response keys
  const dataEndpoint = "auth/users/";

  return (
    <div>
      <CardComponent title="Modulo Usuarios"  />
      <RegisterUser />
      <GlobalTable 
        columns={columns} 
        dataEndpoint={dataEndpoint} 
        viewComponent={ViewUserModal} 
      />
    </div>
  );
};

export default UserPage;

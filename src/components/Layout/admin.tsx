import { Button } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { logout } from 'features/authentication/authenticationSlice';
import * as React from 'react';
import { useHistory } from 'react-router';
export interface AdminLayoutProps {}
const AdminLayout = (props: AdminLayoutProps) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    const action = logout();
    dispatch(action);
  };
  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
export default AdminLayout;

import * as React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { login } from '../authenticationSlice';
import { useHistory } from 'react-router';
export interface LoginPageProps {}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    minHeight: '100vh',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: '0.5rem',
    backgroundColor: 'white',
    border: '1px solid rgb(231, 216, 216)',
    padding: '1rem',
  },
  title: {
    color: 'black',
    fontSize: '1rem',
  },
}));
const LoginPage = (props: LoginPageProps) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const onClickLogin = () => {
    const action = login({
      username: 'vanty',
      password: '123456',
    });
    dispatch(action);
  };
  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <div className={classes.title}>Student Management</div>
        <div style={{ marginTop: '1rem' }}>
          <Button onClick={onClickLogin} color="primary" variant="contained">
            FAKE LOGIN
          </Button>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;

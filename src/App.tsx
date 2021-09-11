import cityApi from 'api/cityApi';
import studentApi from 'api/studentApi';

import NotFound from 'components/Common/notfound';
import PrivateRoute from 'components/Common/privateroute';
import AdminLayout from 'components/Layout/admin';
import LoginPage from 'features/authentication/pages/loginpage';
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';

function App() {
  const getAllStudent = async () => {
    try {
      // dispatch({ type: ACTION.LOADING, data: true })
      const res = await studentApi.getAll({ _limit: 10, _page: 1, _order: 'asc', _sort: '' });
      console.log(res);
      // if (res.status === 200) {
      // }
      // res.data.forEach((values, index) => {
      //   if(values.)
      // })
      //dispatch({ type: ACTION.LOADING, data: false })
    } catch (error) {
      console.log(error);
      //dispatch({ type: ACTION.LOADING, data: false })
    }
  };
  useEffect(() => {
    getAllStudent();
  }, []);
  const getAllCity = async () => {
    try {
      // dispatch({ type: ACTION.LOADING, data: true })
      const res = await cityApi.getAll();
      console.log(res);
      // if (res.status === 200) {
      // }
      // res.data.forEach((values, index) => {
      //   if(values.)
      // })
      //dispatch({ type: ACTION.LOADING, data: false })
    } catch (error) {
      console.log(error);
      //dispatch({ type: ACTION.LOADING, data: false })
    }
  };
  useEffect(() => {
    getAllCity();
  }, []);
  return (
    <Switch>
      <Route path="/" exact>
        <LoginPage />
      </Route>
      <PrivateRoute path="/admin">
        <AdminLayout />
      </PrivateRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;

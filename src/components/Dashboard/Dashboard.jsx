import React from 'react';
import { observer } from 'mobx-react-lite';
import  Departments  from '../Departments/Departments';
import Users from '../Users/Users';
import Header from '../Header/Header';

const Dashboard = observer(() => {

  return (
    <>
        <Header/>
        <main>
            <Users/>
            <Departments/>
        </main>
    </>
  );
});

export default Dashboard;
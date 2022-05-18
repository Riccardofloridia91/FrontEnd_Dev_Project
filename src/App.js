import './App.css';
import {  BrowserRouter,  Routes,  Route,   NavLink} from"react-router-dom";
import React from 'react';
import Customerlist from './components/CustomerList';
import Traininglist from './components/Training';
import CalendarPage from './components/Schedule';
import Chart from './components/Graph';







function App() {


  const trainingsURL = 'https://customerrest.herokuapp.com/api/trainings/'

  const styles = {
    tab: {
        color: '#00394e',
        fontWeight: 'none',
        margin: '30px',
        position: 'relative',
        padding: '1004px',
        border: '60px', 
    }, 
    title: {
      

      color: '#00394e',
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor:'grey',
      width: '50%',
      positon:'center',
      margin:'auto',
      padding: '20px'

      
      
  }
  }

  
 
  return (
    <div style={{textAlign: 'center', marginLeft: '100px', marginRight:'100px'}}>
          <h1 style={styles.title}> 
          PERSONAL TRAINER</h1>
          


   
  <BrowserRouter >
  
  <NavLink 
        to="/"
        style={({ isActive }) => (isActive ? {color: 'red',
        textDecoration: 'none',
        padding: '20px',} : 
        {color: '#00394e',
        padding: '20px',
        textDecoration: 'none',})}>
        CUSTOMERS
  </NavLink>
  <NavLink
        to="/training"
        style={({ isActive }) => (isActive ? {color: 'red',
        textDecoration: 'none',
        padding: '20px',} : 
        {color: '#00394e',
        padding: '20px',
        textDecoration: 'none',})}>
        TRAINING
  </NavLink>
  <NavLink
        to="/chart"
        style={({ isActive }) => (isActive ? {color: 'red',
        textDecoration: 'none',
        padding: '20px',} : 
        {color: '#00394e',
        padding: '20px',
        textDecoration: 'none',})}>
        STATS
  </NavLink>
  <NavLink
        to="/calendar"
        style={({ isActive }) => (isActive ? {color: 'red',
        textDecoration: 'none',
        padding: '20px',} : 
        {color: '#00394e',
        padding: '20px',
        textDecoration: 'none',})}>
        SCHEDULE
  </NavLink>
 

  <Routes>
  <Route path="/"element={<Customerlist />} />
  <Route path="/training"element={<Traininglist link={trainingsURL}/>} />
  <Route path="/calendar"element={<CalendarPage link={trainingsURL}/>} />
  <Route path="/chart"element={<Chart link={trainingsURL}/>}/>

</Routes>
  </BrowserRouter>

  </div>
  )
}

export default App;

import { useState, ChangeEvent  } from 'react';
import React from 'react'
import Search from './components/search';
import './App.css'


const App = () => {


    return (
      <div className='main'>
        <h1>Weather App</h1>
        
        <Search />
      </div>
    )
  }


export default App

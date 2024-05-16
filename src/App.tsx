import { useState } from 'react';
import './App.css'

async function App() {
  const apiKey = import.meta.env.VITE_REACT_API_URL;
  console.log(apiKey)
  const url = "http://api.weatherapi.com/v1"
  let result = await fetch(`${url}/current.json?key=${apiKey}&q=London&aqi=no`)
  let data = await result.json()
  console.log(data)
  return (
    <div> Test </div>
  )
}

export default App

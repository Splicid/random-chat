import { useState, ChangeEvent  } from 'react';
import React from 'react'
import './App.css'

const apiKey = import.meta.env.VITE_API_URL;

interface myStates {
  weather: any,
  location: string,
  zipcode: number,
}

class App extends React.Component<{}, myStates> {
  constructor(props: {}) {
    super(props);
    this.state = {
      weather: null,
      location: "",
      zipcode: 0,
    }
  }

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = "http://api.weatherapi.com/v1"
    const location = this.state.location
    let result = await fetch(`${url}/current.json?key=${apiKey}&q=${location}&aqi=no`)
    let data = await result.json()
    this.setState({ weather: data })
  }

  render() {
    return (
      <div className='main'>
        <h1>Weather App</h1>
        <form onSubmit={this.handleSubmit}>
          <input 
          type="text"
          placeholder="Enter a location"
          value={this.state.location}
          className='search-bar'
          onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({location: e.target.value})}
           />
          <button>Search</button>
        </form>

        <div className='main-card'>
          <h2 className='card-title'>Current Weather</h2>
          {this.state.weather ? (
            <div className='card-data'>
              <h3>{this.state.weather.location.name}</h3>
              <p>{this.state.weather.current.temp_c}°C</p>
              <img src={this.state.weather.current.condition.icon} alt="weather icon" />
              <p>{this.state.weather.current.condition.text}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    )
  }
}

export default App

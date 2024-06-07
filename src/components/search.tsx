import raw from "../../majorCities.txt";
import { useState, ChangeEvent  } from 'react';
import React from 'react'
import Select from 'react-select';
import SingleValue from 'react-select'
import Trie from "./tierAlgo";

interface myStates {
    weather: any,
    location: string,
    zipcode: number,
    suggestion: string,
}

const cities: any[] = []
const cityOptions: string[] = []
const apiKey = import.meta.env.VITE_API_URL;
let trie = new Trie()

fetch(raw)
  .then(r => r.text())
  .then(text => {
      const majorCities = text.split("\n")
      majorCities.forEach(city => {
          cities.push({label: city, value: city})
        })
    })


class Search extends React.Component<{}, myStates> {
    constructor(props: {}) {
        super(props);
        this.state = {
          weather: null,
          location: "",
          zipcode: 0,
          suggestion: ""
        }
    }

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!this.state.location) {
          alert("Please enter a location")
          return
        } else {
          const url = "http://api.weatherapi.com/v1"
          const location = this.state.location
          let result = await fetch(`${url}/current.json?key=${apiKey}&q=${location}&aqi=no`)
          let data = await result.json()
          this.setState({ weather: data })
        }
    }


    render() {
        const suggestion  = this.state.location;
        let sugg = trie.suggestions(suggestion) 
        
        return (
            <div className="search-form">
                <form className="weather-form" onSubmit={this.handleSubmit}>
                    <Select 
                        placeholder="Enter a location"
                        className='search-bar'
                        options={cities}
                        onChange={(selectedOption) => {
                            if (selectedOption) {
                            this.setState({location: selectedOption.value});
                            }
                        }}
                    />
                    <button className='card-submit'>Search</button>
                </form>
    
                <div className='main-card'>
                    <h2 className='card-title'>Current Weather</h2>
                    {this.state.weather ? (
                        <div className='card-data'>
                        <h3>{this.state.weather.location.name}</h3>
                        <p>{this.state.weather.current.temp_f}°F</p>
                        <img src={this.state.weather.current.condition.icon} alt="weather icon" />
                        <p>{this.state.weather.current.condition.text}</p>
                        </div>
                    ) : (
                        <p></p> // Empty paragraph tag for loading state
                    )}
                </div>
            </div>
        )   
    }
}



export default Search
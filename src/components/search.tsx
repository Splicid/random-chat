import raw from "../../majorCities.txt";


const Search = () => {

    const cities: string[] = []

    fetch(raw)
    .then(r => r.text())
    .then(text => {
        const majorCities = text.split("\n")
        majorCities.forEach(city => {
            cities.push(city)
        })
    })

    


    
    return (
        <button> TEST </button>
    )
}



export default Search
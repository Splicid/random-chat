import raw from "../../majorCities.txt";


const Search = () => {

    fetch(raw)
    .then(r => r.text())
    .then(text => {
        const majorCities = text.split("\n")
        console.log(majorCities)
    })

    return (
        <div> Test </div>
    )
}



export default Search
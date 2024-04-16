import { useState, useEffect } from "react";
import axios from "axios";
import Display from "./components/Display";
import Weather from "./components/Weather"

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState(null);
  const [countryNames, setCountryNames] = useState([]);

  const filteredCountries = () => {
    if (countries) {
      return countries.filter((country) =>
        country.name.common
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase())
      );
    }
  };

  const countriesApiUrl = "https://restcountries.com/v3.1/all/";

  useEffect(() => {
    axios
      .get(countriesApiUrl)
      .then((response) => {
        setCountries(response.data);
        const names = response.data.map((country) => country.name.common);
        setCountryNames(names);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="search countries"
        ></input>
      </form>

      <Display countries={filteredCountries()} setSearchValue={setSearchValue}/>
    </>
  );
}

export default App;

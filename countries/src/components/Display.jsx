const Display = ({ countries, setSearchValue }) => {
    const WEATHER_API_KEY = "38b858d9d27970fbb938e1dfd8ffd035"
  if (countries) {
    if (countries.length === 1) {
      const countryName = countries[0].name.common;
      const countryPop = countries[0].population;
      const countryLanguages = countries[0].languages;
      const flag = countries[0].flags.png;
      console.log(countryLanguages);
      return (
        <div>
          <h1>{countryName}</h1>
          <img src={flag} alt="flag"></img>
          <div>population: {countryPop.toLocaleString()}</div>
          <div>
            Languages:
            {Object.entries(countryLanguages).map(([key, value]) => (
              <li>{value}</li>
            ))}
          </div>
        </div>
      );
    }
    if (countries.length < 30) {
      return (
        <div>
          {countries.map((country) => (
            <div>
              <button onClick={() => setSearchValue(country.name.common)}>
                {country.name.common}
              </button>
            </div>
          ))}
        </div>
      );
    }
    return <div>need more specificity</div>;
  }
};

export default Display;

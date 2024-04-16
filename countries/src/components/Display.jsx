import Weather from "./Weather";

const Display = ({ countries, setSearchValue }) => {
  if (countries) {
    if (countries.length === 1) {
      const countryName = countries[0].name.common;
      const countryCapital = countries[0].capital
      const countryPop = countries[0].population;
      const countryLanguages = countries[0].languages;
      const flag = countries[0].flags.png;
      console.log(countryLanguages);
      return (
        <div>
          <h1>{countryName}</h1>
          <img src={flag} alt="flag" width={150}></img>
          <div>population: {countryPop.toLocaleString()}</div>
          <div>capital: {countryCapital}</div>
          <div>
            Languages:
            {Object.entries(countryLanguages).map(([key, value]) => (
              <li key={key}>{value}</li>
            ))}
          </div>
          <Weather city={countryCapital}/>
        </div>
      );
    }
    if (countries.length < 30) {
      return (
        <div>
          {countries.map((country) => (
            <div key={country.name.common}>
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

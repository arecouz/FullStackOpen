const countries = [
    {
      "name": "United States",
      "population": 331449281
    },
    {
      "name": "China",
      "population": 1444216107
    },
    {
      "name": "India",
      "population": 1393409038
    },
    {
      "name": "Brazil",
      "population": 213993437
    }
  ]

  console.log(JSON.stringify(countries))

  const names = countries.map(country => country.name)
  const search = "state"
  console.log(names.filter((name) => name.toLocaleLowerCase().includes(search.toLocaleLowerCase())))

  console.log(countries.name)
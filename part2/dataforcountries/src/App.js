import { useEffect, useState } from "react";
import axios from "axios";

const Country = ({country})=>{

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages</h3>
      <ul>{
        Object.values(country.languages).map(l => <li key={l}>{l}</li>)
      }
      </ul>
      <img src={country.flags.png} alt='no image'/>
    </div>
  )
}

const CountryShow = ({country}) =>{
  const [show, setShow]=useState(false)
  return(
    <div>
      <div key={country.name.common} >
        {country.name.common}
        <button onClick={()=>setShow(!show)}>show</button>
      </div>
      {show?<Country country={country}/>:<></>}
    </div>)
}

const Countries = ({countriesToShow})=>{

  const result = countriesToShow.length>10 
  ? <div>Too many countries, specify another filter</div>
  : countriesToShow.length>1
  ? countriesToShow.map((country)=><CountryShow key={country.name.common} country={country}/>)
  : countriesToShow.length>0 
  ? <Country country={countriesToShow[0]}/>
  : <></>
  return result
}


const App = () =>{
  const [countries,  setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all')
    .then(res=>setCountries(res.data))
  },[])
  // console.log(countries);
  const countriesToShow = countries.filter(country=>country.name.common.toLowerCase().includes(filter.toLowerCase()))
  // console.log(countriesToShow);
  return (
    <div>
      <div>
        find countries 
        <input value={filter} onChange={(event)=>setFilter(event.target.value)} />
      </div>
      <Countries countriesToShow={countriesToShow} />
    </div>
  )
}

export default App;

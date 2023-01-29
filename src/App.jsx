
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loader_first from './componets/Loader_first'
import WeatherCard from './componets/WeatherCard'
import Clouds from './componets/Clouds'


const API_KEY="3362449f7dafac1b70446a6034af3d39"

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temps, setTemps] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  
  const success = (e) => {
    const newCoords = {
      lat: e.coords.latitude,
      lon: e.coords.longitude
    }
    setCoords(newCoords)
  }

  const changeUnitTemp = () => setIsCelsius(!isCelsius)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  },[])

  useEffect( () => {
    if(coords){
      console.log(coords)
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)  
      .then(res => {
//la funcion setTimeut nos retraza la ejecucion de un codigo 
        setTimeout(() => {          
          setWeather(res.data)
          const celsius = (res.data.main.temp - 273.15).toFixed(2);
          const fahrenheit = (celsius * (9/5) + 32).toFixed(2);
          const newTemps = { celsius, fahrenheit }
          setTemps(newTemps)

        },2000)
      })
      .catch(err => console.log(err)) 

    }
  },[coords])

//comienzo de parte para colocar un buscador por pais


  /*Toco colocar {weather && } ya que depende este codigo de un consumo de api y me salia un error en la consola del navegador*/
  return (
    <div className="App">     
      
    { weather ? (
      <Clouds />,
      <WeatherCard weather={weather}
      temps={temps}
      isCelsius={isCelsius}
      changeUnitTemp={changeUnitTemp}
      />
      ) : <Loader_first />
    }
    </div>
  )
}

  export default App

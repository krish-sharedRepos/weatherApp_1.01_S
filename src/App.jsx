import { useState } from 'react'
import './App.css'

/* MUI */
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/* Components */ 
import { Navbar } from './containers/Navbar.jsx';
import { theme } from './theme/theme.js';
import { ClimateView } from './containers/ClimateView.jsx';
import { DataView } from './containers/DataView.jsx';

/* Slice Hooks */
import { useCurrentCityWeatherQuery,useCurrentCoordWeatherQuery,useFiveDayForecastQuery,useSearchCityQuery } from './slices/apiSlice.js';
import { Typography } from '@mui/material';


function App() {

  /* State */
  const [darkMode,setDarkMode] = useState(localStorage.getItem("darkMode")=="false"?false:true);
  const [celsiusMode,setCelsius] = useState(true)
  const [coord,setCoord] = useState(()=>{
    try{
      console.log(JSON.parse(localStorage.getItem("coord")))
      return localStorage.getItem("coord")?JSON.parse(localStorage.getItem("coord")):{lat:40.714,lon:-74.006}
    }catch{
      return {lat:40.714,lon:-74.006}
    }
  })

  /* Consts */
  const sa = appStyle;

  /* Handle Dark Mode */
  const handleDarkMode = (e)=>{
    localStorage.setItem("darkMode",e)
    setDarkMode(e);
  }

  /* Handle Weather Search */
  const handleWeatherSearch = (lat,lon) =>{
    console.log("Calling ",lat,"",lon)
    setCoord({lat:lat,lon:lon})
  }

  /* Handle Unit Change */
  const handleUnitChange = (e) =>{
    console.log(e)
    setCelsius(e)
  }
  /* Slice Hooks */
  //const { data: currentCityWeather, error, isLoading } = useCurrentCityWeatherQuery(city);
  const { data: currentWeather, weatherError, weatherLoading } = useCurrentCoordWeatherQuery(coord)
  const { data: forecastedWeather, forecastError, ForecastLoading} = useFiveDayForecastQuery(coord)

  /* Error Handling */
  if(weatherError || forecastError){
    return <Typography variant='h3'>Something went wrong!</Typography>;
  }
  return (
    <ThemeProvider theme={theme(darkMode)}>
    <CssBaseline />

      <Navbar handleDarkMode={handleDarkMode} defaultTheme={darkMode}/>

      <div style={sa.parentLvl1}>
        {currentWeather && forecastedWeather &&
          <div style={sa.parentLvl2}>
          <ClimateView handleUnitChange={handleUnitChange} search={handleWeatherSearch} humidity={currentWeather.main.humidity} wind={currentWeather.wind.speed} visibility={currentWeather.visibility} clouds={currentWeather.clouds.all} name={currentWeather.name} country={currentWeather.sys.country} desc={currentWeather.weather[0].description} temp={currentWeather.main.temp} iconCode={currentWeather.weather[0].icon}/>
          <DataView data={forecastedWeather.list} celsiusMode={celsiusMode} />
        </div>}
      </div>  

    </ThemeProvider>
  )
}

export default App

const appStyle = {
  parentLvl1:{
    justifyItems:'center',
    maxWidth:'100vw'
  },
  parentLvl2:{
    display:'flex',
    flexDirection:'column',
    height:'auto',
    padding:'10px 10px 10px 15px',
    width:'90%'
  }
}
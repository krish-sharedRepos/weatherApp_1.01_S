import { Box, Button, TextField, Typography, Autocomplete, Snackbar, Alert } from "@mui/material"
import { DataBlocks } from "../components/DataBlocks";
import { useSearchCityQuery } from '../slices/apiSlice.js';
import { useState,useEffect } from "react";
const ClimateView = ({handleUnitChange,country,name,desc,temp,iconCode,humidity,wind,clouds,visibility,search}) => {

    /* Consts */
    const cs = ClimateViewStyles;
    let timeoutId;

    /* State */
    const [cityInput,setCityInput] = useState(true);
    const [searchCity,setSearchCity] = useState("")
    const [celsiusMode,setCelsius] = useState(true)
    const [coordError, setCoordError] = useState(null);
    const [locationError, setLocationError] = useState(null); // State for location error
    const [showSnackbar, setShowSnackbar] = useState(false); // State for Snackbar visibility

    const [coord,setCoord] = useState(()=>{
        try{
          console.log(JSON.parse(localStorage.getItem("coord")))
          return localStorage.getItem("coord")?JSON.parse(localStorage.getItem("coord")):{lat:40.714,lon:-74.006}
        }catch{
          return {lat:40.714,lon:-74.006}
        }
      })

    /* Slice Hooks */
    const { data: cityList, error:cityError, isLoading:cityLoading } = useSearchCityQuery(searchCity)

    
    /* Current Location Fetch */
    const CurrentLocationFetch = () =>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position)=>handleOptionClick({lat:position.coords.latitude,lon:position.coords.longitude}),
                (error)=>{
                    setLocationError(error.message||"Location Error");
                    setShowSnackbar(true); // Show Snackbar on error
                }
            )
        }
    }
    /* City Search */

    const handleIpBatching = (e) =>{
        clearTimeout(timeoutId)
        timeoutId=cityInput?setTimeout(()=>handleSearch(e),1000):setTimeout(()=>handleCoordChange(e),1000)
    }

    const handleSearch = (e) =>{
        console.log(e)
        setSearchCity(e.target.value)
    }

    /* City Weather check based on Lat and Long */
    const handleOptionClick = (e) =>{
        localStorage.setItem("coord", JSON.stringify({ lat: e.lat, lon: e.lon }));
        search(e.lat,e.lon)
    }

    /* Lat and Long Weather Check */
    const handleCoordChange = (e)=>{
        const id = e.target.id;
        const value = parseFloat(e.target.value);

        if(id==="lat" && (value>90 || value<-90)){
            setCoordError("Latitude must be between -90 and 90");
            setCoord(prevCoord => ({ ...prevCoord, lat: null }));
            setShowSnackbar(true);
            return;
        }
        if(id==="lon" && (value>90 || value<-90)){
            setCoordError("Longitude must be between -90 and 90");
            setCoord(prevCoord => ({ ...prevCoord, lon: null }));
            setShowSnackbar(true);
            return;
        }
        setCoord({...coord,[e.target.id]:e.target.value})
        setCoordError(null);
    }
    useEffect(()=>{
        (coord.lat && coord.lon)?search(coord.lat,coord.lon):null;
    },[coord])
    
    /* Initial Current Location Check */
    useEffect(()=>{
        CurrentLocationFetch()
    },[])

    /* Change Temp Unit */
   useEffect(()=>{
        console.log("Changing")
        handleUnitChange(celsiusMode)
   },[celsiusMode])

    return(
        <Box sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',margin:{md:'0px 0px 40px 0px',xs:'0px 0px 30px 0px'}}}>
            <div style={cs.iconParent}>
                <Box sx={{width: { xs: '250px',md:'250px'}}}>
                <img style={{width:'100%'}} src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}></img>
                </Box>
                <Box sx={{display:'flex',width:'100%',justifyContent:'space-around'}}>
                    <DataBlocks parameter="Humidity" data={humidity + " %"}/>
                    <DataBlocks parameter="Wind Speed" data={wind + " m/s"}/>
                    <DataBlocks parameter="Clouds" data={clouds + " %"}/>
                    <DataBlocks parameter="Visibility" data={visibility/1000 + " km"}/>
                </Box>
                
            </div>
            <Box sx={{display:'flex',justifyContent:'space-around',flexDirection:'column',flex:'1',padding:{md:'30px 30px 30px 30px',xs:'15px 10px 10px 10px'}}} style={cs.inputParent}>
                <Typography variant="h4">{name}, {country}</Typography>
                <br/>
                <Typography variant="h4">{celsiusMode?Math.trunc(temp * 10) / 10:Math.trunc((temp * (9 / 5) + 32) * 10) / 10}{" "} {celsiusMode?"°C":"°F"}</Typography>
                <Typography variant="h6">{desc}</Typography>
                <br/>
                {/* <TextField size="small" sx={{width:{md:'170px',xs:'120px'}}} label="Enter City"></TextField> */}
                {cityInput&&<Autocomplete
                    loading={cityLoading}
                    options={cityList||[]}
                    onChange={(e,value)=>handleOptionClick(value)}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params)=>{return <TextField label="Enter City" onChange={(e)=>{handleIpBatching(e)}} {...params}></TextField>}}
                    renderOption={(e,option)=>(
                        <li {...e} key={option.lat+""+option.lon}>{option.name + ", " + option.country + (option.state ? ", " + option.state : "")}</li>
                    )}
                    style={cs.Autocmpl}
                />}
                {!cityInput&&<div style={{display:'flex',alignItems:'flex-end',maxHeight:'fit-content'}}><TextField sx={{flex:'1'}} id="lat" onChange={(e)=>{handleIpBatching(e)}} label="Enter Lattitude"></TextField><TextField sx={{flex:'1'}} id="lon" onChange={(e)=>{handleIpBatching(e)}} label="Enter Longittude"></TextField></div>}
                <div>
                <Button sx={{alignSelf:'flex-start'}}onClick={()=>setCityInput((prevState)=>!prevState)}>{cityInput?'coord':'city'}</Button>
                <Button sx={{alignSelf:'flex-start'}} onClick={()=>CurrentLocationFetch()} >Current Location</Button>
                <Button sx={{justifyContent:'left',alignSelf:'flex-start'}} onClick={()=>setCelsius(!celsiusMode)}>{celsiusMode?"°F":"°C"}</Button>
                </div>
                
            </Box>
            {/* Snackbar for Location Issue */}
            <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={() => setShowSnackbar(false)}>
                <Alert onClose={() => setShowSnackbar(false)} severity="error" sx={{ width: "100%" }}>
                {locationError || coordError}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export {ClimateView};

const ClimateViewStyles = {
    iconParent:{
        flex:'1',
        justifyItems:'center',
        border:'1px solid midnightblue',
        borderRadius:'10px',
        padding:'0px 0px 10px 0px',
    },
    Autocmpl:{

    }
}
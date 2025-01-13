import Weatherchart from "../components/Charts";
import { Typography,Box,TextField,Button } from "@mui/material";
import { ForecastBlocks } from "../components/ForecastBlocks";
import { useMemo } from "react";

const DataView = ({celsiusMode,data}) => {

    /* Error Handling */
    if(!data || data.length ===0){
        return(
            <Typography variant="h6">No Forecast Data Available</Typography>
        )
    }

    /* consts */
    const ds = DataViewStyles;

    /* Functions to process data */
    /* Accumulates the min and max temps for each day */
    const forecastedExtremas = useMemo(()=>{
        return data.reduce((acc,item)=>{
            const date = new Date(item.dt*1000).toISOString().split('T')[0]
            if(!acc[date]){
                acc[date]={minimas:[],maximas:[]}
            }
            acc[date].minimas.push(item.main.temp_min)
            acc[date].maximas.push(item.main.temp_max)
            return acc;
        },{})
    },[data])
    console.log(forecastedExtremas)
    
    /* Finds the max and min from the accumulated data */
    const getDailyExtremes = () =>{
        return Object.keys(forecastedExtremas).reduce((acc,item)=>{
            acc.push({date:item,lowestTemp:Math.min(...forecastedExtremas[item].minimas),highestTemp:Math.max(...forecastedExtremas[item].maximas)})
            return acc;
        },[])
    }

    const forecastData = getDailyExtremes();

    return(
        <div style={ds.parent}>
                <Typography variant="h5" sx={{padding:{xs:'0px 0px 0px 15px',md:'0px 0px 0px 30px'},margin:{md:'0px 0px 25px 0px',xs:'0px 0px 25px 0px'}}}>5 day Forecast</Typography>
                <Box sx={{padding:'10px 0px 10px 0px',border:'1px solid gainsboro',borderRadius:'10px',flexWrap:'wrap',justifyContent:'space-around',display:'flex',width:{xs:'100%'},margin:{md:'0px 0px 10px 0px',sx:'0px 0px 10px 0px'}}}>
                    {forecastData.map((e)=>{return <ForecastBlocks date={e.date.split("-").reverse().join("-")} min={celsiusMode?Math.trunc(e.lowestTemp * 10)/10+" °C":Math.trunc((e.lowestTemp  * (9 / 5) + 32) * 10)/10 + " °F"} max={celsiusMode?Math.trunc(e.highestTemp * 10)/10+" °C":Math.trunc((e.highestTemp  * (9 / 5) + 32) * 10)/10 + " °F"}/>})}
                </Box>

                <Box sx={{margin:{md:'25px 0px 50px 0px',xs:'30px 0px 25px 0px'}}}>
                    <Weatherchart data={forecastData} celsiusMode={celsiusMode}/>
                </Box>
                
        </div>
    )
}

export {DataView};

const DataViewStyles = {
    parent:{
        justifyContent:'center',
    },
    forecastParent:{
        flex:'1',
    },
    chartParent:{
        flex:'1',
    }

}
import { Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Weatherchart({celsiusMode,data }) {
    console.log(data)
    if( !data || data.length == 0){
      return <Typography>No Chart Forecast Available</Typography>
    }
    // Extract high and low temperatures
    const highTemps = data.map(item => {return celsiusMode? Math.round(item.highestTemp * 10) / 10:Math.round((item.highestTemp * (9 / 5) + 32) * 10) / 10});
    const lowTemps = data.map(item => {return celsiusMode?Math.round(item.lowestTemp * 10) / 10:Math.round((item.lowestTemp * (9 / 5) + 32) * 10) / 10});
    const xAxisLabels = data.map(item => item.date.split("-").reverse().join("-"))
    console.log(xAxisLabels)
    return (
      <>
        {/* <Typography variant='h5'>Chart</Typography> */}
        <LineChart
          series={[
            {
              name: 'High Temperature',
              label: 'Max Temperature',
              data: highTemps,
              color: '#FF5733', // Customize color for high temperature
            },
            {
              name: 'Low Temperature',
              label:' Min Temperature',
              data: lowTemps,
              color: '#33A1FF', // Customize color for low temperature
            },
          ]}
          
          xAxis={[{ data: xAxisLabels, scaleType: 'point',tickLabelStyle: {
            angle: -30,
            textAnchor: 'end',
            fontSize: 11,
        }, }]}
        slotProps={{
          legend: {
            direction: 'row',
          },
        }}
          height={300}
        />
      </>
    );
  }
  
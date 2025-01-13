import { Typography,Box } from "@mui/material"
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from 'react-icons/wi';
import { WiCloudy } from 'react-icons/wi';
import { MdVisibility } from 'react-icons/md';

const DataBlocks = ({data,parameter}) =>{
    let icon;
    switch (parameter) {
      case 'Humidity':
        icon = <WiHumidity size={50} color="lightblue" />;
        break;
      case 'Wind Speed':
        icon = <WiStrongWind size={50} color="lightgreen" />;
        break;
      case 'Clouds':
        icon = <WiCloudy size={50} color="coral" />;
        break;
      case 'Visibility':
        icon = <MdVisibility size={50} color="aquamarine" />;
        break;
      default:
        icon = null; // Handle unexpected cases
    }    
    
    return(
        <Box sx={{padding:{xs:'5px 5px 5px 5px'},justifyItems:'center'}}>
            <Typography>{data}</Typography>
            {icon}
            <Typography>{parameter}</Typography>
        </Box>
    )
}

export {DataBlocks};
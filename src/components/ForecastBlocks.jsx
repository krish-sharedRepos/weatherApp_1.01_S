import { Typography,Box } from "@mui/material"
import { IoMdArrowDropdown } from "react-icons/io";
import { MdArrowDropUp } from "react-icons/md";
const ForecastBlocks = ({date,min,max}) =>{
    return(
        <div>
            <Box sx={{padding:{xs:'5px 5px 5px 5px'},textAlign:'center'}}>
                {/* <Typography>{min}</Typography>
                <Typography>{max}</Typography>
                <Typography>{date}</Typography> */}
                
                <Box sx={{display:'flex',color:'red',alignItems:'center',justifyContent:'space-between'}}>
                    <MdArrowDropUp size={20} />
                    <Typography variant="h7" sx={{ fontWeight: "bold", marginLeft: "4px" }}>
                        {max}
                    </Typography>
                </Box>
                
                <Box sx={{display:'flex',color:'blue',alignItems:'center',justifyContent:'space-between'}}>
                    <IoMdArrowDropdown size={20} />
                    <Typography variant="h7" sx={{ fontWeight: "bold", marginLeft: "4px" }}>
                        {min}
                    </Typography>
                </Box>
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
                    {date}
                </Typography>
                </div>
                
            </Box>
        </div>
    )
}

export {ForecastBlocks};
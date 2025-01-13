import { Switch, Typography,Box } from "@mui/material";

const Navbar = ({handleDarkMode,defaultTheme}) =>{

    const ns = NavbarStyles;

    return(
        <Box sx={{display:'flex',justifyContent:'center',maxWidth:'100vw',fontSize:{md:'xx-large',xs:'x-large'},padding:{md:'20px 5px 20px 5px',xs:'15px 5px 5px 5px'}}}>
            <div style={ns.placeHolder}></div>
            <div style={ns.header}><Typography variant="h4" sx={{}}>WeatherApp</Typography></div>
            <div style={ns.switchDiv}><Switch checked={defaultTheme} onChange={(e)=>handleDarkMode(e.target.checked)}></Switch></div>
        </Box>
    )
}

export {Navbar};

const NavbarStyles = {
    header:{
        flex:'2',
        display:'flex',
        justifyContent:'center'
    },
    placeHolder:{
        flex:'1',
    },
    switchDiv:{
        flex:'1',
        display:'flex',
        justifyContent:'flex-end'
    }
}
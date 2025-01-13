import { createTheme } from '@mui/material/styles';

// Import images from the src/assets folder
import darkImage from '../assets/dark.jpg';
import lightImage from '../assets/sky.png';

const theme = (darkMode) => createTheme({
    palette:{
        mode: darkMode? 'dark':'light',
        background:{
            default: darkMode? '#00083A': '#fff',
        }
    },
})

export {theme};
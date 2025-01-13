import { createTheme } from '@mui/material/styles';

const theme = (darkMode) => createTheme({
    palette:{
        mode: darkMode? 'dark':'light',
        background:{
            default: darkMode? '#00083A': '#fff',
        }
    },
})

export {theme};
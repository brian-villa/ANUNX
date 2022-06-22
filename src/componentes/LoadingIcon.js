import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const LoadingIcon = () => {

    return (
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", marginTop: "380px"}}>
            <CircularProgress color="inherit" />
        </Box>
  
    )
}

export default LoadingIcon
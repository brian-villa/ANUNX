import { useState } from "react"

import { useRouter } from "next/router"

import {   
    IconButton, 
    InputBase, 
    Paper, 
} from "@material-ui/core"


import SearchIcon from "@material-ui/icons/Search"
import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles((theme) => ({
    
    searchBox: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(0, 2),
        marginTop: 20,
    },

}))


const Search = () => {
    const [search, setSearch] = useState()
    const classes = useStyles()
    const route = useRouter()

    const handleSubmitSearch = () => {
        route.push({
            pathname: `/search/${search}`
        })
    }

    return (
        <Paper className={classes.searchBox}>
            <InputBase
                placeholder="Ex.: Iphone 12 com garantia"
                fullWidth
                onChange={(e) => setSearch(e.target.value)}
            />
                <IconButton onClick={() => {handleSubmitSearch()}}>
                    <SearchIcon />
                </IconButton>
        </Paper>
    )
}

export default Search
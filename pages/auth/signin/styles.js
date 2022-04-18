import { makeStyles } from "@material-ui/core/styles"
import { Block } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
    mask: {},
    mainImage: {},

    boxContainer: {
        paddingBottom: theme.spacing(3),
    },
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
    },
    inputLabel: {
        fontWeight: 400,
        color: theme.palette.primary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    loading: {
        display: "block",
        margin: "10px auto",
    },
}))

export default useStyles
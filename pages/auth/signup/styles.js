import { makeStyles } from "@material-ui/core/styles"

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
}))

export default useStyles
import {
    Avatar,
    Box,
    Card,
    CardHeader,
    CardMedia,
    Chip,
    Container,
    Grid,
    Typography,
} from "@material-ui/core"

import Carousel from "react-material-ui-carousel"
import { makeStyles } from "@material-ui/core"
import TemplateDefault from "../../src/templates/Default"

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    productName: {
        margin: "15px 0",
    },
    price: {
        fontWeight: "bold",
        marginBottom: 15,
    },
    card: {
        height: "100%",
    },
    cardMedia: {
        paddingTop: "56%",
    },
}))

const Product = () => {
    const classes = useStyles()
    return(
        <TemplateDefault>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Box className={classes.box}>
                            <Carousel
                                autoPlay={false}
                                animation="slide"
                                navButtonsProps={{
                                    style: {
                                        color: "black",
                                        background: "white",
                                    },
                                }}
                            >
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia} 
                                        image="https://source.unsplash.com/random?a=1"
                                        title="Título da Imagem"
                                        />
                                </Card>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia} 
                                        image="https://source.unsplash.com/random?a=2"
                                        title="Título da Imagem"
                                        />
                                </Card>
                            </Carousel>
                        </Box>

                        <Box className={classes.box} textAlign="left">
                            <Typography 
                                component="span" variant="caption"
                            >
                                Publicado 16 junho de 2021
                            </Typography>
                            <Typography 
                                component="h4" 
                                variant="h4" 
                                className={classes.productName}
                            >
                                Jaguar XE 2.0 D R-Sport Aut.
                            </Typography>
                            <Typography 
                                component="h4" variant="h4" 
                                className={classes.price}
                            >
                                R$50.000,00
                            </Typography>

                            <Chip label="Categoria" />
                        </Box>

                        <Box className={classes.box} textAlign="left">
                            <Typography component="h6" variant="h6">Descrição</Typography>
                            <Typography component="p" variant="body2">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, quas error repellat saepe vel adipisci temporibus molestiae, mollitia delectus autem, amet alias. Nemo ipsa enim molestiae ut vel explicabo excepturi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, quas error repellat saepe vel adipisci temporibus molestiae, mollitia delectus autem, amet alias. Nemo ipsa enim molestiae ut vel explicabo excepturi.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Card elevation={0} className={classes.box}>
                            <CardHeader 
                                avatar={
                                    <Avatar>B</Avatar>
                                }
                                title="Brian Villanova"
                                subheader="email@email.com"
                            />
                            <CardMedia 
                                image="https://source.unsplash.com/random"
                                title="Brian Villanova"
                            />
                        </Card>

                        <Box className={classes.box}>
                            <Typography component="h6" variant="h6">
                                Localização
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export default Product
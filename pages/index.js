import Link from "next/link"
import slugify from "slugify"

import {  
    Container, 
    Grid, 
    IconButton, 
    InputBase, 
    Paper, 
    Typography 
} from "@material-ui/core"


import SearchIcon from "@material-ui/icons/Search"
import { makeStyles } from "@material-ui/core/styles"

import TemplateDefault from "../src/templates/Default"
import Card from "../src/componentes/Card"

import dbConnect from "../src/utils/dbConnect"
import ProductsModels from "../src/models/products"
import { formatCurrency } from "../src/utils/currency"

const useStyles = makeStyles((theme) => ({
    
    searchBox: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(0, 2),
        marginTop: 20,
    },
    cardGrid: {
        marginTop: 50,
    },
    productLink: {
        textDecoration: "none !important",
    },

})) 

const Home = ({ products }) => {

    const classes = useStyles()

    return (
        <TemplateDefault>
            <Container maxWidth="md">
                <Typography component="h1" variant="h3" align="center" color="textPrimary">
                    O que deseja encontrar?
                </Typography>
                <Paper className={classes.searchBox}>
                    <InputBase
                        placeholder="Ex.: Iphone 12 com garantia"
                        fullWidth
                    />
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Container>

            <Container maxWidth="lg" className={classes.cardGrid}>
                <Typography component="h2" variant="h4" align="center" color="textPrimary">
                    Destaques
                </Typography>
                <br />
                <Grid container spacing={4}>
                    {
                        products.map(product => {
                            const category = slugify(product.category).toLocaleLowerCase()
                            const title = slugify(product.title).toLocaleLowerCase()

                            return (
                                <Grid key={product._id} item xs={12} sm={6} md={4}>
                                    <Link href={`/${category}/${title}/${product._id}`} passHref>
                                        <a className={classes.productLink}>
                                            <Card
                                                image={`/uploads/${product.files[0].name}`}
                                                title={product.title}
                                                subtitle={formatCurrency(product.price)}
                                            />
                                        </a>
                                    </Link>
                                </Grid>
                            )
                        })
                    } 
                </Grid>
            </Container>

        </TemplateDefault>
    )
}

export async function getServerSideProps() {
    await dbConnect()

    const products = await ProductsModels.aggregate([{
        $sample: { size : 6 },
    }])

    return  {
        props: {
            products: JSON.parse(JSON.stringify(products))
        },
    }
} 

export default Home
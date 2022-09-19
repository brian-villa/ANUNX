import Link from "next/link"
import slugify from "slugify"

import {  
    Container, 
    Grid,
    Typography,
    Box,
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core"

import TemplateDefault from "../../src/templates/Default"
import Card from "../../src/componentes/Card"
import Search from "../../src/componentes/Search"
import { formatCurrency } from "../../src/utils/currency"

import ProductsModel from "../../src/models/products"


const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    searchBox: {
        display: "flex",
        justifyContent: "space-between",
        padding: theme.spacing(0, 2),
        marginBottom: 20,
    },
})
)
const List = ({ products, q }) => {

    const classes = useStyles()

    return (
        <TemplateDefault>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Search className={classes.searchBox}/>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <Box className={classes.box}>
                        <Typography component="h6" variant="h6">
                            Anúncios
                        </Typography>
                        <Typography component="span" variant="subtitle2">
                            ENCONTRADOS {products.length} ANÚNCIOS PARA O TERMO {q}
                        </Typography>
                        <br /><br />
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
                    </Box>
                </Grid>
            </Container>
            
        </TemplateDefault>
    )
}

export async function getServerSideProps ({ query }) {
    const { q } = query
    
    const products = await ProductsModel.find({
        $or: [
            {
                title: {
                    $regex: q,
                    $options: 'i',
                }
            },
            {
                description: {
                    $regex: q,
                    $options: 'i',
                }
            }
        ]
    })

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),

            q,
        },
    }
}

export default List
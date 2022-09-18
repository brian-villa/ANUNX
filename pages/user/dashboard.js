import Link from "next/link"
import slugify from "slugify"

import { 
  Button, 
  Container, 
  Grid, 
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core"



import { useState } from "react"
import axios from "axios"

import dbConnect from "../../src/utils/dbConnect"

import { getSession } from "next-auth/client"
import ProductsModel from "../../src/models/products"

import { makeStyles } from "@material-ui/core/styles"
import TemplateDefault from "../../src/templates/Default"
import Card from "../../src/componentes/Card"

import useToasty from "../../src/contexts/Toasty"

import { formatCurrency } from "../../src/utils/currency"

const useStyles = makeStyles((theme) => ({
  buttonAdd: {
    margin: "30px auto 50px auto",
    display: "inline-block",
  },
  div1: {
    textAlign: "center",
  },
  productLink: {
    textDecoration: "none !important",
  },
}))

const Home = ({ products }) => {
  const classes = useStyles()
  const { setToasty } = useToasty()
  const [productId, setProductId] = useState()
  const [removedProducts, setRemovedProducts] = useState([])
  const [openConfirmModal, setOpenConfirmModal] = useState(false)

  const handleCloseModal = () => setOpenConfirmModal(false)

  const handleClickRemove = (productId) => {
    setProductId(productId)
    setOpenConfirmModal(true)
  }

  const handleConfirmRemove = () => {
    axios.delete("/api/products/delete", {
      data: {
        id: productId
      },
    })
      .then(handleSuccess)
      .catch(handleError)
  }

  const handleSuccess = () => {
    setOpenConfirmModal(false)
    setRemovedProducts([...removedProducts, productId])
    setToasty({
      open: true,
      severity: "success",
      text: "Anúncio removido com sucesso!"
    })
  }

  const handleError = () => {
    setOpenConfirmModal(false)
    setToasty({
      open: true,
      severity: "error",
      text: "Ops, ocorreu um erro!"
    })
  }

  return (
    <TemplateDefault>
      <Dialog
        open={openConfirmModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>
            {"Deseja realmente remover este anúncio?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao confirmar esta operação, não poderá voltar atrás.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={() => handleConfirmRemove()} autoFocus>
            Remover
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="sm" className={classes.div1}>
        <Typography component="h1" variant="h2" align="center">
          Meus Anúncios
        </Typography>

        <Link href={"/user/publish"} passHref>
          <Button variant="contained" color="primary" 
          className={classes.buttonAdd}>
            Publicar novo anúncio
          </Button>
        </Link>
      </Container>

      <Container maxWidth="md">
        {
          products.length === 0 &&
            <Typography component="div" variant="body1" align="center" color="textPrimary" gutterBottom>
              Nenhum anúncio publicado
            </Typography>
        }

        <Grid container spacing={4}>
          {
            products.map(product => {
              
              if (removedProducts.includes(product._id)) return null 

              const category = slugify(product.category).toLocaleLowerCase()
              const title = slugify(product.title).toLocaleLowerCase()
              
              return (
              
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <Link href={`/${category}/${title}/${product._id}`} passHref>
                    <a className={classes.productLink}>
                      <Card
                        image={`/uploads/${product.files[0].name}`}
                        title={product.title}
                        subtitle={formatCurrency(product.price)}
                        actions={
                          <>
                            <Button size="small" color="primary">
                              Editar
                            </Button>
                            <Button onClick={() => handleClickRemove(product._id)}size="small" color="primary">
                              Remover
                            </Button>
                          </>
                        }
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

Home.requireAuth = true

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  await dbConnect()

  const products = await ProductsModel.find({ 'user.id': session.userId })

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}

export default Home


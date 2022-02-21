import { 
    Box, 
    Button, 
    Container, 
    FormControl, 
    IconButton,
    InputLabel,
    InputAdornment,
    OutlinedInput, 
    Select, 
    TextField, 
    Typography,
    Input,
    MenuItem,
    FormHelperText, 
} from "@material-ui/core"

import { useState } from "react"
import { Formik } from "formik"
import * as yup from "yup"
import { useDropzone } from "react-dropzone"

import { makeStyles } from "@material-ui/core/styles"
import { DeleteForever } from "@material-ui/icons"
import TemplateDefault from "../../src/templates/Default"

const useStyles = makeStyles((theme, className, ...props) => ({
    mask: {},
    mainImage: {},

    boxContainer: {
        paddingBottom: theme.spacing(3),
    },
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
    },
    thumbContainer: {
        display: "flex",
        flexWrap: "wrap",
        marginTop: 15,
    },
    dropZone: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 10,
        margin: "0 15px 15px 0",
        width: 200,
        height: 150,
        backgroundColor: theme.palette.background.default,
        border: "2px dashed black"
    },
    thumb: {
        position: "relative",
        width: 200,
        height: 150,
        backgroundSize: "cover",
        margin: "0 15px 15px 0",
        backgroundPosition: "center center",

        "& $mainImage": {
            backgroundColor: "blue",
            padding: "6px 10px",
            position: "absolute",
            bottom: 0,
            left: 0,
        },

        "&:hover $mask": {
            display: "flex",

        },

        "& $mask": {
            display: "none",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "rgba( 0, 0, 0, 0.7)",
            width: "100%",
            height: "100%",
        }
    },
}))

const validationSchema = yup.object().shape({
    title: yup.string()
        .min(6, "Escreva um título maior")
        .max(100, "Título muito grande")
        .required("Campo obrigatório"),
    
    category: yup.string().required("Campo obrigatório")
})


const Publish = ({ props }) => {
    const classes = useStyles()
    const [files, setFiles] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFile) => {
            const newFiles = acceptedFile.map(file => {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            })

            setFiles([
                ...files,
                ...newFiles,
            ])

        }
    })

    const handleRemoveFile = fileName => {
        const newFileState = files.filter(file => file.name !== fileName)
        setFiles(newFileState)
    }   
    
    
    return (
        <TemplateDefault>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="primary">
                    Publicar Anúncio
                </Typography>
                <Typography component="h5" variant="h5" align="center" color="textPrimary">
                    Quanto mais detalhado melhor
                </Typography>
            </Container>

            <br /> <br />

        <Formik
            initialValues={{
                title: "",
                category: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log("ok", values)
            }}
        >
            {
                ({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                }) => {
                    return(
                        <form onSubmit={handleSubmit}>
                            <Container maxWidth="md" className={classes.boxContainer}>
                                <Box className={classes.box}>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                        Título do Anúncio
                                    </Typography>
                                    <TextField
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        label="ex.: Bicicleta aro 18 com garantia"
                                        size="small"
                                        error={errors.title}
                                        helperText={errors.title}
                                        fullWidth
                                    />
                                    <br /> <br />
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                        Categoria
                                    </Typography>
                                    <FormControl error={errors.category} fullWidth>
                                        <Select
                                            name="category"
                                            value={values.category}
                                            fullWidth
                                            onChange={handleChange}
                                        >

                                            <MenuItem value="Bebê e Criança">Bebê e Criança</MenuItem>
                                            <MenuItem value="Agricultura">Agricultura</MenuItem>
                                            <MenuItem value="Moda">Moda</MenuItem>
                                            <MenuItem value="Carros, Motos e Barcos">Carros, Motos e Barcos</MenuItem>
                                            <MenuItem value="Serviços">Serviços</MenuItem>
                                            <MenuItem value="Lazer">Lazer</MenuItem>
                                            <MenuItem value="Animais">Animais</MenuItem>
                                            <MenuItem value="Movéis, Case e Jardim">Movéis, Case e Jardim</MenuItem>
                                            <MenuItem value="Imóveis">Imóveis</MenuItem>
                                            <MenuItem value="Equipamento e Ferramentas">Equipamento e Ferramentas</MenuItem>
                                            <MenuItem value="Celulares e Tablets">Celulares e Tablets</MenuItem>
                                            <MenuItem value="Esporte">Esporte</MenuItem>
                                            <MenuItem value="Tecnologia">Tecnologia</MenuItem>
                                            <MenuItem value="Emprego">Emprego</MenuItem>
                                            <MenuItem value="Outros">Outros</MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            { errors.category }
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Container>
                            <Container maxWidth="md" className={classes.boxContainer}>
                                <Box className={classes.box}>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                        Imagens
                                    </Typography>
                                    <Typography component="div" variant="body2" color="textPrimary">
                                        A primeira imagem é a foto principal do seu anúncio.
                                    </Typography>
                                    <Box className={classes.thumbContainer}>
                                        <Box className={classes.dropZone} {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <Typography variant="body2" color="textPrimary">
                                                Clique para adicionar ou arraste a imagem para aqui.
                                            </Typography>
                                        </Box>

                                        {
                                            files.map((file, index) => (
                                                <Box 
                                                    key={file.name}
                                                    className={classes.thumb}
                                                    style={{ backgroundImage: `url(${file.preview})` }}
                                                >
                                                    {
                                                        
                                                        index === 0 ?
                                                            <Box className={classes.mainImage}>
                                                                <Typography variant="body1" color="secondary">
                                                                    Principal
                                                                </Typography>
                                                            </Box>
                                                        : null
                                                    }
                                                    
                                                    <Box className={classes.mask}>
                                                        <IconButton color="secondary" onClick={() => handleRemoveFile(file.name)}>
                                                            <DeleteForever fontSize="large" />
                                                        </IconButton>
                                                    </Box>

                                                </Box>
                                            ))
                                        }

                                    </Box>
                                </Box>
                            </Container>
                            <Container maxWidth="md" className={classes.boxContainer}>
                                <Box className={classes.box}>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                        Descrição
                                    </Typography>
                                    <Typography component="div" variant="body2" color="textPrimary">
                                        Escreva os detalhes do seu produto.
                                    </Typography>
                                    <TextField 
                                        multiline
                                        rows={6}
                                        
                                        fullWidth
                                    />
                                </Box>
                            </Container>
                            <Container maxWidth="md"className={classes.boxContainer}>
                                <Box className={classes.box}>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                        Preço
                                    </Typography>
                                    <br />
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel>Valor</InputLabel>
                                        <OutlinedInput
                                            labelWidth={40}
                                            onChange={() => {}}
                                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                        />
                                    </FormControl>

                                </Box>

                            </Container>
                            <Container maxWidth="md" className={classes.boxContainer}>
                                <Box className={classes.box}>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                        Dados de Contato
                                    </Typography>
                                    <TextField 
                                        label="Nome"
                                        
                                        size="small"
                                        fullWidth
                                    />
                                    <br /> <br />
                                    <TextField 
                                        label="E-mail"
                                        
                                        size="small"
                                        fullWidth
                                    />
                                    <br /> <br />
                                    <TextField 
                                        label="Telefone"
                                        
                                        size="small"
                                        fullWidth
                                    />
                                </Box>
                            </Container>

                            <Container maxWidth="md" className={classes.boxContainer}>
                                <Box textAlign="right">
                                    <Button type="submit" variant="contained" color="primary">
                                        Publicar Anúncio
                                    </Button>
                                </Box>
                            </Container>   
                        </form>
                    )
                }
            }

        </Formik>
        </TemplateDefault>
    )
}

export default Publish
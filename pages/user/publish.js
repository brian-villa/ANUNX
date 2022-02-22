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
    inputLabel: {
        fontWeight: 400,
        color: theme.palette.primary.main,
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
    
    category: yup.string().required("Campo obrigatório"),
    
    description: yup.string()
        .min(50, "Escreva uma descrição de no mínimo 50 caracteres")
        .required("Campo obrigatório"),
    
    price: yup.number().required("Campo obrigatório"),
    
    email: yup.string().email("Digite um email válido").required("Campo obrigatório"),

    name: yup.string().required("Campo obrigatório"),

    phone: yup.number().required("Campo obrigatório")
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
                description: "",
                price: "",
                email: "",
                name: "",
                phone: "",
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
                                    <FormControl error={errors.title} fullWidth>
                                        <InputLabel className={classes.inputLabel}>Título do Anúncio</InputLabel>
                                        <Input
                                            name="title"
                                            value={values.title}
                                            onChange={handleChange}
                                        />
                                    <FormHelperText>
                                        { errors.title }
                                    </FormHelperText>
                                    </FormControl>
                                    
                                    <br /> <br />
                                    
                                    <FormControl error={errors.category} fullWidth>
                                        <InputLabel className={classes.inputLabel}>Categoria</InputLabel>
                                        <Select
                                            name="category"
                                            value={values.category}
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
                                    <FormControl error={errors.description} fullWidth>
                                        <InputLabel className={classes.inputLabel}>Escreva os detalhes do que está vendendo</InputLabel>
                                        <Input
                                            name="description" 
                                            multiline
                                            rows={6}
                                            onChange={handleChange}
                                            variant="outlined"
                                        />
                                        <FormHelperText>
                                            { errors.description }
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Container>

                            <Container maxWidth="md"className={classes.boxContainer}>
                                <Box className={classes.box}>
                                    <FormControl error={errors.price} variant="outlined" fullWidth>
                                        <InputLabel className={classes.inputLabel}>Preço de venda</InputLabel>
                                        <Input
                                            name="price"
                                            onChange={handleChange}
                                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                        />
                                    <FormHelperText>
                                        { errors.price }
                                    </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Container>

                            <Container maxWidth="md" className={classes.boxContainer}>
                                <Box className={classes.box}>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                        Dados de Contato
                                    </Typography>
                                    
                                    <FormControl error={errors.name} fullWidth>
                                        <InputLabel className={classes.inputLabel}>Nome</InputLabel>
                                        
                                        <Input 
                                            name="name" 
                                            value={values.name}
                                            onChange={handleChange}   
                                        />

                                        <FormHelperText>
                                            { errors.name }
                                        </FormHelperText>
                                    </FormControl>

                                    <br /> <br />
                                    
                                    <FormControl error={errors.email} fullWidth>
                                        <InputLabel className={classes.inputLabel}>E-mail</InputLabel>
                                        
                                        <Input 
                                            name="email" 
                                            value={values.email}
                                            onChange={handleChange}   
                                        />

                                        <FormHelperText>
                                            { errors.email }
                                        </FormHelperText>
                                    </FormControl>
                                    
                                    <br /> <br />
                                    
                                    <FormControl error={errors.phone} fullWidth>
                                        <InputLabel className={classes.inputLabel}>Telefone</InputLabel>
                                        
                                        <Input 
                                            name="phone" 
                                            value={values.phone}
                                            onChange={handleChange}   
                                        />

                                        <FormHelperText>
                                            { errors.phone }
                                        </FormHelperText>
                                    </FormControl>
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
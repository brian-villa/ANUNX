import { Formik } from "formik"
import axios from "axios"
import { useRouter } from "next/router"

import { 
    Box,
    Button,
    Container,
    CircularProgress,
    FormControl,
    FormHelperText,
    Input,
    InputLabel, 
    Typography,
} from "@material-ui/core"


import TemplateDefault from "../../../src/templates/Default"
import useToasty from "../../../src/contexts/Toasty"
import useStyles from "./styles"


import { initialValues, validationSchema } from "./formValues"


const Signup = () => {
    const classes = useStyles()
    const { setToasty } =  useToasty()
    const router = useRouter()

    const handleFormSubmit = async (values) => {
        const response = await axios.post("/api/users", values)
         
        if (response.data.success) {
            setToasty({
                open: true,
                severity: "success",
                text: "Cadastro realizado com sucesso!"
            })
            
            router.push("/auth/signin")
        }
    }
    
    return(
        <TemplateDefault>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="primary">
                    Crie sua conta
                </Typography>
                <Typography component="h5" variant="h5" align="center" color="textPrimary">
                    E anuncie para todo mundo
                </Typography>
            </Container>

            <br /> <br />

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
            >
                {
                    ({
                        touched,
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        isSubmitting,   
                    }) => {

                        return(
                            <form onSubmit={handleSubmit}>
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <FormControl error={errors.name && touched.name} fullWidth>

                                            <InputLabel className={classes.inputLabel}>Nome</InputLabel>
                                            
                                            <Input 
                                                name="name" 
                                                value={values.name}
                                                onChange={handleChange}   
                                            />

                                            <FormHelperText>
                                                { errors.name && touched.name ? errors.name : null }
                                            </FormHelperText>
                                        </FormControl>

                                        <br /> <br />

                                        <FormControl error={errors.email && touched.email} fullWidth>
                                            <InputLabel className={classes.inputLabel}>E-mail</InputLabel>
                                            
                                            <Input 
                                                name="email" 
                                                value={values.email}
                                                onChange={handleChange}   
                                            />

                                            <FormHelperText>
                                                { errors.email && touched.email ? errors.email : null }
                                            </FormHelperText>

                                        </FormControl>

                                        <br /> <br />

                                        <FormControl error={errors.password && touched.password} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Senha</InputLabel>
                                            
                                            <Input 
                                                name="password"
                                                type="password" 
                                                value={values.password}
                                                onChange={handleChange}   
                                            />

                                            <FormHelperText>
                                                { errors.password && touched.password ? errors.password: null}
                                            </FormHelperText>
                                        </FormControl>

                                        <br /> <br />

                                        <FormControl error={errors.passwordConfig && touched.passwordConfig} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Confirme a senha</InputLabel>
                                            
                                            <Input 
                                                name="passwordConfig"
                                                type="password" 
                                                value={values.passwordConfig}
                                                onChange={handleChange}   
                                            />

                                            <FormHelperText>
                                                { errors.passwordConfig && touched.passwordConfig ? errors.passwordConfig : null}
                                            </FormHelperText>
                                        </FormControl>
                                        <br /> <br/>

                                        {
                                            isSubmitting
                                                ? (
                                                    <CircularProgress className={classes.loading} />
                                                ) : (
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.submit}
                                                    >
                                                        Cadastrar
                                                    </Button>
                                                )
                                        }
                                        
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

export default Signup
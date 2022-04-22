import { Formik } from "formik"
import axios from "axios"
import { useRouter } from "next/router"
import { signIn, useSession } from "next-auth/client"

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
import { Alert } from "@material-ui/lab"


import TemplateDefault from "../../../src/templates/Default"
import useToasty from "../../../src/contexts/Toasty"
import useStyles from "../signin/styles"


import { initialValues, validationSchema } from "../signin/formValues"


const Signin = () => {
    const classes = useStyles()
    const { setToasty } =  useToasty()
    const router = useRouter()
    const [ session ] = useSession()

    console.log(session)

    const handleFormSubmit = async (values) => {
        signIn('credentials', {
            email: values.email,
            password: values.password,
            callbackUrl: "http://localhost:3000/user/dashboard"
        })
    }
    
    return(
        <TemplateDefault>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="primary">
                    Entre na sua conta
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
                                        {
                                            router.query.i === "1"
                                                ? <Alert severity="error" className={classes.errorMessage}></Alert>
                                                : null
                                        }
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
                                                        Entrar
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

export default Signin
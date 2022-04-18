import * as yup from "yup"

const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordConfig: "",
}

const validationSchema = yup.object().shape({
    email: yup.string().email("Digite um email válido").required("Campo obrigatório"),
    password: yup.string().min(6, "Mínimo de 6 caracteres").required("Campo obrigatório"),
    passwordConfig: yup.string().required("Campo obrigatório").oneOf([yup.ref("password"), null], "As senhas precisam ser iguais"),
})

export {
    initialValues,
    validationSchema,
}
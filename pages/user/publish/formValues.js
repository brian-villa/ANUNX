import * as yup from "yup"

const dateToday = () => {
    const date = Date.now()
    const today = new Date(date)

    return today.toLocaleDateString()
}

const initialValues = {
    title: "",
    category: "",
    description: "",
    price: "",
    email: "",
    name: "",
    phone: "",
    city: "",
    date: dateToday(),
    files: [],
}

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
    phone: yup.number().required("Campo obrigatório"),
    city: yup.string().required("Campo obrigatório"),
    files: yup.array().min(1, "Envie pelo menos uma foto").required("Campo obrigatório"),
})

export {
    initialValues,
    validationSchema,
}
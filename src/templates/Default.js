import Header from "../componentes/Header"
import Footer from "../componentes/Footer"

const Default = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Default
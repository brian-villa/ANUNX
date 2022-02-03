import Header from "../componentes/Header"

const Default = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <footer>FOOTER</footer>
        </>
    )
}

export default Default
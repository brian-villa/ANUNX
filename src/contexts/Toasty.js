import { useContext } from "react"
import { createContext, useState } from "react"
import Toasty from "../componentes/Toasty"

const ToastyContext = createContext({})

export const ToastyProvider = ({ children }) => {
    const [toasty, setToasty] = useState({
        open: false,
        text: "",
        severity: "info",
    })

    return(
        <ToastyContext.Provider value={{ setToasty }}>
            <Toasty 
                open={toasty.open}
                severity={toasty.severity}
                text={toasty.text}
                onClose={() => setToasty({
                    ...toasty,
                    open: false,
                })}
            />
            {children}
        </ToastyContext.Provider>
    )
}

const useToasty = () => useContext(ToastyContext)

export default useToasty
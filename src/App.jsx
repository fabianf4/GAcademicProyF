import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"

import { Matter } from "./pages/matter/Matter"
import {Login} from "./pages/student/Login"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
    const [idStudent, setIdStudent] = useState(false)
    const [load, setLoad] = useState(true)

    useEffect(() => {
        if (load) {
            if (window.localStorage.getItem("id")) {
                setIdStudent(true)
            }
            setLoad(false)
        }
    }, [load])

    return (
        <>
            <Container>
                <h1>Gestion Academica</h1>
                {!idStudent ? <Login actualizar={setLoad}/> : <Matter />}
            </Container>
            <ToastContainer position="bottom-right" />
        </>
    )
}

export default App

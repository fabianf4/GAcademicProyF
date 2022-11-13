import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { connectionApi } from "../../api/axiosModel"
import { MyModal } from "../../components/MyModal"
import { SignIn } from "./SignIn"
import Swal from "sweetalert2"

export function Login({ actualizar }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(event) {
        event.preventDefault()

        connectionApi
            .post("/student/login", {
                username,
                password
            })
            .then((response) => {
                Swal.fire("Bienvenido", "Ingreso exitoso", "success")
                window.localStorage.setItem("id", response.data._id)
                window.localStorage.setItem("name", response.data.name)
                actualizar(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <h2>Estudiante</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese un nombre de usuario"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Ingrese su contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Iniciar Sesion
                </Button>
            </Form>
            <br />
            <MyModal
                txtButton={"Registrate"}
                title={"Registrarse"}
                body={<SignIn />}
            />
        </>
    )
}

import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { connectionApi } from "../../api/axiosModel"
import Swal from "sweetalert2"

export function SignIn() {
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(event) {
        event.preventDefault()

        connectionApi
            .post("/student/add", {
                name,
                lastname,
                username,
                password
            })
            .then((response) => {
                Swal.fire("Exito", "Se a registrado", "success")
                setName("")
                setLastname("")
                setUsername("")
                setPassword("")
                console.log(response)
            })
            .catch((error) => {
                Swal.fire("Error", "Ocurrio un error creando el usuario", "error")
                console.log(error)
            })
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        placeholder="Ingrese su nombre"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                        type="text"
                        value={lastname}
                        placeholder="Ingrese su apellido"
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        placeholder="Ingrese un nombre de usuario"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contrase??a</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="Ingrese su contrase??a"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Registrarse
                </Button>
            </Form>
        </>
    )
}

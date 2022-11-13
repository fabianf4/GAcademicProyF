import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { connectionApi } from "../../api/axiosModel"

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
                setName("")
                setLastname("")
                setUsername("")
                setPassword("")
                console.log(response)
            })
            .catch((error) => {
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
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="Ingrese su contraseña"
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

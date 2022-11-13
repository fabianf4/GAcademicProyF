import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { connectionApi } from "../../api/axiosModel"
import { toast } from "react-toastify"

export function AddMatter({ update }) {
    const [name, setName] = useState("")
    const [nameTeacher, setNameTeacher] = useState("")
    //idUsuario

    function handleSubmit(event) {
        event.preventDefault()

        let idStudent = window.localStorage.getItem("id")

        if (idStudent) {
            console.log({ name, nameTeacher, idStudent })
            toast
                .promise(
                    connectionApi.post("/matter/add", {
                        name,
                        nameTeacher,
                        idStudent
                    }),
                    {
                        pending: "Creando materia...",
                        success: "Materia creada👌",
                        error: "Error al crear materia 🤯"
                    }
                )
                .then((response) => {
                    update(true)
                    setName("")
                    setNameTeacher("")
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            toast.error("No se a autenticado")
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre de la materia</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        placeholder="Ingrese el nombre de la materia"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nombre del profesor</Form.Label>
                    <Form.Control
                        type="text"
                        value={nameTeacher}
                        placeholder="Ingrese el nombre del profesor"
                        onChange={(e) => setNameTeacher(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Agregar Materia
                </Button>
            </Form>
        </>
    )
}

import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { connectionApi } from "../../api/axiosModel"
import { toast } from "react-toastify"

export function AddActivity({ idMatter, update }) {
    const [description, setDescription] = useState("")
    const [percentage, setPercentage] = useState("")
    const [dateDelivery, setDateDelivery] = useState("")
    //idUsuario description score percentege dateDelivery

    function handleSubmit(event) {
        event.preventDefault()

        if (idMatter) {
            toast
                .promise(
                    connectionApi.post("/activity/add", {
                        description,
                        percentage,
                        dateDelivery,
                        idMatter
                    }),
                    {
                        pending: "Cargando...",
                        success: "Actividad creada 👌",
                        error: "Error agregando actividad 🤯"
                    }
                )
                .then((response) => {
                    update(true)
                    setDescription("")
                    setPercentage("")
                    setDateDelivery("")
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            console.log("No existe la materia")
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Descripcion de la actividad</Form.Label>
                    <Form.Control
                        type="text"
                        value={description}
                        placeholder="Ingrese la descripcion de la actividad"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Porcentaje %</Form.Label>
                    <Form.Control
                        type="number"
                        value={percentage}
                        placeholder="Ingrese el porcentaje de la actividad"
                        onChange={(e) => setPercentage(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Fecha y hora de entrega</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={dateDelivery}
                        placeholder="Ingrese la fecha y hora de entrega de la actividad"
                        onChange={(e) => setDateDelivery(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Agregar Actividad
                </Button>
            </Form>
        </>
    )
}

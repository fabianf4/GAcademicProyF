import { Button, Form } from "react-bootstrap"
import { connectionApi } from "../../api/axiosModel"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

export function BodyEditActivity({ activity, setLoad, setEdit }) {
    const [score, setScore] = useState("")

    useEffect(() => {
        activity.score ? setScore(activity.score) : setScore("")
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        toast
            .promise(
                connectionApi.patch(`/activity/update/${activity._id}`, {
                    score
                }),
                {
                    pending: "Cargando...",
                    success: "Actividad actualizada 👌",
                    error: "Error al actualizar la actividad 🤯"
                }
            )
            .then((results) => {
                setLoad(true)
                setEdit("0")
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <Form onSubmit={handleSubmit}>
            Fecha de entrega: {activity.dateDelivery.split("T")[0]} <br />
            Hora de entrega: {
                activity.dateDelivery.split("T")[1].split(".")[0]
            }{" "}
            <br />
            Calificacion:{" "}
            <Form.Control
                type="number"
                placeholder={activity.score ? activity.score : "Sin calificar"}
                value={score}
                min="0"
                max="50"
                onChange={(e) => setScore(e.target.value)}
            />
            <br />
            <Button type="submit">Actualizar</Button>
        </Form>
    )
}

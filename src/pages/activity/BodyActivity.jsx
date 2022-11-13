import { ButtonDel } from "../../components/ButtonDel"
import { Button } from "react-bootstrap"

export function BodyActivity({ activity, setEdit, setLoad}) {
    return (
        <>
            Fecha de entrega: {activity.dateDelivery.split("T")[0]} <br />
            Hora de entrega:{" "}
            {activity.dateDelivery.split("T")[1].split(".")[0]} <br />
            Calificacion:{" "}
            {activity.score ? activity.score : "Sin calificar"}
            <br />
            <br />
            <ButtonDel
                url={`/activity/delete/${activity._id}`}
                txtButton="Eliminar"
                update={setLoad}
                errorEliminar="No se pudo eliminar la actividad"
                txtEliminar="Actividad eliminada"
            />
            <Button variant="outline-warning" onClick={() => setEdit(activity._id)}>
                Editar{" "}
            </Button>
        </>
    )
}
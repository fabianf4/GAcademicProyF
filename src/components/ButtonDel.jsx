import { Button } from "react-bootstrap"
import { connectionApi } from "../api/axiosModel"
import { toast } from "react-toastify"

export function ButtonDel({
    url,
    txtButton,
    update,
    idMatter,
    idStudent,
    errorEliminar,
    txtEliminar
}) {
    function handleDelete() {
        toast
            .promise(connectionApi.delete(url, { idMatter, idStudent }), {
                pending: "Eliminando...",
                success: `${txtEliminar} 👌`,
                error: `${errorEliminar}  🤯`
            })
            .then((response) => {
                update(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <Button
            variant="outline-danger"
            onClick={() => {
                handleDelete()
            }}
        >
            {txtButton}
        </Button>
    )
}

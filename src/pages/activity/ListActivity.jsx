import { MyCard } from "../../components/MyCard"
import { useState, useEffect } from "react"
import { connectionApi } from "../../api/axiosModel"
import { Row, Col, Button, Container } from "react-bootstrap"
import { MyModal } from "../../components/MyModal"
import { AddActivity } from "../activity/AddActivity"
import { ButtonDel } from "../../components/ButtonDel"
import { Form } from "react-bootstrap"
import { BodyActivity } from "./BodyActivity"
import { BodyEditActivity } from "./BodyEditActivity"
import { toast } from "react-toastify"
import { ProgressBar } from "../../components/ProgressBar"

export function ListActivity({ idMatter }) {
    const [activities, setActivities] = useState([])
    const [loadId, setLoadId] = useState("0")
    const [edit, setEdit] = useState(false)
    const [recent, setRecent] = useState(false)
    const [complete, setComplete] = useState("0")
    const [notaActual, setNotaActual] = useState(0)
    const [notaFaltante, setNotaFaltante] = useState(0)

    useEffect(() => {
        if (idMatter && loadId) {
            connectionApi.get(`/activity/get/${idMatter}`).then((response) => {
                setActivities(response.data.activities)
                setLoadId(false)
                setRecent(true)

                let count = 0
                response.data.activities.forEach((activity) => {
                    if (activity.score) {
                        count += activity.percentage
                    }
                })
                setComplete(count)
            })
        }
    }, [loadId])

    useEffect(() => {
        if (activities && recent) {
            activities?.forEach((activity) => {
                let date = new Date(activity?.dateDelivery)
                let dateNow = new Date()
                let time = Math.round((date - dateNow) / (1000 * 60 * 60))
                if (time < 3 * 24 && time > 0 && !activity?.score) {
                    toast.warning(
                        `La actividad ${activity?.description} se cumple en ${time} horas`
                    )
                }
            })
            setRecent(false)
        }
    }, [recent])

    useEffect(() => {
        let aux1 = 0
        let aux2 = 0

        activities?.forEach((activity) => {
            if (activity?.score) {
                aux1 += (activity?.score * activity?.percentage) / 100   
                aux2 += activity?.percentage            
            }
        })
        setNotaActual(aux1)
        if((100-aux2)==0){
            setNotaFaltante("Ya finalizo todas las actividades de la materia")
        }else{
            setNotaFaltante((30-aux1)/((100-aux2)/100))
        }
    }, [activities])

    return (
        <>
            <Container>
                <Row>
                    <h5>Nota actual: {notaActual}</h5>
                    <h5>Nota para aprobar: {notaFaltante}</h5>
                    <h5>Avance:</h5>
                </Row>
                <ProgressBar
                    bgcolor="#99ccff"
                    progress={complete}
                    height={10}
                />
            </Container>
            <Row className="justify-content-md-center">
                {activities.map((activity) => (
                    <MyCard
                        key={activity._id}
                        title={`${activity.description}`}
                        subtitle={`Valor: ${activity.percentage}%`}
                        body={
                            !(edit == activity._id) ? (
                                <BodyActivity
                                    activity={activity}
                                    setEdit={setEdit}
                                    setLoad={setLoadId}
                                />
                            ) : (
                                <BodyEditActivity
                                    activity={activity}
                                    setLoad={setLoadId}
                                    setEdit={setEdit}
                                />
                            )
                        }
                    />
                ))}
            </Row>
            <br />
            <MyModal
                txtButton={"Agregar Actividad"}
                title={"Agregar Actividad"}
                body={<AddActivity idMatter={idMatter} update={setLoadId} />}
            />
        </>
    )
}

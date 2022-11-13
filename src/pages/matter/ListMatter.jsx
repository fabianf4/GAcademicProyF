import { useState, useEffect } from "react"
import { connectionApi } from "../../api/axiosModel"
import { MyModal } from "../../components/MyModal"
import { AddActivity } from "../activity/AddActivity"
import Accordion from "react-bootstrap/Accordion"
import { AddMatter } from "./AddMatter"
import { ListActivity } from "../activity/ListActivity"

export function ListMatter() {
    const [load, setLoad] = useState(true)
    const [matter, setMatter] = useState([])

    useEffect(() => {
        let idStudent = window.localStorage.getItem("id")

        if (idStudent && load) {
            connectionApi.get(`/matter/get/${idStudent}`).then((response) => {
                setMatter(response.data.matter)
                setLoad(false)
            })
        }
    }, [load])

    return (
        <>
            <h2>Materias</h2>
            <MyModal
                title="Agregar materia"
                txtButton="Agregar materia"
                body={<AddMatter update={setLoad} />}
            />
            <br />
            <br />
            <Accordion defaultActiveKey="0">
                {matter.map((matter, index) => (
                        <Accordion.Item eventKey={index} key={matter._id}>
                            <Accordion.Header>{matter.name}</Accordion.Header>
                            <Accordion.Body>
                                <p>Profesor: {matter.nameTeacher}</p>

                                <ListActivity idMatter={matter._id} />

                            </Accordion.Body>
                        </Accordion.Item>
                ))}
            </Accordion>
        </>
    )
}

import Card from "react-bootstrap/Card"

export function MyCard({ title, subtitle, body }) {
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {subtitle}
                </Card.Subtitle>
                {body}
            </Card.Body>
        </Card>
    )
}
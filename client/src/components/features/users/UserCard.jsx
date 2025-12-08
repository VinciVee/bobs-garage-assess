import { Card } from "react-bootstrap"

function UserCard({name, image, bio, role}) {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={image}
        alt={`${name} profile picture`}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>{role}</Card.Subtitle>
        <Card.Text>{bio}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default UserCard

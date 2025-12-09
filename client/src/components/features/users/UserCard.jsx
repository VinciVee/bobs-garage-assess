import { Card } from "react-bootstrap"
import * as styles from './UserCard.css'

function UserCard({name, image, bio, role}) {
  return (
    <Card className={styles.userCard}>
      <Card.Img
        variant="top"
        src={image}
        alt={`${name} profile picture`}
        className={styles.userImg}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className={styles.roleText}>{role}</Card.Subtitle>
        <Card.Text className={styles.bioText}>{bio}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default UserCard

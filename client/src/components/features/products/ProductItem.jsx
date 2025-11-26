// React modules
import { Link } from 'react-router-dom';
import { useState } from 'react';
// Icons
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md";

import { GoPencil } from "react-icons/go";
import { LuDelete } from "react-icons/lu";
import { IconContext } from 'react-icons/lib';
import { Card, Button, ButtonGroup, ToggleButton } from 'react-bootstrap'
// Local modules
import * as styles from './ProductItem.css'

const ProductItem = ({product, isAdmin, isAuth, handleDelete}) => {
  const { id, name, desc, image, price } = product;
  const [favourite, setFavourite] = useState(false)

  const toggleFav = (e) => {
    e.preventDefault()
    setFavourite(!favourite)
  }

  const adminOptions = (
    <IconContext.Provider
      value={{ className: styles.favStar, size: '1.5em'}}>
      <ButtonGroup vertical>
        <Button
          as={Link}
          to={`/admin/users-edit/${id}`}
          className={styles.adminBtn} >
          <GoPencil />
        </Button>
        <Button
          type='button'
          className={styles.adminBtn}
          onClick={(e) => handleDelete(id, e) } >
          <LuDelete />
        </Button>
      </ButtonGroup>
    </IconContext.Provider>
  )

  return (
    <Card className={`bg-dark text-light ${styles.cardContainer}`}>
      <Card.Img
        variant="top"
        src={image}
        className={styles.cardImage}
        alt={name} />
      <Card.ImgOverlay className={styles.overlay}>
      {/* Admin Buttons */}
      { isAdmin && isAuth ? adminOptions : null }
      </Card.ImgOverlay>
      <Card.Body>
        <Card.Title className={styles.cardTitle}>{name}
          <IconContext.Provider value={{ className: styles.favStar, size: '1.5em' }}>
            <ToggleButton id={id} className={styles.favStar} onClick={toggleFav} value={name}>
              { favourite? <MdOutlineStarOutline />
                : <MdOutlineStarPurple500 /> }
            </ToggleButton>
          </IconContext.Provider>
        </Card.Title>
        <Card.Subtitle className={styles.servPrice}>${price}</Card.Subtitle>
        <Card.Text>{desc}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductItem

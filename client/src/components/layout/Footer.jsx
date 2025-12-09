// Footer
import { Col, Container, Row } from 'react-bootstrap';
import * as styles from './Footer.css'

const Footer = () => {
  // Use JavaScript Date class
  const date = new Date();

  return (
    <footer className={styles.footerBar}>
      <Container>
        <Row>
          <Col xs={8} md={8} lg={6}>
            <h2>Socials</h2>
            <p>Facebook</p>
            <p>Instagram</p>
          </Col>
          <Col xs={4} md={4} lg={2}>
            <h2>Links</h2>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Services</li>
            </ul>
          </Col>
          <Col xs={12} md={6} lg={2}>
            <h2>Location</h2>
            <p>Shop 67/100 Garage Street</p>
            <p>Burnley VIC</p>
            <p>3012 AUSTRALIA</p>
            <p>(+61) 9303 3030</p>
          </Col>
          <Col xs={12} md={6} lg={2}>
            <h2>Opening Hours</h2>
            <p>Mon - Fri 10am - 6pm</p>
            <p>Sat 10am - 6pm</p>
            <p>Sun Closed</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} lg={6}>
            <p className="py-3 text-end text-white me-4">
              copyright { String.fromCharCode(169)}
              { ' ' + date.getFullYear()} Bob&apos;s Garage
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;

// Footer
import * as styles from './Footer.css'

const Footer = () => {
  // Use JavaScript Date class
  const date = new Date();

  return (
    <footer className={styles.footerBar}>
      <p className="py-3 text-end text-white me-4">
        copyright { String.fromCharCode(169)}
        { ' ' + date.getFullYear()} Bob&apos;s Garage
      </p>

    </footer>
  )
}

export default Footer;

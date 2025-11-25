// Redux Modules
import { useSelector } from 'react-redux';
import { selectHomepageImage } from '../../slices/admin/adminSlice';
// React* modules
import { Link } from 'react-router-dom'
// Local modules
import BgButton from '../common/BgButton';
import * as styles from './Hero.css'

function Hero() {
  const backImage = useSelector(selectHomepageImage)
  console.log('backImage: ', backImage)

  return (
    <div className={styles.bgImage} style={{ backgroundImage: `url(${backImage})` }}>
      <div className={styles.overlay}>
        <h1>Bob&apos;s Garage</h1>
        <p>All the services you need</p>
        <Link to='/products' style={{ textDecoration: 'none'}}>
          <BgButton type="button">Services</BgButton>
        </Link>
      </div>
    </div>
  )
}

export default Hero

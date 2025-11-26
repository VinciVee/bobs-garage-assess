/**
 * Home.jsx
 *
 */
import * as styles from './Home.css'

const Home = () => {
  return (
    <>
      <div className={styles.homeContainer}>
        <section>
          <h2 className={styles.headings}>My Favourites</h2>
          <div className='col-4'> Col 1 </div>
          <div className='col-4'> Col 2 </div>
          <div className='col-4'> Col 3 </div>
        </section>
      </div>
    </>
  )
}

export default Home;

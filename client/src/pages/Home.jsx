/**
 * Home.jsx
 *
 *
 */
// import * as styles from './Home.css'

const Home = () => {
  return (
    <>
      <section className='row'>
        <h1>Daisy's Flowers</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae aliquam dolor necessitatibus culpa quam, laudantium commodi mollitia tempore possimus officiis, rem sed ullam totam maxime doloribus fugiat, libero iusto natus.</p>
        <button className='btn bg-info text-white' type="button">Shop Now</button>
      </section>
      <section className='row'>
        <h2>Heading</h2>
        <div className='col-4'> Col 1 </div>
        <div className='col-4'> Col 2 </div>
        <div className='col-4'> Col 3 </div>
      </section>
      <section className='row'>
        <h2>Heading</h2>
        <div className="col-6"> Col 1 </div>
        <div className="col-6"> Col 2 </div>
      </section>
    </>

  )
}

export default Home;

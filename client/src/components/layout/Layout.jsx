import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

import * as styles from './Layout.css' // Import everything from this file (*) and store it in an object called 'styles'
import Header from './Header'
import Footer from './Footer'
import Hero from './Hero';

const Layout = () => {
  const { pathname } = useLocation()
  const showHero = pathname === "/"

  return (
    <div className={styles.app}>
      {/* TOAST display Errors */}
      <ToastContainer
        style={{ textAlign: "center" }}
        position='top-center'
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        transition={Slide}
        theme="colored"
      />
      <Header branding="Bob&apos;s Garage"/>
      {showHero && <Hero />}
      {/* Wrap all content in column-direction flexbox */}
      <div className={styles.appContent}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
};

export default Layout

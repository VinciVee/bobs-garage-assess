import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import * as styles from './BgButton.css'

const BgButton = ({ children, loadingState, onClick, outline, navbar }) => {
  return (
    <Button
      className={styles.button}
      type={onClick ? "button" : "submit"}
      onClick={onClick}
      disabled={loadingState ? 1 : 0}
      outline={outline ? 1 : 0}
      navbar={navbar ? 1 : 0}
    >
      {children}
    </Button>
  )
}

BgButton.propTypes = {
  children: PropTypes.any,
  loadingState: PropTypes.bool,
  outline: PropTypes.bool,
  navbar: PropTypes.bool,
  type: PropTypes.string,
}

export default BgButton


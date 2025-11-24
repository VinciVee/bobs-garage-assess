import * as styles from './BgCard.css'

const BgCard = ({ title, authform, children }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.leadCard} ${authform ? styles.authForm : styles.generalForm}`}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default BgCard

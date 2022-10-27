import React from 'react'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';

function MainComp() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.welcome}>
          <div>
            Welcome to
            <div>SSPS</div>
          </div>
          <p className={styles.paragraph}>
            Education breeds Confidence. Confidence breeds Hope. Hope breeds peace.
            Education Is the Fruit of All Knowledge
          </p>

          <Link href={'/about'}>
            <button className={styles.btn}>
              Know More
            </button></Link>

        </div>
      </div>
    </>
  )
}

export default MainComp

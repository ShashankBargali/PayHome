import React from 'react'
import styles from '../styles/Blog.module.css'

function blogs() {
  return (
    <>
      <div className={styles.blogComp}>
        <div className={styles.welcome}>
          <div className={styles.blogHead}>
            Our Blog
          </div>
        </div>
      </div>
    </>
  )
}

export default blogs

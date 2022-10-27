import Link from 'next/link'
import React from 'react'
import styles from '../styles/About.module.css'
import Navbar from './components/Navbar';

function about() {
    return (
        <div className={styles.abtComp}>
            <div className={styles.welcome}>
                <div className={styles.mainhead}>
                    About Us
                </div>
                <div className={styles.head}>
                    We provide an enriched learning environment that has helped countless students learn, develop and grow. Our unparalleled curriculum and teaching methods help students take the next step in their education and approach the future with confidence.
                    <br />
                </div>
            </div>
        </div>
    )
}

export default about

import React from "react";
import styles from "../../styles/Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <Link href={'/'}>
                <div className={styles.logo}>
                    <img src={'/logo.png'} alt="img" width={40} height={40} />
                    SSPS Bidar
                </div>
            </Link>
            <ul>
                <Link href={'/'}>
                    <li>Home</li>
                </Link>
                <Link href={"/about"}>
                    <li>About</li>
                </Link>
                <Link href={"/blogs"}>
                    <li>Blog</li>
                </Link>
                <Link href={"/contact"}>
                    <li>Contact</li>
                </Link>
            </ul>
        </nav>
    );
};

export default Navbar;

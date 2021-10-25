import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Homepage</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlinkLight.js/9.12.0/styles/railscasts.min.css" />
      </Head>
        <nav>
          <div className={`${styles.logo} ${styles.link} ${styles.linkLight}`}><strong>Student-Net</strong></div>
          <ul className={styles.menu}>
            <div className={`${styles.menu__item} ${styles.toggle}`}><span /></div>
            <li className={styles.menu__item}><Link href="#"><a className={`${styles.link}`}>Home</a></Link></li>
            <li className={styles.menu__item}><Link href="#"><a className={`${styles.link}`}>Forum</a></Link></li>
            <li className={styles.menu__item}><Link href="#"><a className={`${styles.link}`}>Courses</a></Link></li>
            <li className={styles.menu__item}><Link href="#"><a className={`${styles.link}`}>Housing</a></Link></li>
            <li className={styles.menu__item}><Link href="#"><a className={`${styles.link}`}>Jobs</a></Link></li>
            <li className={styles.menu__item}><Link href="#"><a className={`${styles.link}`}>RateMyProf</a></Link></li>
          </ul>
        </nav>
      </div>
  )
}

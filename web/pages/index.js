import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
        <meta charSet="utf-8" />
        <meta name="description" content />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Homepage</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/railscasts.min.css" />
        <link rel="stylesheet" href="../styles/globals.css" />
        <nav>
          <div className="logo link--light"><strong>Student-Net</strong></div>
          <ul className="menu">
            <div className="menu__item toggle"><span /></div>
            <li className="menu__item"><a href="#" className="link link--light">Home</a></li>
            <li className="menu__item"><a href="#" className="link link--light">Forum</a></li>
            <li className="menu__item"><a href="#" className="link link--light">Courses</a></li>
            <li className="menu__item"><a href="#" className="link link--light">Housing</a></li>
            <li className="menu__item"><a href="#" className="link link--light">Jobs</a></li>
            <li className="menu__item"><a href="#" className="link link--light">RateMyProf</a></li>
          </ul>
        </nav>
      </div>
  )
}

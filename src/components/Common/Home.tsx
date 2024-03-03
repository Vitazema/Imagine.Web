import { Link } from "react-router-dom"
import classes from "./Home.module.css"

export default function Home() {
  return (
    <div className={classes.home}>
      <section>
        <h1>Welcome to Art Generator</h1>
        <h2>
          This is a simple application to generate art using different
          algorithms.
        </h2>
        <Link to="#" className={classes.btnStart}>
          Discover More
        </Link>
      </section>
    </div>
  )
}

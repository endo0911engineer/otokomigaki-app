import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.wrapper}>
        <h1>男磨き日記</h1>

        <div className={styles.function}> 
          <Link href="./login">
          Login
          </Link>
        </div>
        
        <div className={styles.function}>
          <Link href="./signup">
          Signup
          </Link>
        </div>
      </div>
    </div>
  );
}


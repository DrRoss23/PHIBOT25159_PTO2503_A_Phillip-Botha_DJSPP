import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
export default function Header() {
  return (
    <header className={styles.appHeader}>
      <h1>
        <Link to="/">🎙️ Podcast-Hub</Link>
      </h1>

      <nav className={styles.nav}>
        <Link to="/favourites">❤️ Favourites</Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}

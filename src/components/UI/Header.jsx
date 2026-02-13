import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAudioPlayer } from "../../context/AudioPlayerContext";
export default function Header() {
  const { resetListeningHistory } = useAudioPlayer();

  return (
    <header className={styles.appHeader}>
      <h1>
        <Link to="/">🎙️ Podcast-Hub</Link>
      </h1>

      <nav className={styles.nav}>
        <Link to="/favourites">❤️ Favourites</Link>
        <ThemeToggle />
        <button onClick={resetListeningHistory} className={styles.resetButton}>
          Reset Progress
        </button>
      </nav>
    </header>
  );
}

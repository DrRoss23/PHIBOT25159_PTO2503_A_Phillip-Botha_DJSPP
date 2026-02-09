import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import styles from "./EpisodeRow.module.css";

/**
 * EpisodeRow
 *
 * Renders a single episode row and allows the user to control
 * global audio playback for that episode.
 *
 * @param {Object} props
 * @param {Object} props.episode - Episode data including a unique _key
 * @param {number} props.index - Episode index within the season
 * @param {string} props.coverImage - Image to display for the episode
 *
 * @returns {JSX.Element}
 */
export default function EpisodeRow({ episode, index, coverImage }) {
  const { playEpisode, currentEpisode, isPlaying } = useAudioPlayer();

  const isCurrent = currentEpisode?.key === episode._key;

  return (
    <div className={styles.episodeCard}>
      <img
        className={styles.episodeCover}
        src={coverImage}
        alt={`Episode ${index + 1}`}
      />

      <div className={styles.episodeInfo}>
        <p className={styles.episodeTitle}>
          Episode {index + 1}: {episode.title}
        </p>

        <p className={styles.episodeDesc}>{episode.description}</p>

        <button
          className={styles.playButton}
          onClick={() =>
            playEpisode({
              ...episode,
              key: episode._key,
            })
          }
        >
          {isCurrent && isPlaying ? "Playing…" : "Play"}
        </button>
      </div>
    </div>
  );
}

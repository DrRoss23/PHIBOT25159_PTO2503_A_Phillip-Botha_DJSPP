import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { useFavourites } from "../../hooks/useFavourites";
import styles from "./EpisodeRow.module.css";

/**
 * EpisodeRow
 *
 * Renders a single episode row with playback and favourite controls.
 *
 * @param {Object} props
 * @param {Object} props.episode - Episode data including unique _key
 * @param {number} props.index - Episode index within the season
 * @param {string} props.coverImage - Image to display for the episode
 *
 * @returns {JSX.Element}
 */
export default function EpisodeRow({ episode, index, coverImage }) {
  const { playEpisode, currentEpisode, isPlaying, listeningHistory } =
    useAudioPlayer();
  const { isFavourited, addFavourite, removeFavourite } = useFavourites();

  const isCurrent = currentEpisode?.key === episode._key;
  const favourited = isFavourited(episode._key);

  // Listening progress
  const episodeHistory = listeningHistory?.[episode._key];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const toggleFavourite = () => {
    if (favourited) {
      removeFavourite(episode._key);
    } else {
      addFavourite({
        key: episode._key,
        episodeTitle: episode.title,
        episodeNumber: episode.episode,
        seasonIndex: episode.seasonIndex,
        showTitle: episode.showTitle,
        image: coverImage,
        addedAt: new Date().toISOString(),
      });
    }
  };

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

        {episodeHistory?.completed && (
          <p
            style={{
              fontSize: "0.85rem",
              marginTop: "0.25rem",
              color: "var(--text-secondary)",
            }}
          >
            ✅ Completed
          </p>
        )}

        {episodeHistory &&
          !episodeHistory.completed &&
          episodeHistory.progress >= 3 && (
            <p
              style={{
                fontSize: "0.85rem",
                marginTop: "0.25rem",
                color: "var(--text-secondary)",
              }}
            >
              ▶ Resume at {formatTime(episodeHistory.progress)}
            </p>
          )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "0.5rem",
          }}
        >
          <div>
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

          <button
            className={styles.favouriteButton}
            onClick={toggleFavourite}
            aria-label="Toggle favourite"
          >
            {favourited ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}

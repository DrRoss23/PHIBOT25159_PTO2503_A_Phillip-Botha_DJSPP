import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import styles from "./RecommendedCarousel.module.css";

/**
 * RecommendedCarousel
 *
 * Displays a looping, horizontally scrollable list of recommended podcasts
 * with arrow navigation and smooth bi-directional looping.
 *
 * @param {Object} props
 * @param {Array} props.podcasts
 *
 * @returns {JSX.Element}
 */
export default function RecommendedCarousel({ podcasts, genres }) {
  const trackRef = useRef(null);

  // Start the scroll position at a safe midpoint so looping feels natural
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // With duplicated content, quarter width lands at the start of the first real set
    track.scrollLeft = 0;
  }, []);

  const scrollByAmount = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const cardWidth = track.firstChild?.clientWidth || 200;
    const maxScroll = track.scrollWidth - track.clientWidth;

    // Forward-only looping via arrow
    if (direction === 1 && track.scrollLeft >= maxScroll - cardWidth) {
      track.scrollLeft = 0;
      return;
    }

    // Prevent backward looping entirely
    if (direction === -1 && track.scrollLeft <= 0) {
      return;
    }

    track.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;

    // Only loop when user reaches the true end
    if (track.scrollLeft >= maxScroll) {
      track.scrollLeft = 0;
    }
  };

  // Duplicate podcasts to enable seamless looping
  const loopedPodcasts = [...podcasts, ...podcasts];

  return (
    <section className={styles.carousel}>
      <div className={styles.header}>
        <h2>Recommended Shows</h2>

        <div className={styles.arrows}>
          <button aria-label="Scroll left" onClick={() => scrollByAmount(-1)}>
            ◀
          </button>
          <button aria-label="Scroll right" onClick={() => scrollByAmount(1)}>
            ▶
          </button>
        </div>
      </div>

      <div ref={trackRef} className={styles.track} onScroll={handleScroll}>
        {loopedPodcasts.map((podcast, index) => (
          <Link
            key={`${podcast.id}-${index}`}
            to={`/show/${podcast.id}`}
            state={{ genres: podcast.genres }}
            className={styles.card}
          >
            <img
              src={podcast.image}
              alt={podcast.title}
              className={styles.image}
            />
            <h3 className={styles.title}>{podcast.title}</h3>
            {podcast.genres && podcast.genres.length > 0 && genres && (
              <div className={styles.genres}>
                {podcast.genres.map((genreId, i) => {
                  const genreName =
                    genres.find((g) => g.id === genreId)?.title || genreId;
                  return (
                    <span key={i} className={styles.genreBadge}>
                      {genreName}
                    </span>
                  );
                })}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

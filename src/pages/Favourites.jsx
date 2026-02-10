import { useState } from "react";
import { useFavourites } from "../hooks/useFavourites";

/**
 * Favourites page
 *
 * Displays favourited episodes grouped by show
 * with sorting controls, show artwork, and a clear-all action.
 *
 * @returns {JSX.Element}
 */
export default function Favourites() {
  const { favourites, clearFavourites } = useFavourites();
  const [sortMode, setSortMode] = useState("newest");

  if (favourites.length === 0) {
    return <p style={{ padding: "1rem" }}>No favourites yet.</p>;
  }

  // group by show title
  const grouped = favourites.reduce((acc, fav) => {
    acc[fav.showTitle] = acc[fav.showTitle] || [];
    acc[fav.showTitle].push(fav);
    return acc;
  }, {});

  const sortEpisodes = (episodes) => {
    const sorted = [...episodes];

    if (sortMode === "az") {
      sorted.sort((a, b) => a.episodeTitle.localeCompare(b.episodeTitle));
    }

    if (sortMode === "za") {
      sorted.sort((a, b) => b.episodeTitle.localeCompare(a.episodeTitle));
    }

    if (sortMode === "newest") {
      sorted.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    }

    if (sortMode === "oldest") {
      sorted.sort((a, b) => new Date(a.addedAt) - new Date(a.addedAt));
    }

    return sorted;
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Favourites</h2>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <label>
          Sort by{" "}
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A–Z</option>
            <option value="za">Z–A</option>
          </select>
        </label>

        <button
          onClick={() => {
            if (confirm("Clear all favourites?")) {
              clearFavourites();
            }
          }}
          style={{
            padding: "0.4rem 0.8rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Clear all favourites
        </button>
      </div>

      {Object.entries(grouped).map(([showTitle, episodes]) => (
        <div key={showTitle} style={{ marginTop: "1.5rem" }}>
          <h3>{showTitle}</h3>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {sortEpisodes(episodes).map((fav) => (
              <li
                key={fav.key}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "0.75rem",
                  marginBottom: "0.5rem",
                  background: "#f4f4f4",
                  borderRadius: "6px",
                  alignItems: "center",
                }}
              >
                <img
                  src={fav.image}
                  alt={fav.showTitle}
                  style={{
                    width: "64px",
                    height: "64px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    flexShrink: 0,
                  }}
                />

                <div>
                  <strong>{fav.episodeTitle}</strong>
                  <div>
                    {fav.showTitle} • Season {fav.seasonIndex + 1} • Episode{" "}
                    {fav.episodeNumber}
                  </div>
                  <small>Added {new Date(fav.addedAt).toLocaleString()}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

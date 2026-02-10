import { useAudioPlayer } from "../hooks/useAudioPlayer";

export default function GlobalAudioPlayer() {
  const {
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    pause,
    resume,
    seek,
    stop,
  } = useAudioPlayer();

  if (!currentEpisode) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#111",
        color: "#fff",
        padding: "0.75rem 1rem",
        zIndex: 1000,
      }}
    >
      <div style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
        {currentEpisode.title}
      </div>

      {/* Progress bar */}
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
        style={{ width: "100%" }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "0.5rem",
        }}
      >
        <span style={{ fontSize: "0.75rem" }}>
          {Math.floor(currentTime)}s / {Math.floor(duration)}s
        </span>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {isPlaying ? (
            <button onClick={pause}>Pause</button>
          ) : (
            <button onClick={resume}>Play</button>
          )}
          <button onClick={stop}>Stop</button>
        </div>
      </div>
    </div>
  );
}

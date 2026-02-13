import { createContext, useContext, useRef, useState, useEffect } from "react";

const AudioPlayerContext = createContext(null);

const STORAGE_KEY = "djs_listening_history";

export function AudioPlayerProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // --- Listening History State ---
  const [listeningHistory, setListeningHistory] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  // Persist listening history
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listeningHistory));
  }, [listeningHistory]);

  // keep time + duration in sync
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);

      if (!currentEpisode?.key) return;

      const key = currentEpisode.key;

      setListeningHistory((prev) => {
        const existing = prev[key] || {};

        const completed =
          audio.duration > 0 && audio.currentTime >= audio.duration * 0.95;

        return {
          ...prev,
          [key]: {
            progress: audio.currentTime,
            duration: audio.duration,
            completed,
          },
        };
      });
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [currentEpisode]);

  const playEpisode = (episode) => {
    if (!episode?.file) return;

    const episodeKey = episode.key;

    const audio = audioRef.current;

    if (currentEpisode?.key !== episodeKey) {
      audio.src = episode.file;
      audio.load();
      setCurrentEpisode({ ...episode, key: episodeKey });

      // Resume logic
      const stored = localStorage.getItem(STORAGE_KEY);
      const history = stored ? JSON.parse(stored) : {};
      const saved = history[episodeKey];

      if (saved?.progress && !saved.completed) {
        const handleResume = () => {
          audio.currentTime = saved.progress;
          audio.removeEventListener("loadedmetadata", handleResume);
        };

        audio.addEventListener("loadedmetadata", handleResume);
      }
    }

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.error("Audio playback failed:", err));
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const resume = () => {
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.error("Audio playback failed:", err));
  };

  const stop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentEpisode(null);
    setCurrentTime(0);
    setDuration(0);
  };

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const resetListeningHistory = () => {
    setListeningHistory({});
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        audioRef,
        currentEpisode,
        isPlaying,
        currentTime,
        duration,
        playEpisode,
        pause,
        resume,
        stop,
        seek,
        listeningHistory,
        resetListeningHistory,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  }
  return context;
}

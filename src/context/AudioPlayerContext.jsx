import { createContext, useContext, useRef, useState, useEffect } from "react";

const AudioPlayerContext = createContext(null);

export function AudioPlayerProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // keep time + duration in sync
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
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
  }, []);

  const playEpisode = (episode) => {
    if (!episode?.file) return;

    // derive a stable episode identity
    const episodeKey = episode.key;

    if (currentEpisode?.key !== episodeKey) {
      audioRef.current.src = episode.file;
      audioRef.current.load();
      setCurrentEpisode({ ...episode, key: episodeKey });
      setCurrentTime(0);
    }

    audioRef.current
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

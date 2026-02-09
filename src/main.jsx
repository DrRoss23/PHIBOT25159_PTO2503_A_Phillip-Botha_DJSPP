import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { AudioPlayerProvider } from "./context/AudioPlayerContext";
import GlobalAudioPlayer from "./components/GlobalAudioPlayer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AudioPlayerProvider>
        <App />
        <GlobalAudioPlayer />
      </AudioPlayerProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

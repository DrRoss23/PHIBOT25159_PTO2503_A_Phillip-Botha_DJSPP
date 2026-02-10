import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { AudioPlayerProvider } from "./context/AudioPlayerContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import GlobalAudioPlayer from "./components/GlobalAudioPlayer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AudioPlayerProvider>
        <FavouritesProvider>
          <App />
          <GlobalAudioPlayer />
        </FavouritesProvider>
      </AudioPlayerProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

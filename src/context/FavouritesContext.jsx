import { createContext, useContext, useEffect, useState } from "react";

const FavouritesContext = createContext(null);
const STORAGE_KEY = "djs_favourites";

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // persist favourites to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const isFavourited = (episodeKey) => {
    return favourites.some((fav) => fav.key === episodeKey);
  };

  const addFavourite = (favourite) => {
    setFavourites((prev) => [...prev, favourite]);
  };

  const removeFavourite = (episodeKey) => {
    setFavourites((prev) => prev.filter((fav) => fav.key !== episodeKey));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        isFavourited,
        addFavourite,
        removeFavourite,
        clearFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within FavouritesProvider");
  }
  return context;
}

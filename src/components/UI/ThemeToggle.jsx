import { useTheme } from "../../context/ThemeContext";

/**
 * ThemeToggle
 *
 * Allows user to switch between light and dark mode.
 */

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={() => {
        console.log("Current theme:", theme);
        toggleTheme();
      }}
    >
      {theme === "light" ? "🌙 Dark" : "☀ Light"}
    </button>
  );
}

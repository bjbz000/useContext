// scenarios/BasicContext.js
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext("light");

const Display = () => {
  const theme = useContext(ThemeContext);
  return (
    <div className={`rerender-box rerender-${theme}`}>
      <h4>Basic Theme: {theme.toUpperCase()}</h4>
    </div>
  );
};

export default function BasicContext() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={() => setTheme(t => t === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
      <Display />
    </ThemeContext.Provider>
  );
}

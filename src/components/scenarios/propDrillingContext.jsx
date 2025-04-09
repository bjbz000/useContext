// scenarios/PropDrillingContext.js
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext("light");

const GreatGrandChild = () => {
  const theme = useContext(ThemeContext);
  return (
    <div className={`rerender-box rerender-${theme}`}>
      <h4>Prop Drilled Theme: {theme.toUpperCase()}</h4>
    </div>
  );
};

const GrandChild = () => <GreatGrandChild />;
const Child = () => <GrandChild />;

export default function PropDrillingContext() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={() => setTheme(t => t === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
      <Child />
    </ThemeContext.Provider>
  );
}

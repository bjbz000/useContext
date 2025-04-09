// scenarios/RerenderIssueContext.js
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const DisplayTheme = () => {
  const { theme } = useContext(ThemeContext);
  console.log("🎨 Theme Component Re-rendered");
  return (
    <div className={`rerender-box rerender-${theme}`}>
      <h4>Theme is: {theme.toUpperCase()}</h4>
    </div>
  );
};

const IrrelevantComponent = () => {
  console.log("❌ Irrelevant Component Re-rendered");
  return (
    <div className="rerender-box rerender-light">
      <h4>Unrelated Component (shouldn’t re-render)</h4>
    </div>
  );
};

export default function RerenderIssueContext() {
  const [theme, setTheme] = useState("light");
  const value = { theme, toggle: () => setTheme(t => (t === "light" ? "dark" : "light")) };

  return (
    <ThemeContext.Provider value={value}>
      <button onClick={value.toggle}>Toggle Theme</button>
      <DisplayTheme />
      <IrrelevantComponent />
    </ThemeContext.Provider>
  );
}

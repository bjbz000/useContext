// scenarios/MemoizedContext.js
import React, { createContext, useContext, useState, useMemo, useCallback } from "react";

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

const IrrelevantComponent = React.memo(() => {
  console.log("✅ Irrelevant Component NOT re-rendered");
  return (
    <div className="rerender-box rerender-light">
      <h4>Unrelated Component (memoized)</h4>
    </div>
  );
});

export default function MemoizedContext() {
  const [theme, setTheme] = useState("light");

  const toggle = useCallback(() => {
    setTheme(t => (t === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(() => ({ theme, toggle }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <button onClick={toggle}>Toggle Theme</button>
      <DisplayTheme />
      <IrrelevantComponent />
    </ThemeContext.Provider>
  );
}

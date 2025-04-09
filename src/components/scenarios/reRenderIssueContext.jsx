// // scenarios/RerenderIssueContext.js
// import React, { createContext, useContext, useState } from "react";

// const ThemeContext = createContext();

// const DisplayTheme = () => {
//   const { theme } = useContext(ThemeContext);
//   console.log("🎨 Theme Component Re-rendered");
//   return (
//     <div className={`rerender-box rerender-${theme}`}>
//       <h4>Theme is: {theme.toUpperCase()}</h4>
//     </div>
//   );
// };

// const IrrelevantComponent = () => {
//   console.log("❌ Irrelevant Component Re-rendered");
//   return (
//     <div className="rerender-box rerender-light">
//       <h4>Unrelated Component (shouldn’t re-render)</h4>
//     </div>
//   );
// };

// export default function RerenderIssueContext() {
//   const [theme, setTheme] = useState("light");
//   const value = { theme, toggle: () => setTheme(t => (t === "light" ? "dark" : "light")) };

//   return (
//     <ThemeContext.Provider value={value}>
//       <button onClick={value.toggle}>Toggle Theme</button>
//       <DisplayTheme />
//       <IrrelevantComponent />
//     </ThemeContext.Provider>
//   );
// }

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    useEffect
  } from "react";
  
  const ThemeContext = createContext();
  
  const DisplayTheme = () => {
    const { theme } = useContext(ThemeContext);
    const [renderTime, setRenderTime] = useState("");
  
    useEffect(() => {
      setRenderTime(new Date().toLocaleTimeString());
    }, [theme]);
  
    console.log("🎨 DisplayTheme re-rendered");
  
    return (
      <div className={`rerender-box rerender-${theme}`}>
        <h4>Theme is: {theme.toUpperCase()}</h4>
        <p>Rendered at: <strong>{renderTime}</strong></p>
      </div>
    );
  };
  
  const IrrelevantComponent = React.memo(({ renderSignal }) => {
    const [renderTime, setRenderTime] = useState("");
  
    useEffect(() => {
      // Update render time on re-render
      setRenderTime(new Date().toLocaleTimeString());
    }, [renderSignal]); // triggers whenever renderSignal changes
  
    console.log("🟠 IrrelevantComponent re-rendered");
  
    return (
      <div className="rerender-box rerender-highlight">
        <h4>🧩 Unrelated Component</h4>
        <p>This component re-renders only if toggle is ON.</p>
        <p>Rendered at: <strong>{renderTime}</strong></p>
      </div>
    );
  });
  
  export default function RerenderIssueContextWithToggle() {
    const [theme, setTheme] = useState("light");
    const [trackUnrelated, setTrackUnrelated] = useState(true);
  
    const toggleTheme = useCallback(() => {
      setTheme((t) => (t === "light" ? "dark" : "light"));
    }, []);
  
    const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);
  
    return (
      <ThemeContext.Provider value={contextValue}>
        <div style={{ marginBottom: 12 }}>
          <button onClick={toggleTheme}>Toggle Theme</button>
          <label style={{ marginLeft: 16 }}>
            <input
              type="checkbox"
              checked={trackUnrelated}
              onChange={(e) => setTrackUnrelated(e.target.checked)}
              style={{ marginRight: 6 }}
            />
            Show Unrelated Component Re-render
          </label>
        </div>
  
        <DisplayTheme />
  
        {/* Trigger re-render only if toggle is ON */}
        {trackUnrelated ? (
          <IrrelevantComponent renderSignal={theme} />
        ) : (
          <IrrelevantComponent renderSignal="static" />
        )}
      </ThemeContext.Provider>
    );
  }
  
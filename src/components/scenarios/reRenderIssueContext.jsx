import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

// Context
const ThemeContext = createContext();

// Displays theme + re-render time
const DisplayTheme = () => {
  const  theme  = useContext(ThemeContext);
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, [theme]);

  return (
    <div className={`box box-${theme}`}>
      <h3>Theme: {theme.toUpperCase()}</h3>
      <p>Rendered at: <strong>{time}</strong></p>
    </div>
  );
};

// Memoized component that re-renders conditionally
const IrrelevantComponent = React.memo(({ trigger }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, [trigger]);

  return (
    <div className="box highlight">
      <h3>Unrelated Component</h3>
      <p>Rendered at: <strong>{time}</strong></p>
    </div>
  );
});

// Main Component
export default function RerenderIssueContext() {
  const [theme, setTheme] = useState("light");
  const [track, setTrack] = useState(true);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const contextValue = useMemo(() => ({ theme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div style={{ marginBottom: 16 }}>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <label style={{ marginLeft: 16 }}>
          <input
            type="checkbox"
            checked={track}
            onChange={(e) => setTrack(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          Re-render Unrelated Component
        </label>
      </div>

      <DisplayTheme />
      <IrrelevantComponent trigger={track ? theme : "static"} />
    </ThemeContext.Provider>
  );
}

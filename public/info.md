<div style="font-size: 50px; font-weight:700">
  useContext
</div>

## __1. What is Context API?__

- Context API is a React feature used to share data globally across components.

- It helps you avoid prop drilling — which is when you pass props from parent → child → grandchild unnecessarily.

- Common global data:

    - Auth state (user info)

    - Theme (dark/light)

    - Language (locale)

    - Cart data in e-commerce.

## __2. What is useContext?__

- `useContext` is a React Hook.

- It lets you access the data from a context in any functional component.

- It must be used inside a matching <Context.Provider>.

## __3. Parts of Context API__

| Component                   | What is does                                      |
| --------------------------- | ------------------------------------------------- |
| createContext()             | Creates a new context object                      |
| <Context.Provider>          | Provides the context value to children            |
| useContext()                | Consumes the context inside functional components |
<!-- | <Context.Consumer>          | Used in class components                          | -->

## __4. Basic Examples of Usage__

### 1. Creating the context

```javascript
import { createContext } from 'react';

const ThemeContext = createContext();
```
- Creating a new context named `ThemeContext`.

- This returns an object with `Provider` and `Consumer`.


### 2. Create a provider component

```javascript
import { useState } from 'react';

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```
- `darkMode` is your state (false = light, true = dark).

- `toggleTheme` switches between dark/light.

- The `value` prop in `<Provider>` contains the data you want to share.


### 3. Access the context with useContext

```javascript
import { useContext } from 'react';

function ThemeButton() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      {darkMode ? 'Dark Mode On' : 'Light Mode On'}
    </button>
  );
}
```
- `useContext(ThemeContext)` gives you access to `darkMode` and `toggleTheme`.

- No props are passed — it’s clean and global.

### 4. Wrap your app with the provider

```javascript
import { ThemeProvider } from '../context/ThemeContext';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

## __5. Simple  Data Flow of Context__

- You create a context.

- You wrap your app/components in a provider.

- You use useContext() in components to access shared data.

- When the context value changes, all consumers re-render.

## __6. When to Use useContext__

- You want to share global state across many components.

- You want to avoid prop drilling.

- You have data like:

  - Auth/user info

  - Cart data

  - Theme settings

  - UI state (open modals, etc.)

## __7. When NOT to Use Context__

- Very frequently changing values (e.g., input field states) — they cause re-renders.

- Large apps with complex logic.


## __8. Memoizing Context Value__

- Memoizing just means: “Remember this value so it doesn’t get recreated every time.”

- When a component re-renders, all values inside it are re-created — including functions and objects.

- If the value passed to `<Context.Provider value={...}>` is recreated on every render, then all components using that context will also re-render, even if the data hasn't changed.

- This can lead to unnecessary performance issues.

###  Why Do We Memoize Context Values?
- To prevent unnecessary re-renders of all components that use the context.
- To improve performance in medium to large apps.
- To make sure the value only changes when the actual data changes.

### What Happens If You Don’t Memoize?

- Every time the Provider’s parent re-renders, even if data hasn’t changed:

  - A new object or function is created.

  - React sees this new reference as a "change".

  - All components using `useContext()` will re-render, even if the actual data is the same.

- This is especially problematic if:

  - The context holds large data or many functions.

  - The app has many components depending on that context.

  - There are frequent re-renders due to unrelated changes.


### How to Memoize the Value?

- You use the useMemo() hook.

```javascript
const value = useMemo(() => ({ darkMode, toggleTheme }), [darkMode]);
<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
```

### When Should You Use `useMemo()` with Context?

- You're passing objects or functions to <Provider value={...}>

- The context is used in many places in the app

- You notice unnecessary re-renders

- You're optimizing for performance-sensitive UI

### When You Can Skip It

- You're passing a primitive value like a string or boolean.  
E.g., value={true} or value="dark" — no need to memoize.

- The context is used in only 1 or 2 components, and the performance impact is tiny.

- The value is not being updated often, or only on mount.
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
| <Context.Consumer>          | Legacy method (used in class components)          |

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


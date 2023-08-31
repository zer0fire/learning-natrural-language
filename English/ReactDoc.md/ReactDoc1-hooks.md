# Built-in React Hooks

Hooks let you use different React features from your components. You can either use the built-int Hooks of combine them to build your own. This page lists all built-int hooks in React

## State Hooks

State hooks let a component "remember" information like user input. For example, a form component can use state to store the input value, while an image gallery component can use state to store the selected image index

`useState` declares a state variable that you can update directly

```js
function App() {
  const [state, setState] = useState(0);
}
```

`useReducer` declares a state variable with the update logic inside a reducer function

```js
function reducerFunc(initState, action) {}

function App() {
  const [store, dispatch] = useReducer({ count: 0 }, reducerFunc);

  return <div>{store.count}</div>;
}
```

## Context Hooks

Context hooks lets a component receive information from distant parents without passing it as props. For example, your app's top-level component can pass the current UI theme to all components below, no matter how deep

`useContext` - `createContext` - `createPortal`
reads and subscribes to a context

```js
const ThemeContext = createContext({ fontSize: 10 });

function Button() {
  const theme = useContext(ThemeContext);
}
```

## Ref hooks

Ref hooks let a component hold some information that isn't used for rendering, like a DOM node or a timeout ID. Unlike with state, updating a ref does not re-render your component, Refs are an "escape hatch"[逃生口] from the React paradigm[范式]
. They are useful when you need to work with non-React systems, such as the built-int browser APIs, like Canvas APIs, Web socket APIs

`useRef` declares a ref. You can hold any value in it, but most often it's used to hold a DOM node.

`useImperativeHandle` lets you customized the ref exposed by your component. This is rarely used

```js
function Form() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.focus();
  });
  return <input ref={inputRef} />;
}
```

## Effect Hooks

Effect hooks let a component connect to and synchronize with external systems. This includes dealing the network, browser DOM, animations, widgets written using a different UI library, and other non-React code

`useEffect` connects a component to an external system, runs side effect or any other function. Effect hooks are an "escape hatch" from the React paradigm. (asynchronous)

Don't use Effects to orchestrate the data flow of your application. If you're not interacting with an external system, you might not need an Effect

`useLayoutEffect` fires before the browser repaints the screen, You can measure layout here(synchronous)

`useInsertionEffect` fires before React make changes to the DOM. Libraries can insert dynamic CSS here

## Performance Hooks

a common way tp optimize re-rendering performance is to skip unnecessary work. For example you can tell React to reuse a cached calculation or to skip a re-render if the data has not changed since the previous render

To skip calculation and unnecessary re-rendering, use one of these Hooks:

(Use these hooks to make some performance optimization
)

`useMemo`, lets you cache the result of an expensive calculation. memoized this value until the dependence be changed

`useCallback`, lets you cache a function definition before passing it down to an optimized component. memoized the function until the dependence be changed

```js
function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  const callback = useCallback(() => inputRef.focus(), [inputRef]);
}
```

`useTransition`, lets you mark a state transition as non-blocking and allow other updates to interrupt it. schedule some asynchronous task in a delay time

- `flushSync`

`useDeferredValue` let you defer updating a non-critical part of the UI and lets other parts update first

## Other Hooks

These Hooks are mostly useful to library authors and aren't commonly used in the application code

`useDebugValue` lets you customize the label React DevTools displays for your custom Hook

`useId` lets a components associate a unique ID with itself, Typically used with accessibility APIs

`useSyncExternalStore` lets a component subscribe to an external store

## Question

What is the difference between Meta-framework and library

# API Reference - Hooks

## State Hooks

`useState` is a React Hook that lets you add a state variable to your component

```js
import { useState } from "react";

function MyComp() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState("Taylor");
  const [todos, setTodos] = useState(() => createTodos());

  function handleClick() {
    setName("Taylor");
    setAge((a) => a + 1);
  }
}
```

`useReducer` is React hook that lets you add a reducer to your component

```js
function reducer(state, action) {}

function MyComp() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });

  function handleClick() {
    dispatch({ type: "increment_age" });
  }
}
```

## Context Hooks

These two State hooks are all only update the state variable for the next render

`useContext` is a React hooks that lets you read and subscribe to context from your component

```js
const ThemeContext = React.createContext(null);

function MyApp() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <MyComp />
    </ThemeContext.Provider>
  );
}

function MyComp() {
  const theme = useContext(ThemeContext);
  const className = `panel-${theme}`;
  return (
    <section className={className}>
      <h1>title</h1>
    </section>
  );
}
```

high level usage

```js
function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const login = useCallback((res) => {
    storeCredential(res.credentials);
    setCurrentUser(res.user);
  }, []);
  const contextVal = useMemo(() => {
    currentUser, login;
  }, [currentUser, login]);

  return (
    <AuthContext.Provider value={contextVal}>
      <Page />
    </AuthContext.Provider>
  );
}
```

`useDeferredValue` defer updating a part of the UI(maybe more like macro task)

Parameters of `useDeferredValue` is `value` that you want to defer

Indicating[表示] that the content is stable
`useDeferredValue` return a defer value, It can compare with stable value, when the defer value equal the state value, represent the defer value is stable and don't need rerender

```js
function SearchPage() {
  const [query, setQuery] = useState("");
  const [deferredQuery] = useDeferredValue(query);
  const isStable = query !== deferredQuery;
  return (
    <>
      <Suspense fallback={<h2>loading...</h2>}>
        <div
          style={{
            opacity: isStale ? 0.5 : 1,
            transition: isStale
              ? "opacity 0.2s 0.2s linear"
              : "opacity 0s 0s linear",
          }}
        ></div>
      </Suspense>
    </>
  );
}
```

`useTransition` update the state without blocking the UI (maybe more like micro task)

```js
function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState("about");
  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  if (isPending) {
    return <b className="pending">{children}</b>;
  }
}
```

`useImperativeHandle` customize the handle exposed as a ref

exposing a custom ref handle to the parent component

```js
const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = (useRef = null);
  useImperativeHandle(
    ref,
    () => {
      return {
        // ...method
        focus() {
          inputRef.current.focus();
        },
        scrollIntoView() {
          inputRef.current.scrollIntoView();
        },
      };
    },
    []
  );
  return <input {...props} ref={inputRef} />;
});
```

exposing your own imperative methods

```js
const Post = forwardRef((props, ref) => {
  const commentsRef = useRef(null);
  const addCommentsRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollAndFocusAddComment() {
          commentRef.current.scrollToBottom();
          addCommentsRef.current.focus();
        },
      };
    },
    []
  );
  return (
    <Comment ref={commentsRef} />
    <AddComment ref={addCommentsRef} />
  )
});
```

`useInsertionEffect` allows inserting elements into the DOM before any layout effects fire

injecting dynamic styles from CSS-in-JS libraries

`useEffect` and `useInsertionEffect` don't run on the server. If app need to collect which CSS rules have been used on the server, you can do it during rendering

```js
// server
let collectedRulesSet = new Set();

let isInserted = new Set();
function useCss(rule) {
  if (typeof window === "undefined") {
    collectedRulesSet.add(rule);
  }

  useInsertionEffect(() => {
    if (!isInserted.has(rule)) {
      isInserted.add(rule);
      document.head.appendChild(getStyleForRule(rule));
    }
  });
  return rule;
}

function Button() {
  const className = useCss("...");
  return <div className={className}></div>;
}
```

`useRef` reference a value that's not needed for rendering

# Conclusion

State
`useState`
`useReducer`

Context
`useContext`

Reference
`useRef` export a ref value, not mutable, and it can't trigger rerender in React environment
`useImperativeHandle` export customize ref

Side Effect
`useEffect` after DOM change, asynchronous state
`useInsertionEffect` before DOM change
`useLayoutEffect` before repaint, synchronous state

Optimization
`useMemo` memoized a value
`useCallback` memoized a function
`useTransition` not important, defer value
`useDeferredValue` defer updating a part of the UI

Other
`useId` generate id
`useDebugValue` React devtools, use it set value
`useSyncExternalStore` subscribe a external state store

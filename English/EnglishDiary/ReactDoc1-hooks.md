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

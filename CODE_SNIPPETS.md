# React 代码片段速查手册

快速查找常见 React 模式的实现代码。

---

## 🎯 基础片段

### 1. 简单计数器

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

export default Counter;
```

### 2. 表单输入

```jsx
import { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // 提交表单
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
```

### 3. 列表渲染

```jsx
import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build Projects" },
  ]);

  const addTodo = (text) => {
    setTodos([
      ...todos,
      {
        id: Math.max(...todos.map((t) => t.id), 0) + 1,
        text,
      },
    ]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo("New task")}>Add</button>
    </div>
  );
}

export default TodoList;
```

### 4. 条件渲染

```jsx
import { useState } from "react";

function LoginForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Welcome back!</p>
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please login</p>
          <button onClick={() => setIsLoggedIn(true)}>Login</button>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
```

---

## 🪝 Hooks 片段

### 5. useEffect - 获取数据

```jsx
import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();

        if (isMounted) {
          setUser(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

export default UserProfile;
```

### 6. useEffect - 订阅和清理

```jsx
import { useState, useEffect } from "react";

function EventListener() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // 清理函数 - 组件卸载时移除监听器
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 只在挂载和卸载时运行

  return <div>Window width: {windowWidth}px</div>;
}

export default EventListener;
```

### 7. useCallback - 优化函数引用

```jsx
import { useState, useCallback } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  // 不使用 useCallback - 每次渲染都创建新函数
  const handleClickBad = () => {
    setCount((c) => c + 1);
  };

  // 使用 useCallback - 函数引用保持不变
  const handleClickGood = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <Child onClick={handleClickGood} /> {/* 可以安全地传递给 memo 组件 */}
    </div>
  );
}

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Increment</button>;
});

export default Parent;
```

### 8. useMemo - 缓存计算结果

```jsx
import { useState, useMemo } from "react";

function Calculator() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const [renderCount, setRenderCount] = useState(0);

  // 这个计算只在 a 或 b 改变时重新执行
  const sum = useMemo(() => {
    console.log("Calculating sum...");
    return a + b;
  }, [a, b]);

  return (
    <div>
      <p>A: {a}</p>
      <p>B: {b}</p>
      <p>Sum: {sum}</p>
      <p>Render count: {renderCount}</p>

      <button onClick={() => setA(a + 1)}>A++</button>
      <button onClick={() => setB(b + 1)}>B++</button>
      <button onClick={() => setRenderCount(renderCount + 1)}>
        Force Render
      </button>
    </div>
  );
}

export default Calculator;
```

### 9. useReducer - 复杂状态管理

```jsx
import { useReducer } from "react";

const initialState = {
  count: 0,
  name: "John",
};

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Name: {state.name}</p>

      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>

      <input
        value={state.name}
        onChange={(e) =>
          dispatch({
            type: "SET_NAME",
            payload: e.target.value,
          })
        }
      />

      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}

export default Counter;
```

### 10. useContext - 全局状态

```jsx
import { createContext, useContext, useState } from "react";

// 创建 Context
const ThemeContext = createContext();

// Provider 组件
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 自定义 Hook
export function useTheme() {
  return useContext(ThemeContext);
}

// 使用
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Content />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <button onClick={toggleTheme}>
        Toggle to {theme === "light" ? "dark" : "light"}
      </button>
    </header>
  );
}

function Content() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      Content here
    </div>
  );
}

export default App;
```

---

## 🎨 高级片段

### 11. 自定义 Hook - useAsync

```jsx
import { useState, useEffect } from "react";

function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!immediate) return;

    const execute = async () => {
      try {
        setStatus("pending");
        const response = await asyncFunction();
        setData(response);
        setStatus("success");
      } catch (err) {
        setError(err);
        setStatus("error");
      }
    };

    execute();
  }, [asyncFunction, immediate]);

  return { status, data, error };
}

// 使用示例
function DataFetcher() {
  const fetchData = async () => {
    const res = await fetch("/api/data");
    return res.json();
  };

  const { status, data, error } = useAsync(fetchData);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return <div>{JSON.stringify(data)}</div>;
}

export default DataFetcher;
```

### 12. 自定义 Hook - useLocalStorage

```jsx
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // 获取初始值
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 保存到 localStorage
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// 使用示例
function App() {
  const [name, setName] = useLocalStorage("name", "John");

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>Saved name: {name}</p>
    </div>
  );
}

export default App;
```

### 13. 防抖 (Debounce) Hook

```jsx
import { useState, useEffect } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// 使用示例
function SearchUsers() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (debouncedSearch) {
      // 调用 API
      fetch(`/api/search?q=${debouncedSearch}`)
        .then((res) => res.json())
        .then(setResults);
    }
  }, [debouncedSearch]);

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchUsers;
```

### 14. 高阶组件 (HOC)

```jsx
import React from "react";

// 通用的 withLoading HOC
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

const UserListWithLoading = withLoading(UserList);

// 使用
function App() {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
        setLoading(false);
      });
  }, []);

  return <UserListWithLoading isLoading={loading} users={users} />;
}

export default App;
```

### 15. 渲染 props 模式

```jsx
function DataFetcher({ url, children }) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return children({ data, loading, error });
}

// 使用
function App() {
  return (
    <DataFetcher url="/api/users">
      {({ data, loading, error }) => (
        <>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {data && (
            <ul>
              {data.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </DataFetcher>
  );
}

export default App;
```

---

## 📋 组件模式

### 16. 受控组件

```jsx
import { useState } from "react";

function ControlledInput() {
  const [value, setValue] = useState("");

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <p>You typed: {value}</p>
    </div>
  );
}

export default ControlledInput;
```

### 17. 非受控组件

```jsx
import { useRef } from "react";

function UncontrolledInput() {
  const inputRef = useRef();

  const handleClick = () => {
    console.log(inputRef.current.value);
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleClick}>Get Value</button>
    </div>
  );
}

export default UncontrolledInput;
```

### 18. 复合组件模式

```jsx
import { createContext, useContext, useState } from "react";

const TabsContext = createContext();

function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div style={{ display: "flex" }}>{children}</div>;
}

function Tab({ children, index }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <button
      onClick={() => setActiveTab(index)}
      style={{
        background: activeTab === index ? "#007bff" : "#f0f0f0",
        color: activeTab === index ? "white" : "black",
      }}
    >
      {children}
    </button>
  );
}

function TabContent({ children, index }) {
  const { activeTab } = useContext(TabsContext);

  return activeTab === index ? <div>{children}</div> : null;
}

// 使用
function App() {
  return (
    <Tabs defaultTab={0}>
      <TabList>
        <Tab index={0}>Tab 1</Tab>
        <Tab index={1}>Tab 2</Tab>
        <Tab index={2}>Tab 3</Tab>
      </TabList>

      <TabContent index={0}>Content 1</TabContent>
      <TabContent index={1}>Content 2</TabContent>
      <TabContent index={2}>Content 3</TabContent>
    </Tabs>
  );
}

export default App;
```

---

## 🚀 性能优化

### 19. React.memo - 防止不必要的重新渲染

```jsx
import React from "react";

// 不使用 memo 的组件
function Greeting({ name }) {
  console.log(`Greeting ${name} rendered`);
  return <div>Hello {name}</div>;
}

// 使用 memo 的组件
const MemoizedGreeting = React.memo(function Greeting({ name }) {
  console.log(`Greeting ${name} rendered`);
  return <div>Hello {name}</div>;
});

// 只有当 props 改变时才重新渲染
```

### 20. React.lazy 和 Suspense - 代码分割

```jsx
import React, { Suspense, lazy } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}

export default App;
```

---

这些片段涵盖了 React 开发的大部分常见场景。需要时可以复制并修改以适应你的具体需求。

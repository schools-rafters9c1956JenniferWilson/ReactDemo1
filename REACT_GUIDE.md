# 🚀 Vue 开发者的 React 学习指南

> 如果你已经学过 Vue，那么学习 React 会更容易。本指南帮助你快速掌握 React 的核心概念。

## 📚 目录

1. [基础概念](#基础概念)
2. [Hooks - React 的灵魂](#hooks---react-的灵魂)
3. [组件系统](#组件系统)
4. [进阶概念](#进阶概念)
5. [关键差异总结](#关键差异总结)
6. [最佳实践](#最佳实践)

---

## 基础概念

### 什么是 JSX？

JSX 是 JavaScript 的扩展，允许你在 JavaScript 中写类似 HTML 的代码。

```jsx
// Vue - 分离 template 和 script
<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="increment">增加</button>
  </div>
</template>

<script>
export default {
  data() { return { count: 0 } },
  methods: {
    increment() { this.count++ }
  }
}
</script>
```

```jsx
// React - JSX 将 template 和 script 融合
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}
```

### 核心概念对应表

| 概念       | Vue                             | React                                  |
| ---------- | ------------------------------- | -------------------------------------- |
| 模板语法   | `{{ variable }}`                | `{variable}`                           |
| 事件绑定   | `@click="handler"`              | `onClick={handler}`                    |
| CSS 类绑定 | `:class="{ active: isActive }"` | `className={isActive ? 'active' : ''}` |
| 属性绑定   | `:src="url"`                    | `src={url}`                            |
| 表单绑定   | `v-model="value"`               | `value={value} onChange={...}`         |

### 三种常见模式

#### 1. 条件渲染

```jsx
// Vue
<div v-if="isLoggedIn">已登录</div>
<div v-else>未登录</div>

// React - 使用 JavaScript 逻辑
isLoggedIn ? <div>已登录</div> : <div>未登录</div>

// 或使用 && 操作符
isLoggedIn && <div>已登录</div>
```

#### 2. 列表渲染

```jsx
// Vue
<ul>
  <li v-for="item in items" :key="item.id">
    {{ item.name }}
  </li>
</ul>

// React
<ul>
  {items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

#### 3. 双向绑定

```jsx
// Vue
<input v-model="message" />
<p>{{ message }}</p>

// React
const [message, setMessage] = React.useState('');

<input
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
<p>{message}</p>
```

---

## Hooks - React 的灵魂

Hooks 是 React 16.8 引入的特性，让函数组件也能使用状态和其他 React 特性。

### useState - 状态管理

```jsx
// 基本用法
const [count, setCount] = React.useState(0);

// 函数式更新 - 避免闭包问题
setCount((prevCount) => prevCount + 1);

// 对象状态
const [user, setUser] = React.useState({ name: "", age: 0 });
setUser({ ...user, name: "Alice" });
```

### useEffect - 副作用处理

```jsx
// 在组件挂载时运行一次（对标 onMounted）
React.useEffect(() => {
  console.log("组件已挂载");
}, []);

// 监听特定依赖（对标 watch）
React.useEffect(() => {
  console.log("count 变化了:", count);
}, [count]);

// 清理函数（对标 onUnmounted）
React.useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);

// 每次渲染都运行
React.useEffect(() => {
  console.log("渲染了");
});
```

### useCallback - 函数记忆化

```jsx
// 避免创建新函数，优化性能
const handleClick = React.useCallback(() => {
  // 函数体
}, [dependencies]);

// 等同于 Vue 中的做法
methods: {
  handleClick() { /* ... */ }
}
```

### useContext - 跨组件通信

```jsx
// 创建 Context（对标 provide/inject）
const UserContext = React.createContext(null);

// Provider 组件
function App() {
  const user = { name: "Alice" };
  return (
    <UserContext.Provider value={user}>
      <UserProfile />
    </UserContext.Provider>
  );
}

// 在子组件中使用
function UserProfile() {
  const user = React.useContext(UserContext);
  return <div>{user.name}</div>;
}
```

### useMemo - 性能优化

```jsx
// 缓存计算结果（对标 computed）
const expensiveResult = React.useMemo(() => {
  return complexCalculation(data);
}, [data]);

// 对比 Vue computed
computed: {
  expensiveResult() {
    return this.complexCalculation(this.data);
  }
}
```

### useReducer - 复杂状态管理

```jsx
// 适合有多个相关状态的场景
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { count: state.count + 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

const [state, dispatch] = React.useReducer(reducer, { count: 0 });

dispatch({ type: "ADD" });
dispatch({ type: "RESET" });
```

---

## 组件系统

### Props - 数据向下流动

```jsx
// 函数组件的 Props 就是函数参数
function Button({ label, onClick, variant }) {
  return <button onClick={onClick}>{label}</button>;
}

// 使用组件
<Button label="点击我" onClick={handleClick} variant="primary" />;
```

### 类型定义（TypeScript）

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return <button className={variant}>{label}</button>;
}
```

### 组件之间的通信

```jsx
// 自下而上：子组件通过函数参数发送事件
function Parent() {
  const handleDelete = (id) => console.log("删除:", id);

  return <Child onDelete={handleDelete} />;
}

function Child({ onDelete }) {
  return <button onClick={() => onDelete(1)}>删除</button>;
}
```

### 组件插槽（对标 Vue Slot）

```jsx
// Vue
<template>
  <div class="card">
    <slot></slot>
  </div>
</template>;

// React - 使用 children prop
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// 使用
<Card>
  <p>这是卡片内容</p>
</Card>;
```

---

## 进阶概念

### 自定义 Hooks

```jsx
// 创建可复用的逻辑
function useFormInput(initialValue = "") {
  const [value, setValue] = React.useState(initialValue);

  return {
    value,
    setValue,
    bind: {
      value,
      onChange: (e) => setValue(e.target.value),
    },
    reset: () => setValue(initialValue),
  };
}

// 使用
function LoginForm() {
  const username = useFormInput("");
  const password = useFormInput("");

  return (
    <>
      <input {...username.bind} />
      <input {...password.bind} type="password" />
    </>
  );
}
```

### 高阶组件（HOC）

```jsx
// 包装一个组件，增加额外功能
function withLoading(Component) {
  return function ({ isLoading, ...props }) {
    if (isLoading) return <div>加载中...</div>;
    return <Component {...props} />;
  };
}

// 使用
const UserListWithLoading = withLoading(UserList);
<UserListWithLoading isLoading={loading} />;
```

### 条件渲染的高级模式

```jsx
// 使用对象映射简化条件
const statusMessages = {
  loading: <div>⏳ 加载中...</div>,
  success: <div>✅ 成功</div>,
  error: <div>❌ 失败</div>,
};

return statusMessages[status];
```

---

## 关键差异总结

### Vue 的优势

- ✅ 学习曲线平缓
- ✅ template 语法自然直观
- ✅ 内置状态管理方案
- ✅ 单文件组件（SFC）更清晰

### React 的优势

- ✅ 更灵活的 JSX 语法（纯 JavaScript）
- ✅ 更大的生态和社区
- ✅ 性能优化工具更多
- ✅ TypeScript 支持更好
- ✅ 学习后更容易理解其他框架

### 核心区别

| 方面           | Vue                | React                 |
| -------------- | ------------------ | --------------------- |
| **编程范式**   | 声明式 + 命令式    | 纯声明式              |
| **状态变化**   | 双向绑定           | 单向数据流            |
| **更新方式**   | 自动追踪           | 需要 setState         |
| **组件复用**   | Mixins/Composables | Hooks                 |
| **样式作用域** | Scoped CSS         | CSS Modules/CSS-in-JS |

---

## 最佳实践

### 1. 始终使用 key

```jsx
// ✅ 好的做法
{
  items.map((item) => <Item key={item.id} data={item} />);
}

// ❌ 避免
{
  items.map((item, index) => <Item key={index} data={item} />);
}
```

### 2. 提取复杂逻辑到自定义 Hook

```jsx
// ✅ 好的做法
function useUserData(userId) {
  const [user, setUser] = React.useState(null);
  // 复杂逻辑...
  return user;
}

// 然后在组件中使用
function UserProfile({ userId }) {
  const user = useUserData(userId);
  return <div>{user.name}</div>;
}
```

### 3. 使用类型定义

```jsx
// ✅ 使用 TypeScript
interface Props {
  items: Item[];
  onSelect: (item: Item) => void;
}

function ItemList({ items, onSelect }: Props) {
  // ...
}
```

### 4. 避免在 render 中创建新对象

```jsx
// ❌ 不好 - 每次都创建新对象
<Component style={{ color: "red" }} />;

// ✅ 好的 - 提取到常量
const styles = { color: "red" };
<Component style={styles} />;
```

### 5. 正确使用依赖数组

```jsx
// ✅ 依赖声明清晰
React.useEffect(() => {
  fetchData(userId);
}, [userId]); // 当 userId 变化时重新运行

// ❌ 避免忘记声明依赖
React.useEffect(() => {
  fetchData(userId); // 这是一个依赖
}, []); // 结果：只在挂载时运行一次，不会重新获取数据
```

---

## 🎯 学习路线

### 第 1 天 - 基础概念

- [ ] JSX 语法
- [ ] useState 基础
- [ ] 条件渲染和列表渲染
- [ ] 表单处理

### 第 2 天 - Hooks 深入

- [ ] useEffect 和生命周期
- [ ] 依赖数组的理解
- [ ] useCallback 和 useMemo
- [ ] 自定义 Hook

### 第 3 天 - 组件化

- [ ] Props 和组件通信
- [ ] 组件拆分和复用
- [ ] 样式方案
- [ ] Context API

### 第 4 天 - 实战项目

- [ ] 制作一个 Todo 应用
- [ ] 添加功能：编辑、搜索、过滤
- [ ] 性能优化
- [ ] 部署到生产环境

---

## 📖 推荐资源

### 官方文档

- [React 官方文档](https://react.dev)
- [React Hooks 文档](https://react.dev/reference/react)
- [TypeScript + React](https://www.typescriptlang.org/docs/handbook/jsx.html)

### 在线学习

- freeCodeCamp React Tutorial
- Scrimba React Course
- YouTube React Tutorials

### 书籍

- "Learning React" by Alex Banks & Eve Porcello
- "React Patterns" - 在线免费资源

---

## 💡 常见陷阱

### 1. 闭包问题

```jsx
// ❌ 会出现闭包问题
function Counter() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setTimeout(() => {
      console.log(count); // 总是显示 0
    }, 3000);
  };
}

// ✅ 使用 ref 解决
function Counter() {
  const countRef = React.useRef(0);
  const [count, setCount] = React.useState(0);

  countRef.current = count;

  const handleClick = () => {
    setTimeout(() => {
      console.log(countRef.current); // 显示最新值
    }, 3000);
  };
}
```

### 2. 无限循环

```jsx
// ❌ 无限循环 - useEffect 没有依赖数组
React.useEffect(() => {
  setData(fetchedData); // 触发重新渲染 -> 触发 effect
});

// ✅ 添加依赖数组
React.useEffect(() => {
  setData(fetchedData);
}, []); // 只在挂载时运行
```

### 3. 直接修改状态

```jsx
// ❌ 不要直接修改状态
state.count = 5; // 不会触发重新渲染

// ✅ 使用 setState
setState({ count: 5 });
```

---

## 🎉 下一步

现在你已经学会了 React 的基础！建议：

1. **动手实践** - 修改示例代码，观察效果
2. **阅读官方文档** - 深入学习细节
3. **制作小项目** - Todo、天气应用、图片库等
4. **参考开源项目** - 学习最佳实践
5. **加入社区** - React 社区非常活跃

祝你学习愉快！🚀

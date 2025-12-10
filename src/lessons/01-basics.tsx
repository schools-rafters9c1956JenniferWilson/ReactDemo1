/**
 * 第一课：React 基础 - 对标 Vue 基础概念
 * 
 * Vue 你可能知道的：
 * - template 模板语法
 * - reactive() 响应式数据
 * - 组件返回一个对象 { data, methods, computed }
 * 
 * React 的方式：
 * - JSX 语法（JavaScript + XML）
 * - useState Hook 管理状态
 * - 组件是一个函数，直接返回 JSX
 */

import { useState } from 'react';

/**
 * 对标 Vue 的计数器组件
 * 
 * Vue 的写法（选项式）:
 * ```vue
 * <script>
 * export default {
 *   data() {
 *     return { count: 0 }
 *   },
 *   methods: {
 *     increment() {
 *       this.count++
 *     }
 *   }
 * }
 * </script>
 * <template>
 *   <div>
 *     <p>{{ count }}</p>
 *     <button @click="increment">Add 1</button>
 *   </div>
 * </template>
 * ```
 */
export function CounterBasic() {
  // 相当于 Vue 的 data() { return { count: 0 } }
  const [count, setCount] = useState(0);

  // 相当于 Vue 的 methods 中的函数
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  // 直接在 JSX 中返回模板（没有单独的 template 标签）
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>计数器 - 基础示例</h2>
      
      {/* 相当于 Vue 的 {{ count }} 模板插值 */}
      <p>当前计数: <strong>{count}</strong></p>

      {/* 相当于 Vue 的 @click="increment" 事件绑定 */}
      <button onClick={increment} style={{ marginRight: '10px' }}>
        + 增加
      </button>
      <button onClick={decrement}>
        - 减少
      </button>
    </div>
  );
}

/**
 * 对标 Vue 的表单双向绑定
 * 
 * Vue 的写法:
 * ```vue
 * <input v-model="message" />
 * <p>{{ message }}</p>
 * ```
 * 
 * React 中没有 v-model，需要手动绑定
 */
export function FormBinding() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
      <h2>表单绑定 - 对标 v-model</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label>消息: </label>
        {/* 
          React 的双向绑定需要：
          1. value={message} - 绑定值
          2. onChange={(e) => setMessage(e.target.value)} - 监听输入
          这相当于 Vue 的 v-model="message"
        */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="输入一些文字..."
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>邮箱: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="输入邮箱..."
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>

      <p>消息内容: {message}</p>
      <p>邮箱内容: {email}</p>
    </div>
  );
}

/**
 * 条件渲染对比
 * 
 * Vue: v-if, v-else, v-show
 * React: 使用 JavaScript 的条件语句
 */
export function ConditionalRendering() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
      <h2>条件渲染 - 对标 v-if / v-show</h2>

      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? '退出登录' : '登录'}
      </button>

      {/* 
        React 中的条件渲染使用 JavaScript 语法
        这相当于 Vue 的 v-if="isLoggedIn"
      */}
      {isLoggedIn && (
        <div style={{ marginTop: '10px', padding: '10px', background: '#e8f5e9' }}>
          <p>欢迎登录！用户信息已加载。</p>
        </div>
      )}

      {/* 等同于 Vue 的 v-else */}
      {!isLoggedIn && (
        <div style={{ marginTop: '10px', padding: '10px', background: '#ffebee' }}>
          <p>请登录后继续。</p>
        </div>
      )}

      <hr style={{ margin: '20px 0' }} />

      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? '隐藏' : '显示'}详情
      </button>

      {/* 
        React 中的 v-show 效果（隐藏但保留在 DOM 中）
        使用 CSS display 控制
      */}
      <div style={{ display: showDetails ? 'block' : 'none', marginTop: '10px' }}>
        <p>这是详情信息，会被隐藏但仍在 DOM 中。</p>
      </div>
    </div>
  );
}

/**
 * 列表渲染对比
 * 
 * Vue: v-for="item in list"
 * React: 使用 array.map()
 */
export function ListRendering() {
  const [items, setItems] = useState([
    { id: 1, text: '学习 React' },
    { id: 2, text: '理解 Hooks' },
    { id: 3, text: '建立复杂应用' },
  ]);

  const addItem = () => {
    const newItem = {
      id: Math.max(...items.map(i => i.id), 0) + 1,
      text: `新项目 ${new Date().toLocaleTimeString()}`,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
      <h2>列表渲染 - 对标 v-for</h2>

      <button onClick={addItem} style={{ marginBottom: '15px' }}>
        + 添加项目
      </button>

      {/* 
        React 中的列表渲染使用 map() 函数
        这相当于 Vue 的 v-for="item in items"
        
        重要：每个列表项需要一个唯一的 key prop
        React 使用 key 来识别哪些项目已更改、添加或删除
      */}
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: '8px' }}>
            <span>{item.text}</span>
            {' '}
            <button
              onClick={() => removeItem(item.id)}
              style={{ marginLeft: '10px' }}
            >
              删除
            </button>
          </li>
        ))}
      </ul>

      <p>共有 {items.length} 项</p>
    </div>
  );
}

/**
 * 主学习组件：包含所有基础示例
 */
export default function BasicLesson() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🚀 从 Vue 到 React：基础概念</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        如果你学过 Vue，这些示例会帮你快速理解 React 的核心概念
      </p>

      <CounterBasic />
      <FormBinding />
      <ConditionalRendering />
      <ListRendering />
    </div>
  );
}

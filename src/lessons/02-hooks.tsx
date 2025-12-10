/**
 * 第二课：React Hooks - 对标 Vue Composition API
 * 
 * Vue 2 (选项式API) vs Vue 3 (Composition API) vs React (Hooks)
 * 
 * 关键概念对应：
 * Vue Composition API: setup() 函数
 * React: Hooks (useXxx 系列函数)
 * 
 * 相似之处：
 * - 都用函数来管理组件逻辑
 * - 都有响应式系统
 * - 都支持自定义逻辑复用
 */

import { useState, useCallback, useEffect, useReducer } from 'react';

/**
 * useState - 状态管理的基础
 * 对标 Vue 的 ref() 和 reactive()
 */
export function UseStateDemo() {
  // 单个状态值
  const [name, setName] = useState('React');
  
  // 对象状态（类似 Vue 的 reactive()）
  const [user, setUser] = useState({ age: 25, city: '北京' });

  return (
    <div style={{ padding: '15px', border: '1px solid #2196F3', marginBottom: '20px' }}>
      <h3>useState - 状态管理</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="输入名字"
        />
        <p>你好，{name}！</p>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          年龄:
          <input
            type="number"
            value={user.age}
            onChange={(e) => setUser({ ...user, age: parseInt(e.target.value) })}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

      <div>
        <label>
          城市:
          <input
            value={user.city}
            onChange={(e) => setUser({ ...user, city: e.target.value })}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

      <p>用户信息: {name}, 年龄 {user.age}, 来自 {user.city}</p>
    </div>
  );
}

/**
 * useEffect - 对标 Vue 的 watch 和生命周期钩子
 * 
 * Vue:
 * watch(() => count, (newVal, oldVal) => { ... })
 * onMounted(() => { ... })
 * onUnmounted(() => { ... })
 * 
 * React:
 * useEffect(() => { ... }, [dependencies])
 */
export function UseEffectDemo() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [logHistory, setLogHistory] = useState<string[]>([]);

  // 相当于 Vue 的 onMounted + onUnmounted
  useEffect(() => {
    console.log('组件挂载了！');
    
    // 清理函数 - 相当于 onUnmounted
    return () => {
      console.log('组件将要卸载！');
    };
  }, []); // 空依赖数组 = 只在挂载/卸载时执行

  // 相当于 watch(count, () => { ... })
  useEffect(() => {
    setMessage(`count 已更新为: ${count}`);
    setLogHistory([...logHistory, `count 变化到 ${count}`]);
  }, [count]); // 当 count 改变时执行

  // 相当于 watch([], () => { ... }) - 任何依赖都会触发
  // useEffect(() => {
  //   console.log('任何状态改变都会执行');
  // }); // 没有依赖数组 = 每次渲染都执行

  return (
    <div style={{ padding: '15px', border: '1px solid #4CAF50', marginBottom: '20px' }}>
      <h3>useEffect - 副作用管理</h3>
      
      <button onClick={() => setCount(count + 1)}>
        计数: {count}
      </button>

      <p style={{ color: '#666' }}>{message}</p>

      <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', maxHeight: '150px', overflowY: 'auto' }}>
        <p>日志历史：</p>
        {logHistory.length === 0 ? (
          <p>点击按钮触发日志...</p>
        ) : (
          <ol>
            {logHistory.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

/**
 * useCallback - 记忆化函数
 * 对标 Vue 的解决方案：不创建新函数避免子组件重新渲染
 */
export function UseCallbackDemo() {
  const [count, setCount] = useState(0);

  // 使用 useCallback 的函数 - 依赖不变时保持引用相同
  const handleClickGood = useCallback(() => {
    setCount(c => c + 1); // 使用函数形式的 setState
  }, []); // 依赖为空，所以函数引用永远相同

  return (
    <div style={{ padding: '15px', border: '1px solid #FF9800', marginBottom: '20px' }}>
      <h3>useCallback - 函数记忆化</h3>
      
      <p>计数: {count}</p>
      <button onClick={handleClickGood}>
        使用 useCallback 的按钮
      </button>

      <p style={{ fontSize: '12px', color: '#999' }}>
        useCallback 的好处：当传递函数给子组件时，
        避免子组件的不必要重新渲染
      </p>
    </div>
  );
}

/**
 * useReducer - 复杂状态管理
 * 对标 Vue 的 Vuex/Pinia 简化版，也类似于 Redux
 */
interface TodoState {
  todos: Array<{ id: number; text: string; completed: boolean }>;
}

type TodoAction =
  | { type: 'ADD'; payload: string }
  | { type: 'TOGGLE'; payload: number }
  | { type: 'DELETE'; payload: number };

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Math.max(...state.todos.map(t => t.id), 0) + 1,
            text: action.payload,
            completed: false,
          },
        ],
      };
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload),
      };
    default:
      return state;
  }
}

export function UseReducerDemo() {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD', payload: input });
      setInput('');
    }
  };

  return (
    <div style={{ padding: '15px', border: '1px solid #9C27B0', marginBottom: '20px' }}>
      <h3>useReducer - 复杂状态管理</h3>

      <div style={{ marginBottom: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="输入待办事项..."
        />
        <button onClick={addTodo} style={{ marginLeft: '5px' }}>
          添加
        </button>
      </div>

      <ul>
        {state.todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: '5px' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
            />
            <span style={{ 
              marginLeft: '5px',
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
            <button
              onClick={() => dispatch({ type: 'DELETE', payload: todo.id })}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 主 Hooks 学习组件
 */
export default function HooksLesson() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🎣 React Hooks - 对标 Vue Composition API</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Hooks 是 React 中复用有状态逻辑的方式，类似于 Vue 3 的 Composition API
      </p>

      <UseStateDemo />
      <UseEffectDemo />
      <UseCallbackDemo />
      <UseReducerDemo />
    </div>
  );
}

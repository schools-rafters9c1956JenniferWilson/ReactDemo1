/**
 * 第三课：组件 & Props - 对标 Vue 的组件系统
 * 
 * Vue: 组件是对象 { template, script, style, props, emits }
 * React: 组件是函数，接受 props 作为参数
 * 
 * Props 的对应关系：
 * Vue props: { count: Number, onUpdate: Function }
 * React: function MyComponent({ count, onUpdate })
 */

import { useState } from 'react';

/**
 * 简单组件 - 显示卡片
 * 对标 Vue 的 props 定义
 */
interface CardProps {
  title: string;
  content: string;
  color?: 'blue' | 'green' | 'red';
}

function Card({ title, content, color = 'blue' }: CardProps) {
  const colors = {
    blue: '#E3F2FD',
    green: '#E8F5E9',
    red: '#FFEBEE',
  };

  return (
    <div style={{
      padding: '15px',
      borderLeft: `4px solid ${color === 'blue' ? '#2196F3' : color === 'green' ? '#4CAF50' : '#F44336'}`,
      background: colors[color],
      borderRadius: '4px',
      marginBottom: '10px',
    }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

/**
 * 按钮组件 - 演示事件绑定
 * 对标 Vue 的 @click 和 emit
 */
interface ButtonProps {
  children: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

function MyButton({ children, onClick, variant = 'primary', size = 'medium' }: ButtonProps) {
  const variantStyles = {
    primary: { background: '#2196F3', color: 'white' },
    secondary: { background: '#f0f0f0', color: 'black' },
  };

  const sizeStyles = {
    small: { padding: '4px 8px', fontSize: '12px' },
    medium: { padding: '8px 16px', fontSize: '14px' },
    large: { padding: '12px 24px', fontSize: '16px' },
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '5px',
      }}
    >
      {children}
    </button>
  );
}

/**
 * 输入框组件 - 演示双向绑定的组件化
 * 对标 Vue 的 v-model="value" 和 emit('update:modelValue')
 */
interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password';
}

function InputField({ label, value, onChange, type = 'text' }: InputFieldProps) {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

/**
 * 列表项组件 - 带删除按钮
 * 演示如何从父组件传递函数到子组件
 */
interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ id, text, completed, onToggle, onDelete }: TodoItemProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      background: '#f9f9f9',
      borderRadius: '4px',
      marginBottom: '8px',
    }}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        style={{ marginRight: '10px' }}
      />
      <span style={{
        flex: 1,
        textDecoration: completed ? 'line-through' : 'none',
        color: completed ? '#999' : 'black',
      }}>
        {text}
      </span>
      <button
        onClick={() => onDelete(id)}
        style={{
          background: '#ff6b6b',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        删除
      </button>
    </div>
  );
}

/**
 * 演示：组件组合
 * 使用上面定义的组件
 */
export function ComponentComposition() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 React 基础', completed: false },
    { id: 2, text: '理解组件系统', completed: true },
  ]);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addTodo = () => {
    if (username.trim()) {
      setTodos([...todos, {
        id: Math.max(...todos.map(t => t.id), 0) + 1,
        text: username,
        completed: false,
      }]);
      setUsername('');
    }
  };

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', marginBottom: '20px' }}>
      <h3>组件组合演示</h3>

      <Card
        title="💡 提示"
        content="这是一个可复用的卡片组件，通过 Props 传递内容"
        color="blue"
      />

      <Card
        title="✅ 成功"
        content="你可以通过改变 color prop 来改变卡片样式"
        color="green"
      />

      <div style={{ margin: '15px 0' }}>
        <InputField
          label="用户名"
          value={username}
          onChange={setUsername}
        />

        <InputField
          label="邮箱"
          value={email}
          onChange={setEmail}
          type="email"
        />

        <div>
          <MyButton
            variant="primary"
            size="medium"
            onClick={addTodo}
          >
            添加待办
          </MyButton>
          <MyButton
            variant="secondary"
            size="small"
            onClick={() => {
              setUsername('');
              setEmail('');
            }}
          >
            重置表单
          </MyButton>
        </div>
      </div>

      <div>
        <h4>待办事项列表 ({todos.length})</h4>
        {todos.length === 0 ? (
          <p style={{ color: '#999' }}>没有待办事项</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}

/**
 * 演示：Props 传递
 * 展示不同类型的 Props
 */
export function PropsPassing() {
  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', marginBottom: '20px' }}>
      <h3>Props 各种类型演示</h3>

      <Card title="字符串 Props" content="title 和 content 都是字符串类型" />

      <div style={{ marginTop: '15px' }}>
        <MyButton
          variant="primary"
          onClick={() => alert('点击了主要按钮')}
        >
          主要按钮
        </MyButton>

        <MyButton
          variant="secondary"
          size="large"
          onClick={() => alert('点击了辅助按钮')}
        >
          辅助按钮
        </MyButton>
      </div>

      <p style={{ fontSize: '12px', color: '#666', marginTop: '15px' }}>
        <strong>Props 的优势：</strong>
        <br />
        ✓ 组件可复用 - 同一个组件可以显示不同的内容
        <br />
        ✓ 易于测试 - Props 是纯输入，输出可预测
        <br />
        ✓ 易于维护 - 组件的依赖清晰明了
      </p>
    </div>
  );
}

/**
 * 主组件和 Props 学习组件
 */
export default function ComponentsLesson() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🧩 React 组件系统 - 对标 Vue 组件</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        在 React 中，组件就是函数，Props 就是函数参数。
        这比 Vue 的对象式声明更加简洁明了。
      </p>

      <PropsPassing />
      <ComponentComposition />
    </div>
  );
}

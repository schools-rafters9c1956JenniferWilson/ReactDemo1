/**
 * 第四课：进阶概念 - React 高级模式
 * 
 * 这一课介绍一些 React 特有的模式和优化技巧
 */

import { useState, useContext, createContext, useMemo } from 'react';
import type { ReactNode } from 'react';

/**
 * useContext - 跨组件传递数据
 * 对标 Vue 的 Provide/Inject
 */
interface User {
  name: string;
  role: 'admin' | 'user';
}

const UserContext = createContext<User | null>(null);

function UserProvider({ children }: { children: ReactNode }) {
  const [user] = useState<User>({ name: '张三', role: 'admin' });

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

function UserInfo() {
  const user = useContext(UserContext);
  console.log('user', user);

  if (!user) {
    return <p>未登录</p>;
  }

  return (
    <div style={{
      padding: '10px',
      background: '#e8f5e9',
      borderRadius: '4px',
    }}>
      <p>用户: {user.name}</p>
      <p>角色: {user.role}</p>
    </div>
  );
}

export function UseContextDemo() {
  return (
    <div style={{ padding: '15px', border: '1px solid #2196F3', marginBottom: '20px' }}>
      <h3>useContext - 跨组件通信</h3>
      <p style={{ fontSize: '12px', color: '#666' }}>
        对标 Vue 的 provide/inject，用于避免 Props 层层传递
      </p>

      <UserProvider>
        <UserInfo />
      </UserProvider>

      <p style={{ marginTop: '10px', fontSize: '12px' }}>
        使用场景：主题、语言、全局用户信息等
      </p>
    </div>
  );
}

/**
 * useMemo - 优化性能，缓存计算结果
 * 对标 Vue 的 computed
 */
export function UseMemoDemo() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [renderCount, setRenderCount] = useState(0);

  // 计算结果被缓存，只有当 count 或 multiplier 变化时才重新计算
  const result = useMemo(() => {
    console.log('计算中...');
    // 模拟复杂计算
    let sum = 0;
    for (let i = 0; i < 10000; i++) {
      sum += i;
    }
    return count * multiplier;
  }, [count, multiplier]);

  return (
    <div style={{ padding: '15px', border: '1px solid #FF9800', marginBottom: '20px' }}>
      <h3>useMemo - 性能优化</h3>

      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setCount(count + 1)}>
          Count: {count}
        </button>
        <button onClick={() => setMultiplier(multiplier + 1)} style={{ marginLeft: '10px' }}>
          Multiplier: {multiplier}
        </button>
        <button
          onClick={() => setRenderCount(renderCount + 1)}
          style={{ marginLeft: '10px' }}
        >
          Render: {renderCount}
        </button>
      </div>

      <p>
        <strong>计算结果: {result}</strong>
      </p>

      <p style={{ fontSize: '12px', color: '#666' }}>
        点击「Render」按钮，结果不会重新计算（性能优化）
        <br />
        点击「Count」或「Multiplier」，才会重新计算
      </p>
    </div>
  );
}

/**
 * 自定义 Hook - 逻辑复用
 * 对标 Vue 的 Composable (组合式函数)
 */
function useFormInput(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    bind: {
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    },
    reset: () => setValue(initialValue),
  };
}

export function CustomHookDemo() {
  const username = useFormInput('');
  const email = useFormInput('');

  const handleSubmit = () => {
    alert(`提交: ${username.value}, ${email.value}`);
  };

  const handleReset = () => {
    username.reset();
    email.reset();
  };

  return (
    <div style={{ padding: '15px', border: '1px solid #9C27B0', marginBottom: '20px' }}>
      <h3>自定义 Hook - 逻辑复用</h3>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>用户名</label>
        <input {...username.bind} placeholder="输入用户名" style={{ width: '100%', padding: '5px' }} />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>邮箱</label>
        <input {...email.bind} placeholder="输入邮箱" style={{ width: '100%', padding: '5px' }} />
      </div>

      <div>
        <button onClick={handleSubmit} style={{ marginRight: '10px' }}>
          提交
        </button>
        <button onClick={handleReset}>
          重置
        </button>
      </div>

      <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        自定义 Hook 使逻辑可以在组件间复用，类似 Vue 的 Composable
      </p>
    </div>
  );
}

/**
 * 条件渲染的高级用法
 */
export function ConditionalRenderingAdvanced() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  console.log('🔄 ConditionalRenderingAdvanced 重新渲染了，status =', status);

  // 使用对象映射实现条件渲染
  const renderContent = {
    loading: <div>⏳ 加载中...</div>,
    success: <div style={{ color: 'green' }}>✅ 加载成功！</div>,
    error: <div style={{ color: 'red' }}>❌ 加载失败</div>,
  };

  console.log('📦 renderContent[status] =', renderContent[status]);

  return (
    <div style={{ padding: '15px', border: '1px solid #F44336', marginBottom: '20px' }}>
      <h3>条件渲染 - 高级模式</h3>

      <div style={{ marginBottom: '10px' }}>
        <button
          onClick={() => setStatus('loading')}
          style={{ marginRight: '5px' }}
        >
          加载中
        </button>
        <button
          onClick={() => setStatus('success')}
          style={{ marginRight: '5px' }}
        >
          成功
        </button>
        <button onClick={() => setStatus('error')}>
          失败
        </button>
      </div>

      <div style={{ padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        {renderContent[status]}
      </div>

      <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        使用对象映射替代长的 if/else 或嵌套三元运算符
      </p>
    </div>
  );
}

/**
 * React vs Vue 关键差异总结
 */
export function VueVsReactComparison() {
  return (
    <div style={{ padding: '15px', background: '#fff3e0', borderRadius: '4px', marginBottom: '20px' }}>
      <h3>🔑 Vue vs React 关键差异</h3>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '13px',
      }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>特性</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Vue</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>React</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>语法</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>template + script</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>JSX (HTML in JS)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>数据绑定</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>v-model 双向绑定</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>手动双向绑定</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>条件渲染</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>v-if / v-show</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>JavaScript 逻辑</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>列表渲染</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>v-for</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>array.map()</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>响应式</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>ref() / reactive()</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>useState Hook</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>计算属性</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>computed()</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>useMemo()</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>生命周期</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>onMounted 等</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>useEffect</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>全局状态</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>provide/inject</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>useContext</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/**
 * 主进阶学习组件
 */
export default function AdvancedLesson() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🚀 React 进阶概念</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        学完基础后，让我们深入了解 React 的更多高级特性
      </p>

      <VueVsReactComparison />
      <UseContextDemo />
      <UseMemoDemo />
      <CustomHookDemo />
      <ConditionalRenderingAdvanced />
    </div>
  );
}

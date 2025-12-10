/**
 * 快速参考 - Vue 到 React 速查表
 * 这个组件提供最常用的代码片段对比
 */

export default function QuickReference() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', fontSize: '13px' }}>
      <h1>🎯 Vue 到 React 快速参考</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '20px' }}>
        {/* 基础对比 */}
        <section style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
          <h3>🏗️ 组件结构</h3>
          
          <h4>Vue</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ count }}</p>
    <button @click="increment">
      增加
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return { 
      title: 'Hello',
      count: 0 
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>`}
          </pre>

          <h4>React</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  const title = 'Hello'
  
  const increment = () => {
    setCount(count + 1)
  }
  
  return (
    <div>
      <h1>{title}</h1>
      <p>{count}</p>
      <button onClick={increment}>
        增加
      </button>
    </div>
  )
}

export default Counter`}
          </pre>
        </section>

        {/* Props 对比 */}
        <section style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
          <h3>📦 Props 传递</h3>
          
          <h4>Vue</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`<!-- 父组件 -->
<Child :user="user" @update="handleUpdate" />

<!-- 子组件 -->
<template>
  <div>{{ user.name }}</div>
</template>

<script>
export default {
  props: {
    user: Object
  },
  emits: ['update'],
  methods: {
    handleClick() {
      this.$emit('update', value)
    }
  }
}
</script>`}
          </pre>

          <h4>React</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`// 父组件
<Child user={user} onUpdate={handleUpdate} />

// 子组件
interface ChildProps {
  user: { name: string }
  onUpdate: (value: any) => void
}

function Child({ user, onUpdate }: ChildProps) {
  return (
    <div>
      {user.name}
      <button onClick={() => onUpdate(value)}>
        更新
      </button>
    </div>
  )
}

export default Child`}
          </pre>
        </section>

        {/* 状态管理对比 */}
        <section style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
          <h3>🎯 状态管理</h3>
          
          <h4>Vue - reactive()</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`import { reactive } from 'vue'

const state = reactive({
  user: { name: '' },
  count: 0,
  items: []
})

state.user.name = 'Alice'
state.count++
state.items.push(item)`}
          </pre>

          <h4>React - useState()</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`import { useState } from 'react'

const [user, setUser] = useState({ name: '' })
const [count, setCount] = useState(0)
const [items, setItems] = useState([])

setUser({ ...user, name: 'Alice' })
setCount(count + 1)
setItems([...items, item])`}
          </pre>
        </section>

        {/* 生命周期对比 */}
        <section style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
          <h3>🔄 生命周期 / 副作用</h3>
          
          <h4>Vue</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`import { onMounted, onUnmounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('挂载')
    })
    
    onUnmounted(() => {
      console.log('卸载')
    })
  }
}`}
          </pre>

          <h4>React</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`import { useEffect } from 'react'

function MyComponent() {
  useEffect(() => {
    console.log('挂载')
    
    return () => {
      console.log('卸载')
    }
  }, [])
}`}
          </pre>
        </section>

        {/* 监听 / 依赖对比 */}
        <section style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
          <h3>👀 监听变化</h3>
          
          <h4>Vue - watch()</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`import { watch } from 'vue'

watch(
  () => count.value,
  (newVal, oldVal) => {
    console.log(newVal, oldVal)
  }
)

// 监听多个源
watch([count, message], ([c, m]) => {
  console.log(c, m)
})`}
          </pre>

          <h4>React - useEffect()</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`import { useEffect } from 'react'

useEffect(() => {
  console.log('count 变化了')
}, [count])

// 监听多个依赖
useEffect(() => {
  console.log(count, message)
}, [count, message])`}
          </pre>
        </section>

        {/* 条件渲染 */}
        <section style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
          <h3>🔀 条件渲染</h3>
          
          <h4>Vue</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`<!-- v-if: 真正移除/添加 -->
<div v-if="show">显示</div>
<div v-else>隐藏</div>

<!-- v-show: 用 CSS 隐藏 -->
<div v-show="show">显示</div>`}
          </pre>

          <h4>React</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`{/* if/else 效果 */}
{show ? <div>显示</div> : <div>隐藏</div>}
{show && <div>显示</div>}

{/* v-show 效果 */}
<div style={{ display: show ? 'block' : 'none' }}>
  显示
</div>`}
          </pre>
        </section>

        {/* 列表渲染 */}
        <section style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
          <h3>📋 列表渲染</h3>
          
          <h4>Vue</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`<ul>
  <li 
    v-for="item in items" 
    :key="item.id"
  >
    {{ item.name }}
  </li>
</ul>

<div 
  v-for="(value, key) in object" 
  :key="key"
>
  {{ key }}: {{ value }}
</div>`}
          </pre>

          <h4>React</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`<ul>
  {items.map(item => (
    <li key={item.id}>
      {item.name}
    </li>
  ))}
</ul>

{Object.entries(object).map(([key, value]) => (
  <div key={key}>
    {key}: {value}
  </div>
))}​`}
          </pre>
        </section>

        {/* 表单绑定 */}
        <section style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
          <h3>📝 表单绑定</h3>
          
          <h4>Vue - v-model</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`<input v-model="message" />
<textarea v-model="message"></textarea>

<input type="checkbox" v-model="checked" />
<input type="radio" v-model="selected" />

<select v-model="selected">
  <option>A</option>
  <option>B</option>
</select>`}
          </pre>

          <h4>React</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`<input
  value={message}
  onChange={e => setMessage(e.target.value)}
/>
<textarea
  value={message}
  onChange={e => setMessage(e.target.value)}
/>

<input
  type="checkbox"
  checked={checked}
  onChange={e => setChecked(e.target.checked)}
/>
<input
  type="radio"
  checked={selected === 'A'}
  onChange={() => setSelected('A')}
/>

<select
  value={selected}
  onChange={e => setSelected(e.target.value)}
>
  <option>A</option>
  <option>B</option>
</select>`}
          </pre>
        </section>

        {/* 计算属性 */}
        <section style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
          <h3>🧮 计算属性 / Memo</h3>
          
          <h4>Vue - computed()</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`import { computed } from 'vue'

const fullName = computed(() => {
  return firstName + ' ' + lastName
})

// 带 setter
const fullName = computed({
  get: () => firstName + ' ' + lastName,
  set: (v) => {
    [firstName, lastName] = v.split(' ')
  }
})`}
          </pre>

          <h4>React - useMemo()</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`import { useMemo } from 'react'

const fullName = useMemo(() => {
  return firstName + ' ' + lastName
}, [firstName, lastName])`}
          </pre>
        </section>

        {/* 事件处理 */}
        <section style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
          <h3>🎯 事件处理</h3>
          
          <h4>Vue</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`<!-- 基本事件 -->
<button @click="handleClick">点击</button>

<!-- 事件修饰符 -->
<button @click.stop="handle">阻止冒泡</button>
<button @click.prevent="handle">阻止默认</button>
<input @keyup.enter="handle" />

<!-- 传参 -->
<button @click="handle(item)">点击</button>`}
          </pre>

          <h4>React</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`{/* 基本事件 */}
<button onClick={handleClick}>点击</button>

{/* 事件修饰符 */}
<button onClick={e => {
  e.stopPropagation()
  handle()
}}>阻止冒泡</button>

<input onKeyUp={e => {
  if (e.key === 'Enter') handle()
}} />

{/* 传参 */}
<button onClick={() => handle(item)}>
  点击
</button>`}
          </pre>
        </section>

        {/* 全局状态 */}
        <section style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
          <h3>🌍 全局状态</h3>
          
          <h4>Vue - provide/inject</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`// 父组件
import { provide } from 'vue'

provide('user', { name: 'Alice' })

// 子组件
import { inject } from 'vue'

const user = inject('user')`}
          </pre>

          <h4>React - useContext</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`// 创建 Context
const UserContext = createContext()

// 父组件
<UserContext.Provider value={{ name: 'Alice' }}>
  <Child />
</UserContext.Provider>

// 子组件
const user = useContext(UserContext)`}
          </pre>
        </section>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: '#f0f7ff', borderRadius: '8px' }}>
        <h2>💡 学习建议</h2>
        <ul style={{ fontSize: '14px', lineHeight: '1.8' }}>
          <li>
            <strong>模式转变：</strong>
            Vue 强调模板优先，React 强调 JavaScript 优先。
            理解这一点，其他的就迎刃而解了。
          </li>
          <li>
            <strong>数据流：</strong>
            Vue 是双向绑定，React 是单向数据流。
            单向数据流更容易追踪，但需要更多手动代码。
          </li>
          <li>
            <strong>灵活性：</strong>
            React 的 JSX 更灵活，可以用所有 JavaScript 特性。
            Vue 的 template 更严格，但更易于优化。
          </li>
          <li>
            <strong>学习路线：</strong>
            不要急着学习所有 Hooks 和高级特性。
            先掌握基础的 useState 和 useEffect，后续会事半功倍。
          </li>
        </ul>
      </div>
    </div>
  )
}

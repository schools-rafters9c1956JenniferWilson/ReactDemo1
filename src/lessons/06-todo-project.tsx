/**
 * 实战项目：Todo 应用
 * 综合运用所有学过的 React 知识
 */

import { useState, useCallback, useMemo } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface Statistics {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}

/**
 * 自定义 Hook - 管理 Todo 逻辑
 */
function useTodoManager(initialTodos: Todo[] = []) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // 筛选后的 todos
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // 统计信息
  const statistics = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    return {
      total,
      completed,
      pending: total - completed,
      completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  }, [todos]);

  // 添加 todo
  const addTodo = useCallback((text: string) => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Math.max(...todos.map(t => t.id), 0) + 1,
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  }, [todos]);

  // 删除 todo
  const removeTodo = useCallback((id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  }, [todos]);

  // 切换 todo 完成状态
  const toggleTodo = useCallback((id: number) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }, [todos]);

  // 编辑 todo 文本
  const editTodo = useCallback((id: number, text: string) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, text: text.trim() } : t
    ));
  }, [todos]);

  // 清空所有已完成的
  const clearCompleted = useCallback(() => {
    setTodos(todos.filter(t => !t.completed));
  }, [todos]);

  // 清空所有
  const clearAll = useCallback(() => {
    setTodos([]);
  }, []);

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    statistics,
    addTodo,
    removeTodo,
    toggleTodo,
    editTodo,
    clearCompleted,
    clearAll,
  };
}

/**
 * 输入框组件
 */
function TodoInput({ onAdd }: { onAdd: (text: string) => void }) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    onAdd(input);
    setInput('');
  };

  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
    }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="添加新的待办事项..."
        style={{
          flex: 1,
          padding: '12px',
          fontSize: '14px',
          border: '1px solid #ddd',
          borderRadius: '4px',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: '12px 20px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        添加
      </button>
    </div>
  );
}

/**
 * 统计面板
 */
function StatisticPanel({ stats }: { stats: Statistics }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '12px',
      marginBottom: '20px',
    }}>
      <div style={{
        padding: '15px',
        background: '#E3F2FD',
        borderRadius: '4px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '12px', color: '#666' }}>总计</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}>
          {stats.total}
        </div>
      </div>

      <div style={{
        padding: '15px',
        background: '#E8F5E9',
        borderRadius: '4px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '12px', color: '#666' }}>已完成</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>
          {stats.completed}
        </div>
      </div>

      <div style={{
        padding: '15px',
        background: '#FFF3E0',
        borderRadius: '4px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '12px', color: '#666' }}>待办</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800' }}>
          {stats.pending}
        </div>
      </div>

      <div style={{
        padding: '15px',
        background: '#F3E5F5',
        borderRadius: '4px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '12px', color: '#666' }}>完成率</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9C27B0' }}>
          {stats.completionRate}%
        </div>
      </div>
    </div>
  );
}

/**
 * 单个 Todo 项
 */
function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  const timeString = todo.createdAt.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      background: todo.completed ? '#f5f5f5' : 'white',
      border: '1px solid #eee',
      borderRadius: '4px',
      marginBottom: '8px',
      gap: '10px',
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
      />

      {isEditing ? (
        <div style={{ flex: 1, display: 'flex', gap: '5px' }}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{
              flex: 1,
              padding: '6px',
              border: '1px solid #2196F3',
              borderRadius: '4px',
            }}
          />
          <button
            onClick={handleSave}
            style={{
              padding: '6px 12px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            保存
          </button>
        </div>
      ) : (
        <>
          <div style={{ flex: 1 }}>
            <div style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#999' : 'black',
              marginBottom: '4px',
            }}>
              {todo.text}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#999',
            }}>
              {timeString}
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: '6px 12px',
              background: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            编辑
          </button>
        </>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        style={{
          padding: '6px 12px',
          background: '#F44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
        }}
      >
        删除
      </button>
    </div>
  );
}

/**
 * 筛选按钮组
 */
function FilterButtons({
  currentFilter,
  onFilterChange,
}: {
  currentFilter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}) {
  const filters = [
    { id: 'all', label: '全部' },
    { id: 'active', label: '进行中' },
    { id: 'completed', label: '已完成' },
  ] as const;

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
      {filters.map(f => (
        <button
          key={f.id}
          onClick={() => onFilterChange(f.id)}
          style={{
            padding: '8px 16px',
            background: currentFilter === f.id ? '#2196F3' : '#f0f0f0',
            color: currentFilter === f.id ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

/**
 * 主 Todo 应用
 */
export default function TodoApp() {
  const {
    filteredTodos,
    filter,
    setFilter,
    statistics,
    addTodo,
    removeTodo,
    toggleTodo,
    editTodo,
    clearCompleted,
    clearAll,
  } = useTodoManager([
    {
      id: 1,
      text: '学习 React 基础',
      completed: true,
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      id: 2,
      text: '学习 Hooks',
      completed: true,
      createdAt: new Date(Date.now() - 43200000),
    },
    {
      id: 3,
      text: '制作 Todo 应用',
      completed: false,
      createdAt: new Date(),
    },
  ]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>✅ React Todo 应用</h1>
      <p style={{ color: '#666' }}>
        这是一个综合练习，运用了所有学过的 React 知识：
        useState、useCallback、useMemo、自定义 Hook、组件化等
      </p>

      <TodoInput onAdd={addTodo} />
      <StatisticPanel stats={statistics} />
      <FilterButtons currentFilter={filter} onFilterChange={setFilter} />

      {filteredTodos.length === 0 ? (
        <div style={{
          padding: '30px',
          textAlign: 'center',
          color: '#999',
          background: '#f9f9f9',
          borderRadius: '4px',
        }}>
          {filter === 'all' && '还没有待办事项，添加一个吧！'}
          {filter === 'active' && '没有进行中的事项'}
          {filter === 'completed' && '还没有完成任何事项'}
        </div>
      ) : (
        <>
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={removeTodo}
              onEdit={editTodo}
            />
          ))}
        </>
      )}

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button
          onClick={clearCompleted}
          style={{
            flex: 1,
            padding: '12px',
            background: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          清除已完成 ({statistics.completed})
        </button>
        <button
          onClick={clearAll}
          style={{
            flex: 1,
            padding: '12px',
            background: '#F44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          清除全部
        </button>
      </div>

      <div style={{
        marginTop: '30px',
        padding: '15px',
        background: '#f0f7ff',
        borderRadius: '4px',
        fontSize: '13px',
      }}>
        <strong>💡 在这个项目中你可以学到：</strong>
        <ul style={{ margin: '10px 0 0 20px' }}>
          <li>useState - 管理多个相关的状态</li>
          <li>useCallback - 优化函数引用</li>
          <li>useMemo - 缓存计算结果和筛选结果</li>
          <li>自定义 Hook - 提取可复用的逻辑</li>
          <li>组件化思想 - 拆分成多个小组件</li>
          <li>状态提升 - 将状态集中在父组件</li>
          <li>事件处理和数据绑定</li>
          <li>条件渲染和列表渲染</li>
        </ul>
      </div>
    </div>
  );
}

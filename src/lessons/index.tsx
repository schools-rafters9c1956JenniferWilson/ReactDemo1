/**
 * 学习导航 - 主导航页面
 */
// 第二次提交
// 创建了新分支
import { useState } from 'react';
import BasicLesson from './01-basics';
import HooksLesson from './02-hooks';
import ComponentsLesson from './03-components';
import AdvancedLesson from './04-advanced';
import QuickReference from './05-quick-reference';
import TodoProject from './06-todo-project';
import ZentUseTry from './07-zentuseTry';

type LessonType = 'basics' | 'hooks' | 'components' | 'advanced' | 'quick-reference' | 'project' | 'zent-use-try';

const lessons = [
  {
    id: 'basics',
    title: '🎯 第一课：基础概念',
    description: '从 Vue 到 React 的基础迁移。学习 JSX、状态管理、条件渲染、列表渲染等核心概念。',
    icon: '📚',
  },
  {
    id: 'hooks',
    title: '🎣 第二课：Hooks 深入',
    description: '掌握 React Hooks，等同于 Vue 的 Composition API。包括 useState、useEffect、useCallback、useReducer 等。',
    icon: '🪝',
  },
  {
    id: 'components',
    title: '🧩 第三课：组件系统',
    description: '学习组件化思想，Props 传递，事件处理。建立可复用的组件库。',
    icon: '🎨',
  },
  {
    id: 'advanced',
    title: '🚀 第四课：进阶概念',
    description: '深入 Context、性能优化、自定义 Hook。以及 Vue 和 React 的完整对比。',
    icon: '⚡',
  },
  {
    id: 'quick-reference',
    title: '🎯 快速参考',
    description: 'Vue 和 React 代码对比速查表。快速查找对应的实现方式。',
    icon: '📖',
  },
  {
    id: 'project',
    title: '🏗️ 实战项目：Todo',
    description: '综合运用所有学过的知识，制作一个完整的 Todo 应用。',
    icon: '✅',
  },
  {
    id: 'zent-use-try',
    title: '📺 Zent 组件库尝试',
    description: '尝试使用 Zent 组件库，学习其用法和特点。',
    icon: '🧩',
  }
];

function LessonCard({
  title,
  description,
  isActive,
  onClick,
}: {
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '20px',
        border: isActive ? '2px solid #2196F3' : '1px solid #ddd',
        borderRadius: '8px',
        background: isActive ? '#E3F2FD' : 'white',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginBottom: '12px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>{description}</p>
    </div>
  );
}

export default function LearningHub() {
  const [currentLesson, setCurrentLesson] = useState<LessonType>('zent-use-try');

  const renderLesson = () => {
    switch (currentLesson) {
      case 'basics':
        return <BasicLesson />;
      case 'hooks':
        return <HooksLesson />;
      case 'components':
        return <ComponentsLesson />;
      case 'advanced':
        return <AdvancedLesson />;
      case 'quick-reference':
        return <QuickReference />;
      case 'project':
        return <TodoProject />;
      case 'zent-use-try':
        return <ZentUseTry />;
      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* 顶部标题 */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center',
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '32px' }}>
          🚀 Vue 开发者的 React 学习之旅
        </h1>
        <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>
          循序渐进，从 Vue 基础到 React 进阶
        </p>
      </div>

      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto' }}>
        {/* 左侧导航 */}
        <div style={{
          width: '320px',
          background: 'white',
          borderRight: '1px solid #eee',
          padding: '20px',
          position: 'sticky',
          top: 0,
          // minHeight: 'calc(100vh - 150px)',
          // overflowY: 'auto',
          flexShrink: 0,
        }}>
          <h3 style={{ marginTop: 0 }}>课程列表</h3>

          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              title={`${lesson.icon} ${lesson.title}`}
              description={lesson.description}
              isActive={currentLesson === lesson.id}
              onClick={() => setCurrentLesson(lesson.id as LessonType)}
            />
          ))}

          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '4px',
            padding: '12px',
            marginTop: '20px',
            fontSize: '12px',
          }}>
            <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>💡 学习建议:</p>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>按顺序学习每一课</li>
              <li>运行示例代码进行实验</li>
              <li>修改代码观察效果</li>
              <li>对比 Vue 和 React 的差异</li>
            </ul>
          </div>
        </div>

        {/* 右侧内容容器 */}
        <div style={{
          width: 'calc(100% - 320px)',
          padding: '40px',
          background: 'white',
          overflowY: 'auto',

          // height: '100%',
          height: 'calc(130vh)',

        }}>
          <div className='hide-scrollbar' style={{
            flex: 1,
            // height: 'calc(100vh - 150px)',
            height: '100%',
            width: '100%',
            overflowX: 'hidden',
          }}>
            {renderLesson()}
          </div>
        </div>

      </div>

      {/* 页脚 */}
      <div style={{
        background: '#f5f5f5',
        padding: '20px',
        textAlign: 'center',
        color: '#666',
        fontSize: '12px',
        marginTop: '20px',
      }}>
        <p>
          📖 官方资源：
          <a href="https://react.dev" target="_blank" rel="noreferrer" style={{ color: '#2196F3' }}>
            React 文档
          </a>
          {' '} | {' '}
          <a href="https://vuejs.org" target="_blank" rel="noreferrer" style={{ color: '#2196F3' }}>
            Vue 文档
          </a>
          {' '} | {' '}
          <a href="https://vite.dev" target="_blank" rel="noreferrer" style={{ color: '#2196F3' }}>
            Vite 文档
          </a>
        </p>
        <p>祝你的 React 学习之旅顺利！🎉</p>
      </div>
    </div>
  );
}

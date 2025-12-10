// import { Button } from 'zent';
import Button from 'zent/es/button';
import {
  Avatar, Badge, Icon, Link,
  Radio as ZentRadio, Switch, Menu,
  SplitButton, Notify
} from 'zent';
import { useState } from 'react';
// import Button from 'zent/es/button';
// 按需引入样式 - 只引入用到的组件样式
import 'zent/css/button.css';
import 'zent/css/avatar.css';
import 'zent/css/icon.css';
import 'zent/css/badge.css';
import 'zent/css/link.css';
import 'zent/css/radio.css';
import 'zent/css/switch.css';
import 'zent/css/menu.css';
import 'zent/css/split-button.css';
import 'zent/css/notify.css';
// 引入样式
// import 'zent/css/index.css';

const RadioGroup = ZentRadio.Group;

type RadioValue = 'male' | 'female';

export function Radio() {
  const [value, setValue] = useState<RadioValue>('male');

  const onChange = (e: any) => {
    const newValue = e.target.value as RadioValue;
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Radio 单选框示例</h3>
      <p>当前选择：{value === 'male' ? '男' : '女'}</p>
      <RadioGroup onChange={onChange} value={value}>
        <ZentRadio value="male">男</ZentRadio>
        <ZentRadio value="female">女</ZentRadio>
      </RadioGroup>
    </div>
  );
}

export function SwitchDemo() {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChangeLarge = (checked: boolean): void => {
    setChecked(checked);
    console.log(checked);
  };

  return (
    <div>
      <Switch
        checked={checked}
        onChange={handleChangeLarge}
      />
    </div>
  );
}

export function MenuDemo() {
  const [selectedKey, setSelectedKey] = useState<string>('');
  const { MenuItem, SubMenu } = Menu;

  const MenuMap: Record<string, string> = {
    '1-1': '食品分类',
    '1-2': '服装分类',
    '2-1': '电视机',
    '2-2': '笔记本',
    '2-3': '洗衣机',
    '3-1': '眼影',
    '3-2': '洗面奶',
  };

  const onClick = (_e: any, key: string): void => {
    console.log('Selected key:', key);
    setSelectedKey(key);
  };

  const onSubMenuClick = (id: string | number | undefined): void => {
    console.log('SubMenu clicked:', id);
  };

  return (
    <div>
      <Menu
        onClick={onClick}
        onSubMenuClick={onSubMenuClick}
        className="hello"
      >
        <MenuItem key="1-1" className="food">食品分类</MenuItem>
        <MenuItem key="1-2" disabled>服装分类</MenuItem>
        <SubMenu title={"电器分类"} overlayClassName="sub">
          <MenuItem key="2-1" className="tv">电视机</MenuItem>
          <MenuItem key="2-2" disabled>笔记本</MenuItem>
          <MenuItem key="2-3">洗衣机</MenuItem>
        </SubMenu>
        <SubMenu title={"美妆分类"} >
          <MenuItem key="3-1">眼影</MenuItem>
          <MenuItem key="3-2">洗面奶</MenuItem>
        </SubMenu>
      </Menu>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <span>{`当前选择的节点为: ${MenuMap[selectedKey] || '未选择'}`}</span>
      </div>
    </div>
  );
}

interface ColorOption {
  value: number;
  text: 'red' | 'blue' | 'green';
}

export function GroupButton() {
  const list: ColorOption[] = [
    {
      value: 1,
      text: 'red'
    },
    {
      value: 2,
      text: 'blue'
    },
    {
      value: 3,
      text: 'green'
    }
  ];

  const handleSelect = (key: string): void => {
    Notify.success(key);
  };

  const handleClick = (): void => {
    Notify.success('请选择你需要的配置');
  };

  return (
    <div>
      <SplitButton
        type="primary"
        dropdownData={list}
        onClick={handleClick}
        onSelect={handleSelect}
      >
        主按钮
      </SplitButton>
      <SplitButton
        dropdownData={list}
        onClick={handleClick}
        onSelect={handleSelect}
      >
        次按钮
      </SplitButton>
      <SplitButton
        type="text"
        dropdownData={list}
        onClick={handleClick}
        onSelect={handleSelect}
      >
        文字按钮
      </SplitButton>
      <SplitButton
        type="text"
        dropdownData={list}
        dropdownIcon={'more'}
        onClick={handleClick}
        onSelect={handleSelect}
      >
      </SplitButton>
    </div>
  );
} export default function ZentUseTry(): JSX.Element {
  return (
    <div>
      <div>
        <Button type="primary">主按钮</Button>
        <Button type="primary" outline>主按钮</Button>
        <Button>次按钮</Button>
        <Button type="text">文字按钮</Button>
        <Button type='icon' icon='search'></Button>
      </div>
      <div className="zent-avatar-list" style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <Avatar size="large" >Y</Avatar>
        <Avatar size="large" icon="customer" />
        <Avatar
          size="large"
          src="https://img.yzcdn.cn/public_files/2018/02/01/5df3bb4b640ddc5efae915b7af90a243.png"
        />
        <Avatar size="large" shape="square">Y</Avatar>
        <Avatar size="large" shape="square" icon="customer" />
        <Avatar
          size="large"
          shape="square"
          src="https://img.yzcdn.cn/public_files/2018/02/01/5df3bb4b640ddc5efae915b7af90a243.png"
        />
      </div>
      <div className="zent-badge-demo-wrapper">
        <span>店铺消息</span>
        <Badge count={100} />
      </div>
      <div>
        <Badge count={120} maxCount={10} offset={[-27, 0]}>
          <div className="demo-cont">
            <Icon type="bell-o" style={{ fontSize: '20px' }} />
          </div>
        </Badge>
      </div>
      <div>
        <Link href="https://youzan.com" target="_blank">有赞首页</Link>
        <Link href="https://youzan.com" disabled>
          有赞首页
        </Link>
      </div>
      <Radio />
      <SwitchDemo />
      <MenuDemo />
      <GroupButton />
    </div>
  );
}
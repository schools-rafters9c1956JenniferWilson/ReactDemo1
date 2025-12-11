// import { Button } from 'zent';
import Button from 'zent/es/button';
import {
  Avatar, Badge, Icon, Link,
  Radio as ZentRadio, Switch, Menu,
  SplitButton, Notify, Breadcrumb,
  Dropdown,
  DropdownButton,
  DropdownClickTrigger,
  DropdownContent,
  DropdownPosition,
  DropdownNav, Pagination, MiniPagination, LitePagination,
  Steps, AutoComplete,
  Transfer,
  MenuCascader
} from 'zent';
import { clone, insertPath } from 'zent/es/cascader/public-options-fns';
import type { IPublicCascaderItem, ICascaderItem, CascaderValue, ICascaderMultipleChangeMeta } from 'zent/es/cascader/types';
import { useState } from 'react';
// import Button from 'zent/es/button';
// 按需引入样式 - 只引入用到的组件样式
// import 'zent/css/button.css';
// import 'zent/css/avatar.css';
// import 'zent/css/icon.css';
// import 'zent/css/badge.css';
// import 'zent/css/link.css';
// import 'zent/css/radio.css';
// import 'zent/css/switch.css';
// import 'zent/css/loading.css';
// import 'zent/css/menu.css';
// import 'zent/css/split-button.css';
// import 'zent/css/notify.css';
// import 'zent/css/breadcrumb.css';
// import 'zent/css/dropdown-nav.css';
// import 'zent/css/pagination.css';
// 引入样式
import 'zent/css/index.css';

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
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeLarge = (checked: boolean): void => {
    setLoading(true);
    // 模拟异步操作
    setTimeout(() => {
      setChecked(checked);
      setLoading(false);
      console.log(checked);
    }, 1500);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Switch 开关示例（Loading状态）</h3>
      <div style={{ marginBottom: '16px' }}>
        <Switch
          checked={checked}
          onChange={handleChangeLarge}
          loading={loading}
          disabled={loading}
        />
        &nbsp;&nbsp;
        <Switch
          loading
          disabled
        />
        &nbsp;&nbsp;
        <Switch
          checked
          size="small"
          loading
          disabled
        />
        &nbsp;&nbsp;
        <Switch
          size="small"
          loading
          disabled
        />
      </div>
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



export function GroupButton() {
  interface ColorOption {
    value: number;
    text: 'red' | 'blue' | 'green' | 'pink';
  }
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
    },
    {
      value: 4,
      text: 'pink'
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
}
export function BreadcrumbDemo() {
  interface TitleOption {
    name: string;
    href?: string;
  }
  const dataList: TitleOption[] = [
    { name: '首页', href: '//www.youzan.com' },
    { name: '应用中心', href: '//www.youzan.com' },
    { name: '营销中心', href: '//www.youzan.com' },
    { name: '营销玩法' },
  ];
  return (
    <Breadcrumb breads={dataList} maxItemCount={3} />
  )
}
export function DropdownDemo() {
  const { MenuItem } = Menu;
  const [visible, setVisible] = useState(false);
  return (
    <Dropdown
      visible={visible}
      onVisibleChange={v => setVisible(v)}
      position={DropdownPosition.AutoBottomLeft}
    >

      <DropdownClickTrigger closeOnClickOutside={false}>
        <DropdownButton type="primary">点击打开菜单</DropdownButton>
      </DropdownClickTrigger>
      <DropdownContent>
        <Menu onClick={() => setVisible(false)}>
          <MenuItem>点击关闭菜单</MenuItem>
          <MenuItem>点击关闭菜单</MenuItem>
        </Menu>
      </DropdownContent>
    </Dropdown>
  )
}
export function DropdownNavDemo() {
  interface NavItem {
    key: string;
    label: string;
  }
  const navList: NavItem[] = [
    {
      key: 'https://www.baidu.com',
      label: '百度'
    },
    {
      key: 'https://www.jd.com',
      label: '京东'
    },
  ]
  return (
    <div className='dropdown-nav-container'>
      <DropdownNav
        list={navList}
        onItemClick={(e, key) => console.log('key', key, 'event', e)}
        trigger="click"
      >下拉导航菜单</DropdownNav>
    </div>
  )
}
export function PaginationDemo() {
  interface PaginationDemoState {
    pageSize: number;
    current: number;
  }
  const [state, setState] = useState<PaginationDemoState>({
    pageSize: 10,
    current: 1,
  });

  const { pageSize, current } = state;

  const onChange = (detail: { current: number; pageSize: number }) => {
    console.log(`页码改变：当前页数为：${detail.current},每页个数为： ${detail.pageSize}`);
    setState({
      current: detail.current,
      pageSize: detail.pageSize || 10,
    });
  }
  return (
    <div>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={101}
        onChange={onChange}
      />

      <br />

      <Pagination
        current={current}
        pageSize={pageSize}
        total={101}
        onChange={onChange}
        buttonBordered={false}
      />

      <br />

      <LitePagination
        current={current}
        pageSize={pageSize}
        total={101}
        onChange={onChange}
      />

      <br />

      <MiniPagination
        current={current}
        pageSize={pageSize}
        total={101}
        onChange={onChange}
      />
    </div>
  )
}
export function StepsDemo() {
  interface StepsDemoState {
    current: number;
  }
  const [current, setCurrent] = useState<StepsDemoState>({ current: 1 });

  const onStepChange = (step: number) => {
    setCurrent({ current: step });
  };

  return (
    <div className="zent-steps-demo-breadcrumb" style={{
      backgroundColor: '#f5f5f5', height: '80px', width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 20px',
      // 添加边框来可视化 padding 区域（调试用）
      boxSizing: 'border-box',
      // border: '2px solid red'
    }}>
      <div style={{}}>
        <Steps
          current={current.current}
          type="breadcrumb"
          onStepChange={onStepChange}
          ghost
        >
          <Steps.Step title="登录有赞帐号" />
          <Steps.Step title="选择门店" />
          <Steps.Step title="绑定门店" />
          <Steps.Step title="完成" />
        </Steps>
      </div>
    </div>
  )
}
export function AutoCompleteDemo() {
  const [state, setState] = useState<{ data: string[] }>({ data: [] });
  const onSelect = (v: string | null) => console.log('onSelect', v);
  const onSearch = (v: string) => {
    setState({
      data: v ? [v, v + v, v + v + v] : [],
    });
  };
  const onChange = (v: string | null) => console.log('onChange', v);
  return (
    <AutoComplete
      data={state.data}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
    />
  )
}
export function AutoCompleteDemo2() {

  function ControlledComplete() {
    const [state, setState] = useState<{ value: string; data: any[] }>({ value: '', data: [] });

    const onSelect = (v: string | null) => console.log('onSelect', v);
    const onSearch = (v: string) => {
      setState({
        ...state,
        data: v ? [v, v + v, v + v + v].map(item => ({ value: item, content: item })) : [],
      });
    };
    const onChange = (v: string | null) => {
      console.log('onChange', v);
      setState({ ...state, value: v || '' });
    };

    const data = [
      { isGroup: true, content: '浙江', value: 'group-zhejiang' },
      { value: 'hz', content: '杭州' },
      { value: '绍兴', content: <div><div>绍!兴!</div><div>这是第二行</div></div> },
      { value: '温州', content: '温州' },
      { value: '金华', content: '金华' },
      { isDivider: true, value: 'divider-1' },
      { isGroup: true, content: '江苏', value: 'group-jiangsu' },
      { value: '南京', content: '南京' },
      { value: '苏州', content: '苏州' },
      { value: '无锡', content: '无锡' },
      { value: '常州', content: '常州' },
    ]
    return (
      <AutoComplete
        placeholder="输入值受限..."
        value={state.value}
        data={data}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        valueFromOptions
      />
    )
  }

  function SelectComplete() {
    const [state, setState] = useState<{ value: string | null; data: any[] }>({ value: '', data: [] });
    const onSelect = (v: string | null) => console.log('onSelect', v)
    const onSearch = (v: string) => console.log('onSearch', v)
    const onChange = (v: string | null) => {
      console.log('onChange', v)
      setState({
        ...state, value: v,
      });
    }
    const data = [
      { isGroup: true, content: '浙江', value: "group-1" },
      { value: 'hz', content: '杭州' },
      { value: '绍兴', content: <div><div>绍!兴!</div><div>这是第二行</div></div> },
      '温州',
      '金华',
      { isDivider: true, value: "divider-1" },
      { isGroup: true, content: '江苏', value: "group-2" },
      '南京',
      '苏州',
      '无锡',
      '常州',
    ]
    return (
      <AutoComplete
        placeholder="输入值不受限..."
        value={state.value}
        data={data}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
      />
    )
  }

  return (
    <>
      <ControlledComplete />
      <SelectComplete />
    </>
  )
}
export function TransferDemo() {
  const data = new Array(20).fill(null).map((_, index) => ({
    option: String(index),
    text: `option${index}`,
    disabled: index % 2 === 1,
  }));
  const columns = [
    {
      name: 'text',
    },
  ];
  const [targetKeys, setTargetKeys] = useState(['8', '9', '10', '15']);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <Transfer
        keyName="option"
        dataSource={data}
        targetKeys={targetKeys}
        onChange={({ targetKeys, selectedKeys }) => {
          setTargetKeys(targetKeys);
          setSelectedKeys(selectedKeys);
        }}
        list={{ columns }}
        selectedKeys={selectedKeys}
        onSelectChange={items => setSelectedKeys(items)}
        disabled={checked}
      />
      <div style={{ marginTop: '20px' }}>
        <Switch checked={checked} onChange={() => setChecked(!checked)} />
        disabled
      </div>
    </div>
  )
}
export function CascaderDemo() {
  const [state, setState] = useState<{
    value: Array<CascaderValue[]>;
    options: IPublicCascaderItem[];
  }>({
    value: [],
    options: [
      {
        value: '330000',
        label: '浙江省',
        children: [
          {
            value: '330100',
            label: '杭州市',
            children: [
              {
                value: '330106',
                label: '西湖区',
              },
              {
                value: '330107',
                label: '余杭区',
              },
            ],
          },
          {
            value: '330200',
            label: '温州市',
            children: [
              {
                value: '330206',
                label: '龙湾区',
                disabled: true,
              },
            ],
          },
        ],
      },
      {
        value: '120000',
        label: '新疆维吾尔自治区',
        children: [
          {
            value: '120100',
            label: '博尔塔拉蒙古自治州',
            children: [
              {
                value: '120111',
                label: '阿拉山口市',
              },
            ],
          },
        ],
      },
    ],
  });



  const onChange = (
    value: Array<CascaderValue[]>,
    selectedOptions: Array<ICascaderItem[]>,
    meta: ICascaderMultipleChangeMeta
  ) => {
    console.log(value, selectedOptions, meta);
    setState({
      ...state,
      value,
    });
  };
  const asyncFilter = (_keyword?: string, _limit?: number): Promise<Array<ICascaderItem[]>> =>
    new Promise((resolve) => {
      console.log('asyncFilter - keyword:', _keyword, 'limit:', _limit);
      setTimeout(() => {
        const searchList: Array<IPublicCascaderItem[]> = [
          [
            { value: '330000', label: '浙江省' },
            { value: '330100', label: '杭州市' },
            // { value: '330101', label: `${_keyword}-1` },
          ],
          [
            { value: '330000', label: '浙江省' },
            { value: '330200', label: '温州市' },
            // { value: '330201', label: `${_keyword}-2` },
          ],
        ];

        // insert into options if missing
        const options = clone(state.options);
        searchList.forEach(path => insertPath(options, path));

        setState({
          ...state,
          options,
        });

        resolve(searchList as Array<ICascaderItem[]>);
      }, 500);
    });

  return (
    <MenuCascader
      value={state.value}
      options={state.options}
      onChange={onChange}
      expandTrigger="hover"
      asyncFilter={asyncFilter}
      clearable
      searchable
      async
      multiple
      limit={100}  // 自定义搜索结果限制数量，默认是 50
    />
  )
}
export default function ZentUseTry(): JSX.Element {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
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
      <BreadcrumbDemo />
      <DropdownDemo />
      <DropdownNavDemo />
      <PaginationDemo />
      <br />
      <StepsDemo />
      <br />
      <AutoCompleteDemo />
      <br />
      <AutoCompleteDemo2 />
      <br />
      <TransferDemo />
      <br />
      <CascaderDemo />
    </div>
  );
}
import { Page } from './model';

function genId() {
  return Math.random().toString(36).slice(-8);
}

export function getRootPage() {
  const page: Page = {
    id: genId(),
    title: '我的空间',
    content: '',
    children: [
      {
        id: genId(),
        title: '欢迎使用',
        content: '# 欢迎使用',
        children: [makePage(), makePage([makePage()]), makePage()],
      },
      {
        id: genId(),
        title: '测试文档1',
        content: '# 欢迎使用',
        children: [],
      },
      {
        id: genId(),
        title: '测试文档2',
        content: '# 欢迎使用',
        children: [makePage(), makePage()],
      },
    ],
  };
  return page;
}

export function makePage(children?: Page[]): Page {
  const id = genId();
  return {
    id: genId(),
    title: `文档${id}`,
    content: `# 文档${id}`,
    children: children ?? [],
  };
}

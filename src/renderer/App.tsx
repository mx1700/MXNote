/* eslint-disable @typescript-eslint/no-use-before-define */
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
// import { BeakerIcon } from '@heroicons/react/solid';
import {
  DocumentTextIcon,
  PlusCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
  MinusSmIcon,
} from '@heroicons/react/outline';
import { Editor, rootCtx } from '@milkdown/core';
import { ReactEditor, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';
import { tooltip } from '@milkdown/plugin-tooltip';
import { slash } from '@milkdown/plugin-slash';
import { history } from '@milkdown/plugin-history';
import { MouseEventHandler, useState } from 'react';
import create from 'zustand';
import shallow from 'zustand/shallow';
import { getRootPage } from '../main/model-manager';
import { Page } from '../main/model';
import PageTree from './PageTree';

// const customTheme = themeFactory({
//   font: {
//     typography: ['Roboto', 'Helvetica', 'Arial'],
//     code: ['Monaco', 'Fira Code'],
//   },
//   size: {
//     radius: '2px',
//     lineWidth: '1px',
//   },
//   color: {
//     primary: '#ff79c6',
//     secondary: '#bd93f9',
//     neutral: '#000',
//     background: '#fff',
//   },
// });

interface SelectedPageState {
  selectedPage: Page | null;
  setSelectedPage: (page: Page) => void;
}

export const useSelectedPage = create<SelectedPageState>((set) => ({
  selectedPage: null,
  setSelectedPage: (page: Page) => set({ selectedPage: page }),
}));

const Hello = () => {
  const [rootPage] = useState(() => getRootPage());
  return (
    <div>
      <div className="flex">
        <div
          className="w-56 h-screen bg-gray-200 text-gray-700 border-r"
          // style={{ width: 240, minWidth: 240 }}
        >
          <div className="h-10 bg-gray-200 title-bar" />
          <div className="mx-3 py-1 text-gray-500 text-xs">
            <span className="px-2">文档列表</span>
            <PlusCircleIcon
              className="h-4 w-4 inline float-right"
              onClick={() => alert(1)}
            />
          </div>
          <PageTree pages={rootPage.children} deep={1} />
        </div>
        <div id="editor" className="flex-1">
          <div className="flex">
            <div className="h-10 w-full bg-gray-100 px-2 title-bar flex flex-row items-center text-sm">
              <ToolbarButton>
                <ChevronLeftIcon className="h-5 w-5 inline" />
              </ToolbarButton>
              <ToolbarButton>
                <ChevronRightIcon className="h-5 w-5 inline" />
              </ToolbarButton>
              <div className="flex-1" />
              <ToolbarButton>
                <DotsHorizontalIcon className="h-5 w-5 inline" />
              </ToolbarButton>
            </div>
            <div className="flex-1 w-64 overflow-scroll bg-white">
              <MilkdownEditor />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ToolbarButton(props: { children: any }) {
  const { children } = props;
  return (
    <div className="px-1.5 py-1 pb-1.5 hover:bg-gray-200 transition duration-250 ease-in-out rounded-md">
      {children}
    </div>
  );
}

export const MilkdownEditor: React.FC = () => {
  const editor = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
      })
      .use(nord)
      .use(commonmark)
      .use(tooltip)
      .use(history)
      // .use(tooltip)
      .use(slash)
  );

  return <ReactEditor editor={editor} />;
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}

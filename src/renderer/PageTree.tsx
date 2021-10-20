import { MouseEventHandler, useState } from 'react';
import shallow from 'zustand/shallow';
import { ChevronRightIcon, DocumentTextIcon } from '@heroicons/react/outline';
import { Page } from '../main/model';
import { useSelectedPage } from './App';

export default function PageTree(props: {
  pages: Page[];
  deep: number;
  // onItemClick?: (page: Page) => void;
}) {
  const { pages, deep } = props;
  // const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  return (
    <>
      {pages.map((page) => (
        <LeftItem
          key={page.id}
          page={page}
          // selected={selectedPage === page}
          // onClick={onItemClick}
          deep={deep}
        />
      ))}
    </>
  );
}

LeftItem.defaultProps = {
  // selected: false,
  onClick: undefined,
};

function LeftItem(props: {
  page: Page;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  deep: number;
}) {
  const { page, onClick, deep } = props;
  const [showChildren, setShowChildren] = useState<boolean>(false);
  const [selectedPage, setSelectedPage] = useSelectedPage(
    (state) => [state.selectedPage, state.setSelectedPage],
    shallow
  );
  const selected = page === selectedPage;
  const hasChildren = page.children && page.children.length > 0;
  const iconChevronClass = `h-3.5 w-3.5 inline mb-0.5 text-gray-400 transition duration-250 ease-in-out ${
    showChildren ? 'transform rotate-90' : ''
  }`;
  const openIcon = hasChildren ? (
    <ChevronRightIcon
      className={iconChevronClass}
      onClick={(e) => {
        setShowChildren((v) => !v);
        e.stopPropagation();
      }}
    />
  ) : (
    <div className="inline-block w-1 h-1 rounded-md m-1 ml-1.5 mb-0.5 border border-gray-400 bg-gray-400" />
    // <MinusSmIcon className="h-3.5 w-3.5 inline mb-0.5 text-gray-500" />
  );
  const pl = `px-${3 * deep}`;
  const lineClass = `${pl} py-1.5 pb-1 text-sm ${
    selected ? 'bg-gray-300' : ''
  }`;

  return (
    <div>
      <div className={lineClass} onClick={() => setSelectedPage(page)}>
        {openIcon}
        <DocumentTextIcon className="h-5 w-5 inline pr-1 pb-0.5" />
        {page.title}
      </div>
      <div>
        {showChildren && <PageTree pages={page.children} deep={deep + 1} />}
      </div>
    </div>
  );
}

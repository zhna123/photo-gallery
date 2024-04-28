import { totalmem } from "os"
import usePagination from "../hooks/usePagination"
import clsx from 'clsx';
import Icon from '@mdi/react';
import { mdiArrowLeftThin } from '@mdi/js';
import { mdiArrowRightThin } from '@mdi/js';



export type PaginationProps = {
  totalItems: number
  currentPage: number
  itemsPerPage: number
  paginate: (p: number) => void
}

export default function Pagination(
  {
    totalItems,
    currentPage,
    itemsPerPage,
    paginate,
  }: PaginationProps
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const pages = usePagination(totalPages, currentPage)

  return (
    <div className="flex justify-center mt-auto">
      <PaginationArrow
        direction="left"
        onClick={() => paginate(currentPage-1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex">
        {pages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;

          if (index === 0) position = 'first';
          if (index === pages.length - 1) position = 'last';
          if (pages.length === 1) position = 'single';
          if (page === '...') position = 'middle';

          return (
            <PaginationNumber
              key={page.toString().concat(index.toString())}
              onClick={() => {
                if (page !== '...') {
                  paginate(Number(page))
                }
              }}
              page={page}
              position={position}
              isActive={page === '...' ? false :  currentPage === Number(page)}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        onClick={() => paginate(currentPage+1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  )
}

function PaginationNumber({
  page,
  onClick,
  isActive,
  position,
}: {
  page: number | string;
  onClick: ()=>void;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = clsx(
    'flex h-9 w-9 items-center justify-center text-sm border',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-[#008DDA] text-[#F7EEDD]': isActive,
      // 'hover:bg-gray-100': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    },
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <a onClick={onClick} className={className}>
      {page}
    </a>
  );
}

function PaginationArrow({
  direction,
  onClick,
  isDisabled,
}: {
  direction: 'left' | 'right';
  onClick: ()=>void;
  isDisabled?: boolean;
}) {
  const className = clsx(
    'flex h-9 w-9 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      // 'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <Icon path={mdiArrowLeftThin} size={1} />
    ) : (
      <Icon path={mdiArrowRightThin} size={1} />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <a className={className} onClick={onClick}>
      {icon}
    </a>
  );
}
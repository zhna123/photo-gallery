/* eslint-disable @next/next/no-img-element */
'use client'

import { useRef, useState } from "react";
import PhotoModal from "./ui/photo-modal";
import useCSVData, { PhotoData } from "./hooks/PhotoData";
import PaginationPage from "./components/PaginationPage";
import { ITEM_PER_PAGE, YEARS } from "./lib/constant";
import Skeleton from "./ui/skeleton";
import clsx from 'clsx';
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import MenuModal from "./ui/menu-modal";


export default function Home() {
  
  const [showModal, setShowModal] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState<PhotoData>()

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const [currentPage, setCurrentPage] = useState(1)
  const { photos, total, isLoading, isError } = useCSVData({year: currentYear, limit: ITEM_PER_PAGE, page: currentPage})

  const [showMenu, setShowMenu] = useState(false)

  const paginate = (p: number) => {
    setCurrentPage(p)
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  }

  const yearChange = (year: number) => {
    setCurrentYear(year)
    setCurrentPage(1)
    setShowMenu(false)
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  }

  const ref = useRef<null | HTMLDivElement>(null); 

  return (
    <main className="flex min-h-screen w-full flex-col gap-4 py-4 px-2 lg:p-4 text-gray-800">
      <header className="sticky top-0 w-full h-12 sm:h-24 sm:self-center sm:static flex justify-between sm:justify-center sm:items-center">
          <img src="logo.svg" alt="family gallery logo" className="w-16 sm:w-24" />
          <div className="sm:hidden" onClick={()=>setShowMenu(true)}>
            <Icon path={mdiMenu} size={2} />
          </div>
      </header>
      <ul className="hidden sm:flex sm:h-12 justify-center items-center gap-2 lg:gap-4 text-xs lg:text-sm w-full bg-background_white p-2 sticky top-0">
        {
          YEARS.map((year, index) => {
            const className = clsx(
              'py-2 px-4 border rounded-md cursor-pointer border hover:bg-gray-100',
              {
                'bg-gallery_blue text-off_white hover:bg-gallery_blue': year === currentYear
              }
            )
            return (
              <li key={index} className={className} 
                onClick={() => yearChange(year)}>
                {year}
              </li>
            )
          })
        }
      </ul>
      {isLoading && <Skeleton />}
      <div ref={ref}></div>
      {photos && 
        <PaginationPage 
          photos={photos} 
          totalItems={total!} 
          currentPage={currentPage} 
          itemsPerPage={ITEM_PER_PAGE} 
          paginate={paginate}
          setShowModal={setShowModal} 
          setCurrentPhoto={setCurrentPhoto} />
      }
      { showMenu && <MenuModal setShowMenu={setShowMenu} currentYear={currentYear} yearChange={yearChange} /> }
      { showModal && <PhotoModal currentPhoto={currentPhoto} setShowModal={setShowModal}/>}
    </main>
  );
}

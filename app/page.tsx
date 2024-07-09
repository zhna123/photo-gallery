/* eslint-disable @next/next/no-img-element */
'use client'

import { useRef, useState } from "react";
import PhotoModal from "./ui/photo-modal";
import usePhotoData, { PhotoData } from "./hooks/PhotoData";
import useVideoData, { VideoData } from "./hooks/VideoData";
import { ITEM_PER_PAGE, YEARS } from "./lib/constant";
import Skeleton from "./ui/skeleton";
import clsx from 'clsx';
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import { mdiArrowUp } from '@mdi/js';
import MenuModal from "./ui/menu-modal";
import PhotosPage from "./components/PhotosPage";
import VideosPage from "./components/VideosPage";
import InfiniteLoading from "./components/InfiniteLoading";
import VideoModal from "./ui/video-modal";


export default function Home() {
  
  const [showModal, setShowModal] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState<PhotoData>()

  const [currentVideo, setCurrentVideo] = useState<VideoData>()

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const [photoPageCnt, setPhotoPageCnt] = useState(1);
  const [videoPageCnt, setVideoPageCnt] = useState(1);
  const { photos, total: photoTotal, isLoading: photoLoading, isError: photoError } = usePhotoData({year: currentYear, limit: ITEM_PER_PAGE, pageCnt: photoPageCnt})
  const { videos, total: videoTotal, isLoading: videoLoading, isError: videoError } = useVideoData({year: currentYear, limit: ITEM_PER_PAGE, pageCnt: videoPageCnt})

  const [showMenu, setShowMenu] = useState(false)

  const [showVideosTab, setShowVideosTab] = useState(false);

  const yearChange = (year: number) => {
    setCurrentYear(year)
    setPhotoPageCnt(1)
    setVideoPageCnt(1)
    setShowMenu(false)
    scrollToTop()
  }

  const scrollToTop = () => {
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  }

  const loadMorePhotos = () => {
    setPhotoPageCnt(prevCnt => prevCnt + 1);
  };

  const loadMoreVideos = () => {
    setVideoPageCnt(prevCnt => prevCnt + 1);
  };

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
              'py-2 px-4 border rounded-md cursor-pointer',
              {
                'bg-gallery_blue text-off_white hover:bg-gallery_blue': year === currentYear,
                'hover:bg-gray-100': year !== currentYear
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
      <ul className="self-center flex justify-between p-2 leading-8 w-[150px] bg-gray-200 rounded-full">
        <li 
          className={`rounded-full px-4 cursor-pointer ${!showVideosTab ? 'bg-gallery_blue text-white':''}`}
          onClick={()=>{
            setShowVideosTab(false)
            setPhotoPageCnt(1)
          }}
        >
            相片
        </li>
        <li 
          className={`rounded-full px-4 cursor-pointer ${showVideosTab ? 'bg-gallery_blue text-white':''}`}
          onClick={()=>{
            setShowVideosTab(true)
            setVideoPageCnt(1)
          }}
        >
            视频
        </li>
      </ul>
      {photoLoading && <Skeleton />}
      {videoLoading && <Skeleton />}
      <div ref={ref}></div>
      {!showVideosTab && photos && 
        <PhotosPage 
          photos={photos} 
          totalItems={photoTotal!} 
          setShowModal={setShowModal} 
          setCurrentPhoto={setCurrentPhoto} />
      }
      {
        !showVideosTab &&
        <InfiniteLoading cnt={photoPageCnt} total={photoTotal!} loadMore={loadMorePhotos} />
      }
      {
        showVideosTab && videos &&
        <VideosPage
          videos={videos} 
          totalItems={videoTotal!}
          setShowModal={setShowModal}
          setCurrentVideo={setCurrentVideo}/>
      }

      {
        showVideosTab &&
        <InfiniteLoading cnt={videoPageCnt} total={videoTotal!} loadMore={loadMoreVideos} />
      }

      <div onClick={scrollToTop}>
        <Icon path={mdiArrowUp} size={2} className="fixed bottom-0 right-0 text-gallery_blue m-2" />
      </div>
      
      { !showVideosTab && showModal && <PhotoModal currentPhoto={currentPhoto} setShowModal={setShowModal}/>}
      { showVideosTab && showModal && <VideoModal currentVideo={currentVideo} setShowModal={setShowModal}/>}

      { showMenu && <MenuModal setShowMenu={setShowMenu} currentYear={currentYear} yearChange={yearChange} /> }
    </main>
  );
}

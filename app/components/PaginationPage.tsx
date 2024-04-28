/* eslint-disable @next/next/no-img-element */
import { PhotoData } from "../hooks/PhotoData";
import Pagination from "./Pagination";


export default function PaginationPage (
  {
    photos,
    totalItems,
    currentPage,
    itemsPerPage,
    paginate,
    setShowModal,
    setCurrentPhoto
  }: 
  {
    photos: PhotoData[],
    totalItems: number,
    currentPage: number,
    itemsPerPage: number,
    paginate: (p: number) => void,
    setShowModal: (a: boolean) => void,
    setCurrentPhoto: (a: PhotoData) => void
  }
  
  ) {

  function showPhotoModal(photo: PhotoData) {
    setShowModal(true)
    setCurrentPhoto(photo)
  }

  return (
    <div className="flex flex-col h-36 min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-9rem)]">
      <div className="columns-2 md:columns-3 gap-1 lg:gap-2 mb-6">
        {
          photos && photos.map( (photo, index) => {
            const timestamp = new Date(photo.datetime).getTime();
            return (
                <div key={timestamp + index} className="mb-1 lg:mb-2" onClick={() => showPhotoModal(photo)}>
                  <img alt="family photos" className={`w-full aspect-[${photo.aspect_ratio}]`} src={`thumbnail/${photo.filename}`}/>
                </div>
            )
          })
        }
      </div>
      <Pagination totalItems={totalItems} currentPage={currentPage} itemsPerPage={itemsPerPage} paginate={paginate} />
    </div>
  )
}
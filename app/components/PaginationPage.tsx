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
    <div className="flex flex-col my-4 gap-4 w-full">
      <Pagination totalItems={totalItems} currentPage={currentPage} itemsPerPage={itemsPerPage} paginate={paginate} />
      <div className="flex flex-wrap gap-2 w-full">
        {
          photos && photos.map( (photo, index) => {
            const timestamp = new Date(photo.datetime).getTime();
            return (
                <div key={timestamp + index} className={`grow basis-[40%] sm:basis-[21%] h-[20vh] sm:h-[40vh] aspect-[${photo.aspect_ratio}] bg-gray-800`} onClick={() => showPhotoModal(photo)}>
                  <img alt="family photos" className="w-full h-full object-cover" src={`thumbnail/${photo.filename}`}/>
                </div>
            )
          })
        }
        <div className="grow-[10]"></div>
      </div>
    </div>
  )
}
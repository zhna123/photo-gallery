/* eslint-disable @next/next/no-img-element */
import { PhotoData } from "../hooks/PhotoData";


export default function PaginationPage (
  {
    photos,
    totalItems,
    setShowModal,
    setCurrentPhoto
  }: 
  {
    photos: PhotoData[],
    totalItems: number,
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
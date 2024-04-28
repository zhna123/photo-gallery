/* eslint-disable @next/next/no-img-element */
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import { PhotoData } from '../hooks/PhotoData';
import ModalLayout from '../components/ModalLayout';


export default function PhotoModal({currentPhoto, setShowModal}: 
  {currentPhoto: PhotoData | undefined, setShowModal: (a: boolean) => void}) {
  return (
    <ModalLayout>
      <div className='mb-8 ml-5 mt-5 md:ml-10 md:mt-10 cursor-pointer' onClick={() => setShowModal(false)}>
        <Icon path={mdiArrowRight}
              title="Back to photos"
              size={2}
              horizontal
              vertical
              className="text-gray-800"
          />
      </div>
      <img alt="family photos"
        className={`w-full md:w-4/5 md:h-4/5 object-contain self-center`}
        src={`images/${currentPhoto!.filename}`} />
    </ModalLayout>
  )
}
/* eslint-disable @next/next/no-img-element */
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import ModalLayout from '../components/ModalLayout';
import { VideoData } from '../hooks/VideoData';


export default function VideoModal({currentVideo, setShowModal}: 
  {currentVideo: VideoData | undefined, setShowModal: (a: boolean) => void}) {
  return (
    <ModalLayout>
      <div className='mb-8 ml-5 mt-5 md:ml-10 md:mt-10 cursor-pointer' onClick={() => setShowModal(false)}>
        <Icon path={mdiArrowRight}
              title="Back to videos"
              size={2}
              horizontal
              vertical
              className="text-gray-800"
          />
      </div>
      <video controls
        className={`w-4/5 h-4/5 object-contain self-center`}
      >
        <source src={`videos/${currentVideo!.filename}`} />
      </video>
    </ModalLayout>
  )
}
/* eslint-disable @next/next/no-img-element */
import { VideoData } from "../hooks/VideoData";

export default function VideosPage (
  {
    videos,
    totalItems,
    setShowModal,
    setCurrentVideo
  }: 
  {
    videos: VideoData[],
    totalItems: number,
    setShowModal: (a: boolean) => void,
    setCurrentVideo: (a: VideoData) => void
  }
  
  ) {

  function showVideoModal(video: VideoData) {
    setShowModal(true)
    setCurrentVideo(video)
  }

  return (
    <div className="flex flex-col gap-4 w-full"> 
      <div className="flex flex-wrap gap-2 w-full">
        {
          videos && videos.map( (video, index) => {
            const timestamp = new Date(video.datetime).getTime();
            return (
                <div key={timestamp + index} className={`grow basis-[40%] sm:basis-[21%] h-[20vh] sm:h-[40vh] bg-gray-800`} onClick={() => showVideoModal(video)}>
                  <img alt="videos" className="w-full h-full object-cover" src={`video_thumbnail/${video.thumbnail_name}`}/>
                </div>
            )
          })
        }
        <div className="grow-[10]"></div>
      </div>
    </div>
  )
}
'use client'

import useSWR from 'swr'
import Papa from 'papaparse'

export type VideoData = {
  filename: string, // video
  thumbnail_name: string, // image
  aspect_ratio: string,
  datetime: string
}


async function fetchCSVData(url: string): Promise<VideoData[]> {
  const response = await fetch(url);
  const csvText = await response.text();
  const result = Papa.parse(csvText);

  const videos: VideoData[] = result.data.map((item: any) => ({
    filename: item[0],
    thumbnail_name: item[1],
    aspect_ratio: item[2],
    datetime: item[3]
  }));

  return videos;
}

export default function useCSVData({year, limit, pageCnt}: {year: number, limit: number, pageCnt: number}) {
  const { data, error, isLoading } = useSWR(
    `videos.csv`,
    fetchCSVData,
  )
  const dataForYear = data?.filter(p => new Date(p.datetime).getFullYear() === year)
  const currentData = dataForYear?.slice(0, pageCnt * limit)
  const mapped = currentData?.map(v => {
    return {
      filename: extractFileNameFromPath(v.filename),
      thumbnail_name: extractFileNameFromPath(v.thumbnail_name),
      aspect_ratio: v.aspect_ratio,
      datetime: v.datetime
    }
  })
  return {
    videos: mapped,
    total: dataForYear?.length,
    isLoading,
    isError: error
  }
}

function extractFileNameFromPath(path: string) {
  return path.slice(path.indexOf('\\') + 1)
}

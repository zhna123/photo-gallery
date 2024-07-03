'use client'

import useSWR from 'swr'
import Papa from 'papaparse'

export type PhotoData = {
  filename: string,
  aspect_ratio: string,
  datetime: string
}


async function fetchCSVData(url: string): Promise<PhotoData[]> {
  const response = await fetch(url);
  const csvText = await response.text();
  const result = Papa.parse(csvText);

  const photos: PhotoData[] = result.data.map((item: any) => ({
    filename: item[0],
    aspect_ratio: item[1],
    datetime: item[2]
  }));

  return photos;
}

export default function useCSVData({year, limit, pageCnt}: {year: number, limit: number, pageCnt: number}) {
  const { data, error, isLoading } = useSWR(
    `photos.csv`,
    fetchCSVData,
  )
  const dataForYear = data?.filter(p => new Date(p.datetime).getFullYear() === year)
  const currentData = dataForYear?.slice(0, pageCnt * limit)
  return {
    photos: currentData,
    total: dataForYear?.length,
    isLoading,
    isError: error
  }
}
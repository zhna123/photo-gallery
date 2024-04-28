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

export default function useCSVData({year, limit, page}: {year: number, limit: number, page: number}) {
  const { data, error, isLoading } = useSWR(
    `photos.csv`,
    fetchCSVData,
  )
  const dataForYear = data?.filter(p => new Date(p.datetime).getFullYear() === year)
  const paginatedData = dataForYear?.slice((page-1) * limit, page * limit)
  return {
    photos: paginatedData,
    total: dataForYear?.length,
    isLoading,
    isError: error
  }
}
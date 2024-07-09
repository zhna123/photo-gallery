import { ITEM_PER_PAGE } from "../lib/constant";

export default function InfiniteLoading({cnt, total, loadMore}: {cnt: number, total: number, loadMore: ()=>void}) {
  return (
        cnt * ITEM_PER_PAGE < total! && (
          <button className="py-2 px-4 w-1/2 mx-auto border border-gray-800 rounded-md cursor-pointer" 
            onClick={loadMore}>
              显示更多
          </button>
        )
  )
}
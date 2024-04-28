import ModalLayout from "../components/ModalLayout";
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { YEARS } from "../lib/constant";
import clsx from 'clsx';


export default function MenuModal({setShowMenu, currentYear, yearChange}: 
  {setShowMenu: (a: boolean)=>void, currentYear: number, yearChange: (a:number)=>void}) {

  return (
    <ModalLayout>
      <div className='mb-8 ml-5 mt-5 md:ml-10 md:mt-10 cursor-pointer self-end' onClick={() => setShowMenu(false)}>
        <Icon path={mdiClose}
              title="close menu"
              size={2}
              horizontal
              vertical
              className="text-gray-800"
          />
      </div>

      <div className="self-center text-lg">
        <h1>Select year:</h1>
        <ul className="flex flex-col gap-4 mt-4">
        {
          YEARS.map((year, index) => {
            const className = clsx(
              'p-2 border rounded-md cursor-pointer border flex justify-center items-center',
              {
                'bg-gallery_blue text-off_white': year === currentYear
              }
            )
            return (
              <li key={index} className={className} 
                onClick={() => yearChange(year)}>
                {year}
              </li>
            )
          })
        }
      </ul>
      </div>
      
    </ModalLayout>
  )
}
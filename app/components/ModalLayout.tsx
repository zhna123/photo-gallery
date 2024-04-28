import { ReactNode } from "react";

export default function Modal({children}: {children: ReactNode}) {
  return (
      <div className={`fixed w-full h-full top-0 left-0 bg-off_white flex flex-col z-10`}>
        {children}
      </div>
  )
}
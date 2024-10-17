import { Button } from 'antd'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'

require('dayjs/locale/id')
interface IProps {
  children: any
}
export default function Template(props: IProps) {
  const { children } = props
     const router = useRouter()
    // const userProfile:any = jwt_decode(user?.credential!)
    const logOutGoogle = () => {

        router.push("/") 
    }
  return (
    <>
      <div className="bg-blue-600 text-white h-[60px] fixed top-0 left-0 right-0 text-xl w-full flex items-center z-20 px-4">
        <div className="flex items-center justify-between w-full">
          {/* Bagian kiri: Judul */}
          <h1 className="font-bold text-white text-sm md:text-lg lg:text-2xl">
            Github <span className="font-normal text-white text-sm md:text-lg lg:text-2xl">Jobs</span>
          </h1>
          {/* Bagian kanan: Profil pengguna dan tombol logout */}
          <div className="flex items-center">
            <div className="flex items-center gap-1 md:gap-3 font-medium text-sm">
                <div className="text-right">
                  <p className="text-sm">{ ""}</p>
                  <p className="text-sm -mt-6 md:-mt-4">{""}</p>
                </div>
                {/* <div className="w-10 h-10">
                  <Image
                    src={userProfile?.picture || ""}
                    alt={userProfile?.name.split(" ")[0] || ""}
                    width={40}
                    height={40}
                    className="rounded-md object-cover border-2 border-gray-200 border-solid"
                  />
                </div> */}
                <Button type="primary" onClick={logOutGoogle} size="middle" className="text-white mr-10">
                Logout
                </Button>
              </div>
          </div>
        </div>
      </div>
      {children}
    </>
  )
}

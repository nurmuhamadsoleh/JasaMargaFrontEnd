import React, {useState} from 'react'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { IJobsListDAO } from '../DAO/JobsList.dao'
import Image from 'next/image'
import Link from 'next/link'
import NoImage from "assets/images/noimage.jpg"
import { useRouter } from 'next/router'

interface IProps {
  dataListJobs?: IJobsListDAO 
  isLoadingJobs: boolean;
}
export default function JobsDetailComponent(props: IProps) {
  const {isLoadingJobs,dataListJobs} = props
  const router = useRouter()
  const [imgSrc, setImgSrc] = useState(dataListJobs?.company_logo || NoImage);
  return (
    <>
      <div className='pt-20 '>
        <Button icon={<ArrowLeftOutlined/>} size='middle' className=' ml-1 md:ml-6 cursor-pointer' onClick={()=>router.push("/jobs")}>Back</Button>
      </div>
      <div className='px-3 mt-5 mb-3 md:mb-0 border-solid border-8 rounded-md mx-auto border-gray-400 bg-white h-auto w-10/12 md:w-11/12 pb-2'>
       {isLoadingJobs ? (<div className='w-full text-center text-2xl font-bold text-black'>Loading Jobs Detail</div>) : (
      <> 
        <div className='leading-none mt-2'>
          <span className='text-sm md:text-xl text-gray-500 leading-none'>{dataListJobs?.type || ""} / {dataListJobs?.location || ""}</span><br />
          <span className='text-lg md:text-4xl text-blue-950'>{dataListJobs?.title || ""}</span>
          <hr className='w-full bg-gray-500 mt-5'/>
        </div>
        <div className='flex flex-wrap md:flex-nowrap gap-3'>
          <div className='basis-full md:basis-4/5 p-2'>
            {dataListJobs?.description && (
              <div dangerouslySetInnerHTML={{__html: dataListJobs.description}}></div>
            )}
          </div>
          <div className=' basis-full md:basis-auto p-2'>
            <div className=' bg-white max-h-[800px] px-2 py-2 rounded-md border-solid border-8 border-gray-400'>
              <div className='flex items-center justify-between h-10'>
                <p className='font-medium text-sm'>Trade Republic</p>
               <p className='text-blue-500
              bg-white h-5 py-2 px-2 font-bold rounded-md'>1 other job</p>
              </div>
              <hr className='w-full mt-0 bg-gray-400'/>
              <div className='text-left text-sm'>
                <Image 
                  src={imgSrc} 
                  alt={dataListJobs?.company || ""} 
                  width={300} 
                  height={250}
                  onError={() => setImgSrc(NoImage)} // Mengubah sumber gambar ke NoImage jika gagal
                />
              {dataListJobs?.company_url ? (
                <Link href={dataListJobs.company_url} className='block text-blue-500 underline -mt-5'>
                  {dataListJobs.company_url}
                </Link>
              ) : (
                <p className='block text-black no-underline -mt-2 font-medium'>Tidak Ada Link URL</p>
              )}
              </div>
            </div>
            <div className=' bg-yellow-100 max-h-[800px] px-2 py-2 mt-3 rounded-md border-solid border-8 border-gray-400'>
              <p className='text-black font-bold text-sm'>How to apply</p>
              <hr className='w-full mt-0 bg-gray-400'/>

              <div className='text-gray-400 text-sm w-full text-left'>
                {dataListJobs?.how_to_apply && (
                  <div dangerouslySetInnerHTML={{__html: dataListJobs?.how_to_apply}}></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>)}
      </div>  
    </>
  )
}

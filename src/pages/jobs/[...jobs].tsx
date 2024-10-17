import JobsDetailContainer from 'module/Dashboard/Container/JobsDetailContainer'
import React from 'react'
import { useRouter } from 'next/router'

export default function Jobs() {
   const router = useRouter()
  const jobsId:any = router.query.jobs
  return (
    <JobsDetailContainer params={jobsId}/>
  )
}

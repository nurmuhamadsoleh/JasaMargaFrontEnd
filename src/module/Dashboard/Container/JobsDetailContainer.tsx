import { GetDetailJobsAPI } from 'service/jobs.api'
import JobsDetailComponent from '../Component/JobsDetailComponent'
import React from 'react'
import { useQuery } from '@tanstack/react-query'

interface IProps {
  params?:any
} 
export default function JobsDetailContainer(props: IProps) {
  const {params} = props
  const idJobs = params ? params[0] : null;
  const {data: dataDetailJobs, isFetching: isFetchingDetailJobs} = useQuery(
    ['Get Detail List Jobs', idJobs],
    GetDetailJobsAPI
  )
  return (
    <JobsDetailComponent isLoadingJobs={isFetchingDetailJobs} dataListJobs={dataDetailJobs} />
  )
}

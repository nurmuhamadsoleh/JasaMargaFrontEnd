import { IJobsDAO } from 'module/Dashboard/DAO/Jobs.dao';
import { IJobsListDAO } from 'module/Dashboard/DAO/JobsList.dao';
import { UseBaseQueryOptions } from '@tanstack/react-query'
import axios from "axios";

export async function GetJobsAPI(params: UseBaseQueryOptions): Promise<IJobsDAO[]> {
  const [ 
    // eslint-disable-next-line no-unused-vars
    _queryKey, filterDesc, filterLocation, isFullTime, page] =
    params.queryKey || [];
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/recruitment/positions.json?description=${filterDesc}&location=${filterLocation}&full_time=${isFullTime}&page=${page}`,
  );
  return data;
}
export async function GetDetailJobsAPI(params: UseBaseQueryOptions): Promise<IJobsListDAO> {
  const [ 
    // eslint-disable-next-line no-unused-vars
    _queryKey, id] =
    params.queryKey || [];
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/recruitment/positions/${id}`,
  );
  return data;
}
export async function ListJobs(params:any){
  const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/recruitment/positions.json?description=${params.Jobs_Desc}&location=${params.Location}&full_time=${params.Full_Time_Only}`)
  return data
}

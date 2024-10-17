import React, { useEffect, useState } from "react";

import DashboardComponent from "../Component/DashboardComponent";
import {IJobsListDAO} from "../DAO/JobsList.dao"
import { ListJobs } from "service/jobs.api";
import { slice } from "lodash";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function DasboardContainer() {
  const [size, setSize] = useState<any>(6);
  const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(false);
  const [dataJobsList, setDataJobsList] = useState<IJobsListDAO[]>([]);
  const mutateListJobs = useMutation(ListJobs, {
    onSuccess: (data:any) => {
      setDataJobsList(data)
      return
    },
     onError: (error: any) => {
      if (error.message === 'Network Error') {
        toast.warning(error.message)
        return
      } else {
        toast.error(error.message)
        return
      }
    },
  });
  const handleLoadMore = () =>{
    setLoadingLoadMore(true)
    setTimeout(() => {
      setSize((prevPageIndex:any) => prevPageIndex + 6);
      setLoadingLoadMore(false);
    }, 2000);
  }
  const handleSubmit = (value:any) => {
    mutateListJobs.mutate({
      Jobs_Desc: value.Jobs_Desc || "",
      Location: value.Location || "",
      Full_Time_Only: value.Full_Time_Only,
    })
  }
   useEffect(()=>{
  mutateListJobs.mutate({
    Jobs_Desc: "",
    Location:  "",
    Full_Time_Only: true
  })
  },[])
  const displayJobs:any = slice(dataJobsList, 0, size);
  return (
    <>
      <DashboardComponent
      handleLoadMore={handleLoadMore}
      handleSubmit={handleSubmit}
      dataJobs={displayJobs}
       isLoadingJobs={loadingLoadMore || mutateListJobs.isLoading}
      />
    </>
  );
}

import { BookOutlined, GlobalOutlined } from '@ant-design/icons';
import { Button, Form as FormANTD } from "antd";
import { Field, Form } from 'react-final-form'
import React, {useEffect, useRef, useState} from "react";

import Checkbox from 'component/Checkbox'
import Input from "component/Input";
import dayjs from "dayjs";
import { useRouter } from 'next/router'

interface IProps {
  handleSubmit: (_value: any) => void;
  handleLoadMore: () => void;
  isLoadingJobs: boolean;
  dataJobs?:any
}
export default function DashboardComponent(props: IProps) {
  const {
    handleSubmit,
    isLoadingJobs,
    handleLoadMore,
    dataJobs,
  } = props;
  const router = useRouter()
  const checkoutRef = useRef<HTMLDivElement>(null)
  const [pageIndexJobs, setPageIndexJobs] = useState<number>(1);
  const handleScroll= () =>{
    if(checkoutRef.current){
      const element = checkoutRef.current;
      const scrollY = element.scrollTop;
      // const elementHeight = element.clientHeight;//Tinggi elemen yang terlihat (viewport dari elemen)
      // const contentHeight = element.scrollHeight; // Tinggi seluruh konten dalam elemen, termasuk yang overflow
      if(scrollY <= 100){
        setPageIndexJobs(1);
      }
    }
  };
 
  useEffect(()=>{
    const element = checkoutRef.current;
    if(element){
      element.addEventListener("scroll", handleScroll)
    }
    return() => {
      if(element){
        element.removeEventListener("scroll", handleScroll)
      }
    }
  },[pageIndexJobs])
  return (
    <>
      <Form onSubmit={handleSubmit}  >
        {(formProps) => {
          const {dirty, handleSubmit, form} = formProps
          if(isLoadingJobs){
            form.change("Jobs_Desc", "");
            form.change("Location", "");
          }
          return (
            <FormANTD layout="vertical" className="" onFinish={handleSubmit}>
              <div className="flex fixed top-14 left-0 right-0 lg:right-0 flex-wrap w-full">
              <div className="flex flex-row w-full md:space-x-4">
                <div className="w-1/2">
                <Field
                  name="Jobs_Desc"
                  label="Jobs Description"
                  component={Input}
                  isFormItem
                  allowClear
                  autoFocus
                  prefix={<BookOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  showError={dirty}
                  placeholder="Filter by title, benefits, companies, expertise"
                  className="w-full md:w-full"
                />
                </div>
                <div className="w-1/2">
                <Field
                  name="Location"
                  label="Location"
                  placeholder="Filter by city, state, zip code or country"
                  component={Input}
                  isFormItem
                  prefix={<GlobalOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}
                  allowClear
                  showError={dirty}
                  className="w-full md:w-full"
                /></div>
              </div>
              <div className="flex items-center w-1/2 h-6 text-sm md:text-lg">
              <Field name="Full_Time_Only" label="Full Time Only" component={Checkbox} isFormItem defaultValue={true} showError={dirty}/>
              </div>
              <div className="flex items-center w-1/2 h-6">
                <Button className="rounded-lg bg-gray-600 ml-auto mr-6 text-white font-bold" size="large" htmlType="submit">Search</Button>
              </div>
              </div>
            </FormANTD>
          )
        }}
      </Form>
      <div
        ref={checkoutRef}
        className="px-6 border-solid border-8 rounded-md mx-auto max-h-[460px] border-gray-400 bg-white mt-60 md:mt-44  w-auto md:w-11/12 overflow-y-scroll"
      >
        <div className=" w-full relative">
          <h2 className="text-4xl text-black my-0">{dataJobs.length < 6 ? `Showing ${dataJobs.length} Jobs ` : "Jobs List"}</h2>
          <hr className="w-full bg-gray-500" />
          {isLoadingJobs ? (
          <div className="w-full text-center text-2xl font-bold text-black">Loading Jobs List.....</div>
          ) : (
          <>
          {dataJobs?.map((job: any, index: number) => (
            <div key={index} className="my-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-600 font-bold my-0 cursor-pointer" onClick={() => router.push(`/jobs/${job?.id}`)}>{job?.title || ""}</p>
                  <p className="text-gray-600 font-bold my-0">
                    {job?.company || ""} - <span className="text-green-600">{job?.type || ""}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-black text-sm my-0">{job?.location || ""}</p>
                  <p className="text-gray-500 my-0">
                    {dayjs(job?.created_at).format("DD MMM YYYY") || dayjs().format("DD MMM YYYY")}
                  </p>
                </div>
              </div>
              <hr className="w-full bg-gray-500 mt-2" />
            </div>
          ))}
          </>
          )}

          <div className="w-full mt-4 sticky bottom-0 bg-white">
            <Button
              size="middle"
              className="text-white font-bold w-full"
              type="primary"
              onClick={handleLoadMore}
            >
              More Jobs
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

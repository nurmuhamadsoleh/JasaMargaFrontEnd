import "react-toastify/dist/ReactToastify.css";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/progress-bar/dist/style.css";
import "@uppy/file-input/dist/style.css";
import "@uppy/image-editor/dist/style.css";
import "styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";
import LoginContainer from "module/Login/Container/LoginContainer";
import NotFoundContainer from "module/404/Container/NotFoundContainer";
import OfflinePageContainer from "module/404/Container/OfflinePageContainer";
import { PulseLoader } from "react-spinners";
import Template from "component/Template";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [statusPage, setStatusPage] = useState(true);
  useEffect(() => {
    const changeStatus = () =>{
      setStatusPage(navigator.onLine)
    }
    
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleStop = () => {
      setIsLoading(false);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };
    window.addEventListener('online', changeStatus)
    window.addEventListener('offline', changeStatus)
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router, statusPage]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  });
  // function Root() {
  //    const [showChild, setShowChild] = useState(false);
  //    useEffect(()=>{
  //     setShowChild(true)
  //    },[])
  //    useEffect(()=>{
  //     if(showChild && statusPage == true){
  //       if((router.pathname === "/")){
  //         router.push("/jobs")
  //       } else if (router.pathname !== "/") {
  //       location.href = "/"
  //       } 
  //     }
  //    },[showChild, statusPage])

  //    if(!showChild){
  //     return null
  //    }
  //    if(statusPage === false){
  //     return <OfflinePageContainer/>
  //    }
  //   if(router.pathname === "/_error"){
  //     return <NotFoundContainer/>
  //   }
  //   if(showChild){
  //     const listNoTemplate = ['/']
  //      if(router.pathname === "/"){
  //         return <LoginContainer/>
  //       } else{
  //         return <Component {...pageProps} />
  //       }
  //   }
  // }
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Country</title>
      </Head>
      <div className="light m-0 p-0 box-border">
        {isLoading && (
          <div className="fixed  z-[100] w-screen h-screen flex justify-center items-center bg-[#2069dd] opacity-100 duration-1000 overflow-hidden">
            <PulseLoader color="white" className="m-auto" size={40} />
          </div>
        )}
        {/* {Root()} */}
          <Template>
              <Component {...pageProps} />
            </Template>
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}

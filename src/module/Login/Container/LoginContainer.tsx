import React, {useRef, useState} from 'react'

import LoginComponent from '../Component/LoginComponent'
import { useRouter } from 'next/router'
import { useScript } from 'helpers/useScripts'

export default function LoginContainer() {
  const router = useRouter()
  let [loading, setLoading] = useState<boolean>(false)
  const googlebuttonref = useRef<HTMLDivElement | null>(null)
  
  const onGoogleSignIn = (user:any) =>{
    // setAuth(user)
    router.push("/jobs")
  };
  useScript("https://accounts.google.com/gsi/client", ()=>{
    window.google.accounts.id.initialize({
    client_id:"329857395398-4emrcfaha3guq8iubvha5692crcv7jgh.apps.googleusercontent.com", // here's your Google ID
    callback: onGoogleSignIn,
    auto_select: false,
  });
    window.google.accounts.id.renderButton(googlebuttonref.current, {
    size: "medium",  // Ukuran tombol
    theme: "outline", // Tambahkan properti `theme`
  });
  window.google.accounts.id.prompt();
  })
  const handleSubmit = (vals:any) =>{
  setLoading(true)
  router.push("/jobs")
  setTimeout(() => {
    setLoading(false)
  },2000)
  }
  return (
    <LoginComponent googlebuttonref={googlebuttonref} handleSubmit={handleSubmit} isLoadingSubmit={loading}/>
  )
}
